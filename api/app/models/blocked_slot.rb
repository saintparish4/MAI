class BlockedSlot < ApplicationRecord
  belongs_to :provider
  
  validates :start_time, presence: true
  validates :end_time, presence: true
  validate :end_time_after_start_time
  
  scope :for_date_range, ->(start_date, end_date) {
    where('start_time < ? AND end_time > ?', end_date, start_date)
  }
  
  scope :from_google, -> { where(source: 'google_calendar') }
  
  private
  
  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?
    
    if end_time <= start_time
      errors.add(:end_time, "must be after start time")
    end
  end
end