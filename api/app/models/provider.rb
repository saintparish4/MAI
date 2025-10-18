class Provider < ApplicationRecord
    has_many :availabilities, dependent: :destroy 

    validates :name, presence: true 
    validates :specialty, presence: true 
    validates :hourly_rate, numericality: { greater_than: 0 }, allow_nil: true 
    validates :experience_years, numericality: { greater_than_or_equal_to: 0 }, allow_nil: true 
    validates :rating, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }, allow_nil: true
    
    scope :by_specialty, ->(specialty) { where(specialty: specialty) if specialty.present? }
    scope :by_location, ->(location) { where('location ILIKE ?', "%#{location}%") if location.present? }
    scope :rated_above, ->(rating) { where('rating >= ?', rating) if rating.present? } 
end
