class CreateFoodIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :food_ingredients do |t|
      t.string :label
      t.bigint "person_id", null: false
      t.bigint "food_id", null: false

      t.timestamps
    end
  end
end
