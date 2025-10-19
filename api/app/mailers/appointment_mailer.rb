class AppointmentMailer < ApplicationMailer
  def booking_confirmation(appointment)
    @appointment = appointment
    @patient = appointment.patient
    @provider = appointment.provider

    return unless @patient.booking_confirmations

    mail(
      to: @patient.email,
      subject: "Appointment Confirmed - #{@provider.name}"
    )
  end

  def provider_notification(appointment)
    @appointment = appointment
    @patient = appointment.patient
    @provider = appointment.provider

    # In real app, provider would have email
    # For now, we'll skip provider email
    # mail(
    #   to: @provider.email,
    #   subject: "New Appointment Request - #{@patient.name}"
    # )
  end

  def cancellation_notice(appointment, cancelled_by)
    @appointment = appointment
    @patient = appointment.patient
    @provider = appointment.provider
    @cancelled_by = cancelled_by

    return unless @patient.cancellation_notices

    mail(
      to: @patient.email,
      subject: "Appointment Cancelled - #{@provider.name}"
    )
  end

  def reminder_24h(appointment)
    @appointment = appointment
    @patient = appointment.patient
    @provider = appointment.provider

    return unless @patient.reminders_24h

    mail(
      to: @patient.email,
      subject: "Reminder: Appointment Tomorrow with #{@provider.name}"
    )
  end
end