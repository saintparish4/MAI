FactoryBot.define do
  factory :calendar_connection do
    provider { nil }
    access_token { "MyText" }
    refresh_token { "MyText" }
    calendar_id { "MyString" }
    expires_at { "2025-10-29 22:21:54" }
    last_synced_at { "2025-10-29 22:21:54" }
  end
end
