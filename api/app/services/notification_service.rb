class NotificationService
    def self.send_booking_notification(appointment)
        AppointmentMailer.booking_confirmation(appointment).deliver_later
        AppointmentMailer.provider_notification(appointment).deliver_later
    end

    def self.send_cancellation_notification(appointment, cancelled_by)
        AppointmentMailer.cancellation_notice(appointment, cancelled_by).deliver_later
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