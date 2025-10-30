class CalendarSyncJob < ApplicationJob
    queue_as :default
    
    def perform(provider_id)
      provider = Provider.find_by(id: provider_id)
      return unless provider&.calendar_connected?
      
      service = CalendarSyncService.new(provider)
      result = service.sync
      
      Rails.logger.info "Calendar sync for provider #{provider_id}: #{result[:success] ? 'Success' : result[:error]}"
    end
  end