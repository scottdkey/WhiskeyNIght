# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_14_230604) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "api_attendees", force: :cascade do |t|
    t.string "name"
    t.boolean "going"
    t.bigint "api_session_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["api_session_id"], name: "index_api_attendees_on_api_session_id"
  end

  create_table "api_sessions", force: :cascade do |t|
    t.datetime "date"
    t.string "host"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "attendees", force: :cascade do |t|
    t.string "name"
    t.boolean "going"
    t.bigint "session_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["session_id"], name: "index_attendees_on_session_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "date"
    t.string "host"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "api_attendees", "api_sessions"
  add_foreign_key "attendees", "sessions"
end
