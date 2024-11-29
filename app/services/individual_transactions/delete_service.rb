# frozen_string_literal: true

module IndividualTransactions
  class DeleteService < ::BaseService
    def call(parent_transaction)
      process_params(parent_transaction)

      ActiveRecord::Base.transaction do
        revert_previous_account_change
        revert_previous_category_change
        parent_transaction.destroy!
      end
    end

    private

    attr_reader :parent_transaction, :account, :amount

    def process_params(parent_transaction)
      @parent_transaction = parent_transaction
      @account = parent_transaction.account
      @amount = parent_transaction.amount_cents
      @category = parent_transaction.category
    end

    def revert_previous_account_change
      if parent_transaction.expense?
        account.record_expense(-amount)
      else
        account.record_income(-amount)
      end
      account.save!
    end

    def revert_previous_category_change
      previous_category.update_balance(-amount)
      previous_category.save!
    end
  end
end
