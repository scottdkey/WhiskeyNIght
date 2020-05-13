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

ActiveRecord::Schema.define(version: 20_200_513_183_728) do
  # These are extensions that must be enabled in order to support this database
  enable_extension 'plpgsql'

  create_table 'drink_ingredients', force: :cascade do |t|
    t.string 'name'
    t.bigint 'drink_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'drinks', force: :cascade do |t|
    t.string 'label'
    t.bigint 'session_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'food_ingredients', force: :cascade do |t|
    t.string 'label'
    t.bigint 'person_id', null: false
    t.bigint 'food_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'foods', force: :cascade do |t|
    t.string 'label'
    t.bigint 'session_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'people', force: :cascade do |t|
    t.string 'name'
    t.boolean 'going'
    t.bigint 'session_id', null: false
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end

  create_table 'sessions', force: :cascade do |t|
    t.datetime 'date'
    t.string 'host'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end
end
