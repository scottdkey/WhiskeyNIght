class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :label
      t.string :assigned
      t.string :type
      t.belongs_to :session, null: false, foreign_key: true

      t.timestamps
    end
  end
end
