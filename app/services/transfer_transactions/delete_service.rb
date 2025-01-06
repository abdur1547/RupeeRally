# frozen_string_literal: true

module TransferTransactions
  class DeleteService < ::BaseService
    include Helpers::TransactionHelpers

    def call(parent_transaction)
      @parent_transaction = parent_transaction
      set_child_transactions
      set_previous_accounts
      @amount_cents = parent_transaction.amount_cents

      ActiveRecord::Base.transaction do
        adjust_account_balance(from_account, -amount_cents, :expense)
        adjust_account_balance(to_account, -amount_cents, :income)
        parent_transaction.destroy!
      end
    end

    private

    attr_reader :parent_transaction,
                :expense_transaction,
                :income_transaction,
                :from_account,
                :to_account,
                :amount_cents

    def set_child_transactions
      @expense_transaction = parent_transaction.child_transactions.expense.first
      @income_transaction = parent_transaction.child_transactions.income.first
    end

    def set_previous_accounts
      @from_account = expense_transaction.account
      @to_account = income_transaction.account
    end
  end
end
