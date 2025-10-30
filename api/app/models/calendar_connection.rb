class CalendarConnection < ApplicationRecord
  belongs_to :provider
  
  validates :access_token, presence: true
  validates :refresh_token, presence: true
  
  scope :active, -> { where(active: true) }
  scope :needs_sync, -> { where('last_synced_at IS NULL OR last_synced_at < ?', 15.minutes.ago) }
  
  def token_expired?
    expires_at && expires_at < Time.current
  end
  
  def needs_sync?
    last_synced_at.nil? || last_synced_at < 15.minutes.ago
  end
end