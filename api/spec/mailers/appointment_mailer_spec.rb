require 'rails_helper'

RSpec.describe AppointmentMailer, type: :mailer do
  describe '#booking_confirmation' do
    let(:appointment) { create(:appointment) }
    let(:mail) { AppointmentMailer.booking_confirmation(appointment) }
    
    it 'sends to patient email' do
      expect(mail.to).to include(appointment.patient.email)
    end
    
    it 'includes provider name in subject' do
      expect(mail.subject).to include(appointment.provider.name)
    end
    
    it 'includes appointment details in body' do
      # Handle HTML encoding (e.g., apostrophes become &#39;)
      body = mail.body.encoded
      expect(body).to match(/#{Regexp.escape(appointment.provider.name.gsub("'", "&#39;"))}/)
      expect(body).to include(appointment.provider.specialty)
    end
    
    context 'when patient has disabled booking confirmations' do
      before do
        appointment.patient.update(booking_confirmations: false)
      end
      
      it 'does not send email' do
        expect(mail.message).to be_a(ActionMailer::Base::NullMail)
      end
    end
  end
  
  describe '#cancellation_notice' do
    let(:appointment) { create(:appointment) }
    let(:mail) { AppointmentMailer.cancellation_notice(appointment, 'patient') }
    
    it 'sends to patient email' do
      expect(mail.to).to include(appointment.patient.email)
    end
    
    it 'mentions cancellation in subject' do
      expect(mail.subject).to include('Cancelled')
    end
    
    it 'includes who cancelled' do
      expect(mail.body.encoded).to include('You')
    end
  end
  
  describe '#reminder_24h' do
    let(:appointment) { create(:appointment, start_time: 1.day.from_now) }
    let(:mail) { AppointmentMailer.reminder_24h(appointment) }
    
    it 'sends reminder email' do
      expect(mail.to).to include(appointment.patient.email)
      expect(mail.subject).to include('Reminder')
    end
    
    context 'when patient has disabled reminders' do
      before do
        appointment.patient.update(reminders_24h: false)
      end
      
      it 'does not send email' do
        expect(mail.message).to be_a(ActionMailer::Base::NullMail)
      end
    end
  end
end