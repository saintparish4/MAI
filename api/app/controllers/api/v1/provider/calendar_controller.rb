module Api
    module V1
      module Provider
        class CalendarController < ApplicationController
          before_action :authenticate_provider!
          
          # GET /api/v1/provider/calendar/connect
          def connect
            authorizer = create_authorizer
            url = authorizer.get_authorization_url(base_url: GOOGLE_REDIRECT_URI)
            
            render json: { authorization_url: url }
          end
          
          # GET /api/v1/provider/calendar/callback
          def callback
            code = params[:code]
            
            if code.blank?
              return render json: { error: 'Authorization code missing' }, status: :bad_request
            end
            
            begin
              authorizer = create_authorizer
              credentials = authorizer.get_and_store_credentials_from_code(
                user_id: current_provider.id,
                code: code,
                base_url: GOOGLE_REDIRECT_URI
              )
              
              # Store credentials in database
              CalendarConnection.create_or_find_by(provider: current_provider).update(
                access_token: credentials.access_token,
                refresh_token: credentials.refresh_token,
                expires_at: Time.at(credentials.expires_at),
                active: true
              )
              
              # Perform initial sync
              CalendarSyncJob.perform_later(current_provider.id)
              
              # Redirect to provider dashboard
              redirect_to "#{ENV['FRONTEND_URL']}/provider/dashboard?calendar_connected=true"
            rescue StandardError => e
              Rails.logger.error "Calendar connection error: #{e.message}"
              redirect_to "#{ENV['FRONTEND_URL']}/provider/dashboard?calendar_error=true"
            end
          end
          
          # POST /api/v1/provider/calendar/sync
          def sync
            service = CalendarSyncService.new(current_provider)
            result = service.sync
            
            if result[:success]
              render json: { message: 'Calendar synced successfully', events_count: result[:synced_events] }
            else
              render json: { error: result[:error] }, status: :unprocessable_entity
            end
          end
          
          # DELETE /api/v1/provider/calendar/disconnect
          def disconnect
            connection = current_provider.calendar_connection
            
            if connection
              connection.update(active: false)
              # Optionally delete all Google Calendar blocked slots
              current_provider.blocked_slots.from_google.destroy_all
              
              render json: { message: 'Calendar disconnected successfully' }
            else
              render json: { error: 'No calendar connection found' }, status: :not_found
            end
          end
          
          # GET /api/v1/provider/calendar/status
          def status
            connection = current_provider.calendar_connection
            
            if connection&.active?
              render json: {
                connected: true,
                last_synced: connection.last_synced_at,
                needs_sync: connection.needs_sync?
              }
            else
              render json: { connected: false }
            end
          end
          
          private
          
          def create_authorizer
            client_id = Google::Auth::ClientId.new(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)
            token_store = Google::Auth::Stores::RedisTokenStore.new(redis: Redis.new)
            
            Google::Auth::UserAuthorizer.new(client_id, GOOGLE_SCOPE, token_store)
          end
          
          def authenticate_provider!
            # For now, providers are also users with a provider role
            # In production, you'd have a separate provider authentication
            authenticate_request
            
            unless current_user # Assuming providers log in as users
              render json: { error: 'Unauthorized' }, status: :unauthorized
            end
          end
          
          def current_provider
            # Find provider associated with current user
            # This assumes you have a provider_id column on users table
            @current_provider ||= Provider.find_by(id: current_user.provider_id) if current_user
          end
        end
      end
    end
  end