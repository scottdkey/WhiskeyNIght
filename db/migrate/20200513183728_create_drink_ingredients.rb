class CreateDrinkIngredients < ActiveRecord::Migration[6.0]
  def change
    create_table :drink_ingredients do |t|
      t.string :name
      t.drink :belongs_to

      t.timestamps
    end
  end
end
