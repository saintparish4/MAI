# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_10_19_173830) do
  create_table "appointments", force: :cascade do |t|
    t.integer "patient_id", null: false
    t.integer "provider_id", null: false
    t.datetime "start_time", null: false
    t.datetime "end_time", null: false
    t.string "status", default: "pending", null: false
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["patient_id", "start_time"], name: "index_appointments_on_patient_id_and_start_time"
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
    t.index ["provider_id", "start_time"], name: "index_appointments_on_provider_id_and_start_time"
    t.index ["provider_id"], name: "index_appointments_on_provider_id"
    t.index ["status"], name: "index_appointments_on_status"
  end

  create_table "availabilities", force: :cascade do |t|
    t.integer "provider_id", null: false
    t.integer "day_of_week", null: false
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.boolean "is_available", default: true
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["provider_id", "day_of_week"], name: "index_availabilities_on_provider_id_and_day_of_week"
    t.index ["provider_id"], name: "index_availabilities_on_provider_id"
  end

  create_table "providers", force: :cascade do |t|
    t.string "name", null: false
    t.string "specialty", null: false
    t.text "bio"
    t.string "location"
    t.decimal "hourly_rate", precision: 8, scale: 2
    t.integer "experience_years"
    t.decimal "rating", precision: 3, scale: 2, default: "0.0"
    t.string "avatar_url"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["location"], name: "index_providers_on_location"
    t.index ["specialty"], name: "index_providers_on_specialty"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "booking_confirmations", default: true
    t.boolean "reminders_24h", default: true
    t.boolean "cancellation_notices", default: true
  end

  add_foreign_key "appointments", "providers"
  add_foreign_key "appointments", "users", column: "patient_id"
  add_foreign_key "availabilities", "providers"
end
