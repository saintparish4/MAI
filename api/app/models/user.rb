class User < ApplicationRecord
    has_secure_password
    has_many :appointments, foreign_key: 'patient_id', dependent: :destroy 
    belongs_to :provider_profile, class_name: 'Provider', foreign_key: 'provider_id', optional: true

    validates :email, presence: true, uniqueness: true
    validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
    validates :password, length: { minimum: 6 }, if: -> { new_record? || password.present? }

    before_save { self.email = email.downcase } 
    
    def provider?
        is_provider && provider_profile.present?
    end
end 
