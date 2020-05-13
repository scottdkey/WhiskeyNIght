# frozen_string_literal: true

class CreateDrinkIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :drink_ingredients do |t|
      t.string :name
      t.bigint 'drink_id', null: false

      t.timestamps
    end
  end
end
