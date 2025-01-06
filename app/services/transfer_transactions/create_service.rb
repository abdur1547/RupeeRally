# frozen_string_literal: true

module TransferTransactions
  class CreateService < ::BaseService
    include Helpers::TransactionHelpers

    def call(params)
      process_params(params)

      ActiveRecord::Base.transaction do
        create_parent_transaction
        create_from_account_transaction
        create_to_account_transaction
        adjust_account_balance(from_account, amount_cents, :expense)
        adjust_account_balance(to_account, amount_cents, :income)
      end

      parent_transaction
    end

    private

    attr_reader :current_user,
                :from_account,
                :to_account,
                :description,
                :amount_cents,
                :parent_transaction

    def process_params(params)
      @current_user = params[:current_user]
      @from_account = params[:from_account]
      @to_account = params[:to_account]
      @description = params[:description]
      @amount_cents = params[:amount_cents]
    end

    def create_parent_transaction
      parent_trn_desc = "Transferred from #{from_account.name} to #{to_account.name} account"
      @parent_transaction = Transaction.create!(user: current_user,
                                                description: parent_trn_desc,
                                                amount_cents:,
                                                divided_by: :by_none,
                                                paid_by: current_user,
                                                transaction_type: :transfer)
    end

    def create_from_account_transaction
      from_acc_desc = "Transferred to #{to_account.name} account for '#{description}'"
      Transaction.create!(user: current_user,
                          description: from_acc_desc,
                          direction: :expense,
                          user_share: 100,
                          amount_cents:,
                          account: from_account,
                          parent_transaction:,
                          paid_by: current_user)
    end

    def create_to_account_transaction
      to_acc_desc = "Transferred from #{from_account.name} account for '#{description}'"
      Transaction.create!(user: current_user,
                          description: to_acc_desc,
                          direction: :income,
                          user_share: 100,
                          amount_cents:,
                          account: to_account,
                          parent_transaction:,
                          paid_by: current_user)
    end
  end
end
