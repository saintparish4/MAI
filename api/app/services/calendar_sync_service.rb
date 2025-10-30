class CalendarSyncService
    def initialize(provider)
      @provider = provider
      @connection = provider.calendar_connection
    end
    
    def sync
      return { success: false, error: 'No calendar connection' } unless @connection
      
      begin
        # Refresh token if expired
        refresh_token_if_needed
        
        # Fetch events from Google Calendar
        events = fetch_calendar_events
        
        # Process events and create/update blocked slots
        process_events(events)
        
        # Update last synced timestamp
        @connection.update(last_synced_at: Time.current)
        
        { success: true, synced_events: events.count }
      rescue Google::Apis::AuthorizationError => e
        Rails.logger.error "Google Calendar authorization error: #{e.message}"
        @connection.update(active: false)
        { success: false, error: 'Authorization failed. Please reconnect your calendar.' }
      rescue StandardError => e
        Rails.logger.error "Calendar sync error: #{e.message}"
        { success: false, error: e.message }
      end
    end
    
    private
    
    def calendar_service
      @calendar_service ||= begin
        service = Google::Apis::CalendarV3::CalendarService.new
        service.authorization = authorizer.get_credentials('user')
        service
      end
    end
    
    def authorizer
      @authorizer ||= begin
        client_id = Google::Auth::ClientId.new(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
        token_store = Google::Auth::Stores::RedisTokenStore.new(redis: Redis.new)
        
        Google::Auth::UserAuthorizer.new(client_id, GOOGLE_SCOPE, token_store)
      end
    end
    
    def refresh_token_if_needed
      return unless @connection.token_expired?
      
      auth_client = Signet::OAuth2::Client.new(
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        token_credential_uri: 'https://oauth2.googleapis.com/token',
        refresh_token: @connection.refresh_token
      )
      
      auth_client.refresh!
      
      @connection.update(
        access_token: auth_client.access_token,
        expires_at: Time.at(auth_client.expires_at)
      )
    end
    
    def fetch_calendar_events
      calendar_id = @connection.calendar_id || 'primary'
      
      # Fetch events for next 14 days
      time_min = Time.current.iso8601
      time_max = 14.days.from_now.iso8601
      
      result = calendar_service.list_events(
        calendar_id,
        max_results: 250,
        single_events: true,
        order_by: 'startTime',
        time_min: time_min,
        time_max: time_max
      )
      
      result.items || []
    end
    
    def process_events(events)
      # Get existing blocked slots from Google Calendar
      existing_slots = @provider.blocked_slots.from_google
                               .where('start_time >= ?', Time.current)
                               .index_by(&:external_event_id)
      
      processed_event_ids = []
      
      events.each do |event|
        next if event.status == 'cancelled'
        next unless event.start&.date_time && event.end&.date_time
        
        start_time = event.start.date_time
        end_time = event.end.date_time
        
        # Skip all-day events
        next if (end_time - start_time) >= 1.day
        
        processed_event_ids << event.id
        
        # Update or create blocked slot
        if existing_slots[event.id]
          existing_slots[event.id].update(
            start_time: start_time,
            end_time: end_time,
            reason: event.summary
          )
        else
          @provider.blocked_slots.create(
            start_time: start_time,
            end_time: end_time,
            reason: event.summary || 'Busy',
            source: 'google_calendar',
            external_event_id: event.id
          )
        end
      end
      
      # Remove blocked slots for events that no longer exist
      stale_slots = existing_slots.values.reject { |slot| processed_event_ids.include?(slot.external_event_id) }
      stale_slots.each(&:destroy)
    end
  end