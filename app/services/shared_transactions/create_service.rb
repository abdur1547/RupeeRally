# frozen_string_literal: true

module SharedTransactions
  class CreateService < ::BaseService
    include Helpers::TransactionHelpers

    def call(params)
      process_params(params)
      validate_user_shares_ids
      validate_user_shares_shares
      calculate_user_shares

      ActiveRecord::Base.transaction do
        create_parent_transaction
        create_paid_user_transactions
        create_shared_user_transactions
      end

      parent_transaction
    end

    private

    attr_reader :params,
                :current_user,
                :account,
                :category,
                :description,
                :total_amount_cents,
                :paid_by,
                :user_shares,
                :divided_by,
                :parent_transaction

    def process_params(params)
      @params = params
      @current_user = params[:current_user]
      @account = params[:account]
      @category = params[:category]
      @description = params[:description]
      @total_amount_cents = params[:total_amount_cents]
      @paid_by = params[:paid_by]
      @user_shares = params[:user_shares]
      @divided_by = params[:divided_by]
    end

    def validate_user_shares_ids
      user_ids = user_shares.pluck(:user_id)
      users = User.where(id: user_ids)
      raise UserIdNotValidError unless user_ids.count == users.count
    end

    def validate_user_shares_shares
      raise NotImplementedError
    end

    def calculate_user_shares
      raise NotImplementedError
    end

    def create_parent_transaction # rubocop:disable Metrics/MethodLength
      @parent_transaction = current_user.transactions.create!({
                                                                description:,
                                                                direction: :expense,
                                                                amount_cents: total_amount_cents,
                                                                divided_by:,
                                                                user_share: 0,
                                                                transaction_type: :shared,
                                                                category:,
                                                                account:,
                                                                paid_by: paid_by
                                                              })
    end

    def create_paid_user_transactions
      create_child_transaction(paid_by,
                               account,
                               category,
                               user_share[:share_amount_cents],
                               :expense)
    end

    def create_shared_user_transactions # rubocop:disable Metrics/AbcSize,Metrics/MethodLength
      user_shares.each do |user_share|
        next if paid_by.id == user_share[:user]

        create_child_transaction(paid_by,
                                 account,
                                 paid_by.expense_debt_category,
                                 user_share[:share_amount_cents],
                                 :expense)
        create_child_transaction(user_share[:user],
                                 user_share[:user].debt_account,
                                 user_share[:user].income_debt_category,
                                 user_share[:share_amount_cents],
                                 :income)
        create_child_transaction(user_share[:user],
                                 user_share[:user].debt_account,
                                 user_share[:user].expense_debt_category,
                                 user_share[:share_amount_cents],
                                 :expense)
      end
    end

    def create_child_transaction(user, account, category, amount, direction) # rubocop:disable Metrics/MethodLength
      user.transactions.create!({
                                  description:,
                                  direction: direction,
                                  amount_cents: amount,
                                  divided_by:,
                                  user_share: 0,
                                  transaction_type: :shared,
                                  category:,
                                  account:,
                                  paid_by: paid_by,
                                  parent_transaction:
                                })
      apply_amount_changes(amount, account, category, direction)
    end
  end
end
