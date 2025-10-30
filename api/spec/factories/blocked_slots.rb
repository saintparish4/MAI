FactoryBot.define do
  factory :blocked_slot do
    provider { nil }
    start_time { "2025-10-29 22:27:56" }
    end_time { "2025-10-29 22:27:56" }
    reason { "MyString" }
    source { "MyString" }
    external_event_id { "MyString" }
  end
end
