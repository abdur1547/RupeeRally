class CreateTransfers < ActiveRecord::Migration[8.0]
  def change
    create_table :transfers do |t|
      t.integer :amount_cents, null: false, default: 0
      t.text :description, null: false, default: ''

      t.timestamps
    end

    add_reference :transfers, :from_account, foreign_key: { to_table: :accounts }, null: false
    add_reference :transfers, :to_account, foreign_key: { to_table: :accounts }, null: false
    add_reference :transfers, :user, foreign_key: true, null: false
  end
end
