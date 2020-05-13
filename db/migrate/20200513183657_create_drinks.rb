class CreateDrinks < ActiveRecord::Migration[6.0]
  def change
    create_table :drinks do |t|
      t.string :label
      t.bigint "session_id", null: false

      t.timestamps
    end
  end
end
