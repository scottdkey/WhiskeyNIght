# frozen_string_literal: true

class CreateIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :ingredients do |t|
      t.string :name
      t.boolean :complete
      t.string :assigned
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
