class AddTransferReferenceToTransaction < ActiveRecord::Migration[8.0]
  def change
    add_reference :transactions, :transfer, foreign_key: true, null: true, index: false

    add_index :transactions, :transfer_id, where: 'transfer_id IS NOT NULL'
  end
end
