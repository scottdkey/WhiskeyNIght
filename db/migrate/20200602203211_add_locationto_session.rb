# frozen_string_literal: true

class AddLocationtoSession < ActiveRecord::Migration[6.0]
  def change
    add_column :sessions, :location, :string
  end
end
