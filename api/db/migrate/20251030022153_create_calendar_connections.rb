class CreateCalendarConnections < ActiveRecord::Migration[7.0]
  def change
    create_table :calendar_connections do |t|
      t.references :provider, null: false, foreign_key: true
      t.text :access_token
      t.text :refresh_token
      t.string :calendar_id
      t.datetime :expires_at
      t.datetime :last_synced_at
      t.boolean :active, default: true

      t.timestamps
    end

    add_index :calendar_connections, :provider_id, unique: true, if_not_exists: true
  end
end
