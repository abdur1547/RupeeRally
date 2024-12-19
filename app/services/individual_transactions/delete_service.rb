# frozen_string_literal: true

module IndividualTransactions
  class DeleteService < ::BaseService
    include Helpers::TransactionHelpers

    def call(parent_transaction)
      process_params(parent_transaction)

      ActiveRecord::Base.transaction do
        revert_amount_changes(amount, account, category, direction)
        parent_transaction.destroy!
      end
    end

    private

    attr_reader :parent_transaction, :account, :category, :amount, :direction

    def process_params(parent_transaction)
      @parent_transaction = parent_transaction
      @account = parent_transaction.account
      @amount = parent_transaction.amount_cents
      @category = parent_transaction.category
      @direction = parent_transaction.direction
    end
  end
end
