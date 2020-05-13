class CreateFoodIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :food_ingredients do |t|
      t.string :label
      t.person :belongs_to
      t.food :belongs_to

      t.timestamps
    end
  end
end
