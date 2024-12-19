# frozen_string_literal: true

module IndividualTransactions
  class UpdateService < ::BaseService
    include Helpers::TransactionHelpers

    def call(params)
      validate_params(params)
      process_params
      set_previous_data

      ActiveRecord::Base.transaction do
        revert_amount_changes(previous_amount, previous_account, previous_category, previous_direction)
        apply_amount_changes(amount_cents, account, category, direction)
        update_parent_transaction
      end

      parent_transaction
    end

    private

    attr_reader :params,
                :parent_transaction,
                :description,
                :amount_cents,
                :direction,
                :account,
                :category,
                :previous_amount,
                :previous_account,
                :previous_category,
                :previous_direction

    def validate_params(params)
      @params = params.symbolize_keys
      @parent_transaction = params[:parent_transaction]
      raise ArgumentError, 'Parent transaction is required' unless parent_transaction
    end

    def process_params # rubocop:disable Metrics/AbcSize
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
      @previous_direction = parent_transaction.direction
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
