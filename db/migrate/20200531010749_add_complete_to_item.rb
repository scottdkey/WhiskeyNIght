class AddCompleteToItem < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :complete, :boolean
  end
end
