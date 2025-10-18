class Appointment < ApplicationRecord
  belongs_to :user
  belongs_to :provider

  validates :start_time, presence: true 
  validates :end_time, presence: true 
  validates :status, inclusion: { in: %w[pending confirmed cancelled completed] }

  validate :end_time_after_start_time
  validate :not_overlapping_appointments

  scope :upcoming, -> { where('start_time >= ?', Time.current).order(:start_time) }
  scope :past, -> { where('start_time < ?', Time.current).order(start_time: :desc) }
  scope :for_provider, ->(provider_id) { where(provider_id: provider_id) }
  scope :confirmed, -> { where(status: 'confirmed') }

  private

  def end_time_after_start_time
    return if end_time.blank? || start_time.blank?

    if end_time <= start_time
      errors.add(:end_time, "must be after start time")
    end
  end

  def not_overlapping_appointments
    return if start_time.blank? || end_time.blank?

    overlapping = Appointment.where(provider_id: provider_id)
                             .where.not(id: id)
                             .where.not(status: 'cancelled')
                             .where('start_time < ? AND end_time > ?', end_time, start_time)
    
    if overlapping.exists?
      errors.add(:base, "This time slot overlaps with an existing appointment")
    end
  end
end
