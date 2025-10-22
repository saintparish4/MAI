puts "🌱 Seeding database..."

# Clear all data and reset auto-increment counters
Appointment.destroy_all
Availability.destroy_all
Provider.destroy_all
User.destroy_all

# Reset SQLite auto-increment counters
ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='providers'")
ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='availabilities'")
ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='appointments'")
ActiveRecord::Base.connection.execute("DELETE FROM sqlite_sequence WHERE name='users'")

# Create test user
puts "👤 Creating test user..."
test_user = User.create!(
  email: 'saintparish6@gmail.com',
  password: 'password123',
  password_confirmation: 'password123',
  booking_confirmations: true,
  reminders_24h: true,
  cancellation_notices: true
)
puts "✅ Created test user: #{test_user.email}"

puts "🏥 Seeding providers..."

providers_data = [
  {
    name: "Dr. Sarah Chen",
    specialty: "Physical Therapy",
    bio: "Specialized in sports injury rehabilitation with over 10 years of experience. Helped hundreds of athletes return to peak performance.",
    location: "San Francisco, CA",
    hourly_rate: 125.00,
    experience_years: 10,
    rating: 4.9,
    avatar_url: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Marcus Johnson",
    specialty: "Personal Training",
    bio: "NASM certified personal trainer focused on strength training and body composition. Former college athlete with a passion for helping clients achieve their fitness goals.",
    location: "Los Angeles, CA",
    hourly_rate: 85.00,
    experience_years: 6,
    rating: 4.7,
    avatar_url: "https://i.pravatar.cc/150?img=12"
  },
  {
    name: "Dr. Emily Rodriguez",
    specialty: "Nutrition Counseling",
    bio: "Registered dietitian specializing in plant-based nutrition and metabolic health. Evidence-based approach to sustainable lifestyle changes.",
    location: "Austin, TX",
    hourly_rate: 95.00,
    experience_years: 8,
    rating: 4.8,
    avatar_url: "https://i.pravatar.cc/150?img=9"
  },
  {
    name: "James Park",
    specialty: "Yoga Instruction",
    bio: "200-hour RYT certified yoga instructor with expertise in Vinyasa and restorative practices. Creating mindful movement experiences for all levels.",
    location: "Seattle, WA",
    hourly_rate: 70.00,
    experience_years: 5,
    rating: 4.6,
    avatar_url: "https://i.pravatar.cc/150?img=14"
  },
  {
    name: "Dr. Michael Thompson",
    specialty: "Mental Health Counseling",
    bio: "Licensed clinical psychologist specializing in cognitive behavioral therapy and mindfulness-based interventions. Supporting individuals through life transitions.",
    location: "New York, NY",
    hourly_rate: 150.00,
    experience_years: 12,
    rating: 5.0,
    avatar_url: "https://i.pravatar.cc/150?img=13"
  }
]

providers_data.each do |provider_data|
  provider = Provider.create!(provider_data)
  
  # Create availability for each provider (Monday-Friday, 9 AM - 5 PM)
  (1..5).each do |day|
    provider.availabilities.create!(
      day_of_week: day,
      start_time: '09:00',
      end_time: '17:00',
      is_available: true
    )
  end
  
  puts "✅ Created provider: #{provider.name}"
end

puts "✨ Seeding complete!"
puts "   📊 #{Provider.count} providers with availability"
puts "   👤 1 test user (#{test_user.email})"
puts ""
puts "🔐 Test Login Credentials:"
puts "   Email: saintparish6@gmail.com"
puts "   Password: password123"
