class NotificationService
    def self.send_booking_notifications(appointment)
        # Send booking confirmation to patient
        mailer = AppointmentMailer.booking_confirmation(appointment)
        mailer&.deliver_later
        
        # Provider notification is disabled for now
        AppointmentMailer.provider_notification(appointment)
    rescue => e
        Rails.logger.error("Failed to send booking notifications: #{e.message}")
        # Don't raise - we don't want email failures to block appointment creation
    end

    def self.send_cancellation_notifications(appointment, cancelled_by)
        mailer = AppointmentMailer.cancellation_notice(appointment, cancelled_by)
        mailer&.deliver_later
    rescue => e
        Rails.logger.error("Failed to send cancellation notifications: #{e.message}")
    end

    def self.send_reminder_notifications
        # Find appointments that are 24 hours away
        tomorrow_start = 24.hours.from_now.beginning_of_hour
        tomorrow_end = tomorrow_start + 1.hour

        appointments = Appointment.where(status: 'confirmed')
                                 .where(start_time: tomorrow_start..tomorrow_end)

        appointments.each do |appointment|
            AppointmentMailer.reminder_24h(appointment).deliver_later
        end
    end
end