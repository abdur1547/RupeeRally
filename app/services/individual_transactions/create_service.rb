# frozen_string_literal: true

module IndividualTransactions
  class CreateService < ::BaseService
    include Helpers::TransactionHelpers

    def call(params)
      process_params(params)
      validate_category

      ActiveRecord::Base.transaction do
        create_parent_transaction
        apply_amount_changes(amount_cents, account, category, direction)
      end

      parent_transaction
    end

    private

    attr_reader :current_user,
                :params,
                :description,
                :amount_cents,
                :direction,
                :account,
                :category,
                :parent_transaction

    def process_params(params)
      @params = params
      @current_user = params[:current_user]
      @description = params[:description]
      @amount_cents = params[:amount_cents]
      @direction = params[:direction]
      @account = params[:account]
      @category = params[:category]
    end

    def validate_category
      raise CategoryTypeMismatchError unless category.category_type == direction
    end

    def create_parent_transaction
      @parent_transaction = Transaction.create!(create_params)
    end

    def create_params # rubocop:disable Metrics/MethodLength
      {
        user: current_user,
        description:,
        direction:,
        amount_cents:,
        divided_by: :by_none,
        user_share: 100,
        transaction_type: :individual,
        category:,
        paid_by: current_user,
        account:
      }
    end
  end
end
