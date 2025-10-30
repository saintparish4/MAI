class CalendarSyncAllJob < ApplicationJob
    queue_as :default
    
    def perform
      CalendarConnection.active.needs_sync.each do |connection|
        CalendarSyncJob.perform_later(connection.provider_id)
      end
    end
  end