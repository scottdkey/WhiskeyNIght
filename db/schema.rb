# frozen_string_literal: true

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

ActiveRecord::Schema.define(version: 20_200_602_203_211) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'attendees', force: :cascade do |t|
    t.string 'name'
    t.boolean 'going'
    t.bigint 'session_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['session_id'], name: 'index_attendees_on_session_id'
  end

  create_table 'ingredients', force: :cascade do |t|
    t.string 'name'
    t.boolean 'complete'
    t.string 'assigned'
    t.bigint 'item_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.index ['item_id'], name: 'index_ingredients_on_item_id'
  end

  create_table 'items', force: :cascade do |t|
    t.string 'label'
    t.string 'assigned'
    t.string 'foodstuff'
    t.bigint 'session_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.boolean 'complete'
    t.index ['session_id'], name: 'index_items_on_session_id'
  end

  create_table 'sessions', force: :cascade do |t|
    t.datetime 'date'
    t.string 'host'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
    t.string 'location'
  end

  add_foreign_key 'attendees', 'sessions'
  add_foreign_key 'ingredients', 'items'
  add_foreign_key 'items', 'sessions'
end
