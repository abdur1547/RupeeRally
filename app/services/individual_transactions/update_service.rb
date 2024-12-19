# frozen_string_literal: true

module IndividualTransactions
  class UpdateService < ::BaseService
    def call(params)
      process_params(params)
      set_previous_data

      ActiveRecord::Base.transaction do
        revert_previous_account_change
        revert_previous_category_change
        add_updated_amount_to_account
        add_updated_amount_to_category
        update_parent_transaction
      end

      parent_transaction
    end

    private

    attr_reader :params,
                :description,
                :amount_cents,
                :direction,
                :account,
                :category,
                :parent_transaction,
                :previous_amount,
                :previous_account,
                :previous_category

    def process_params(params)
      @params = params
      @parent_transaction = params[:parent_transaction]
      @description = params[:description]
      @amount_cents = params[:amount_cents] || parent_transaction.amount_cents
      @direction = params[:direction] || parent_transaction.direction
      @account = params[:account] || parent_transaction.account
      @category = params[:category] || parent_transaction.category
    end

    def set_previous_data
      @previous_amount = parent_transaction.amount_cents
      @previous_account = parent_transaction.account
      @previous_category = parent_transaction.category
    end

    def revert_previous_account_change
      if parent_transaction.expense?
        previous_account.record_expense(-previous_amount)
      else
        previous_account.record_income(-previous_amount)
      end
      previous_account.save!
    end

    def revert_previous_category_change
      previous_category.update_balance(-previous_amount)
      previous_category.save!
    end

    def add_updated_amount_to_account
      if direction == 'expense'
        account.reload.record_expense(amount_cents)
      else
        account.reload.record_income(amount_cents)
      end
      account.save!
    end

    def add_updated_amount_to_category
      category.reload.update_balance(amount_cents)
      category.save!
    end

    def update_parent_transaction
      parent_transaction.update!(update_params)
    end

    def update_params
      {
        description:,
        direction:,
        amount_cents:,
        category:,
        account:
      }.compact_blank
    end
  end
end
