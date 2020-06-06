# frozen_string_literal: true

class CreateAttendees < ActiveRecord::Migration[6.0]
  def change
    create_table :attendees do |t|
      t.string :name
      t.boolean :going
      t.belongs_to :session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
