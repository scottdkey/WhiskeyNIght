class CreateApiSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :api_sessions do |t|
      t.datetime :date
      t.string :host

      t.timestamps
    end
  end
end
