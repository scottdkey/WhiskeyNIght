class CreateApiAttendees < ActiveRecord::Migration[6.0]
  def change
    create_table :api_attendees do |t|
      t.string :name
      t.boolean :going
      t.belongs_to :api_session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
