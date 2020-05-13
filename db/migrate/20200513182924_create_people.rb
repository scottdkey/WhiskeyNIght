class CreatePeople < ActiveRecord::Migration[6.0]
  def change
    create_table :people do |t|
      t.string :name
      t.boolean :going
      t.bigint "session_id", null: false

      t.timestamps
    end
  end
end
