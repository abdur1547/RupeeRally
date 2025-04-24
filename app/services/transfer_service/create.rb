# frozen_string_literal: true

module TransferService
  class Create < ::BaseService
    include Helpers::TransactionHelpers

    def call(params)
      process_params(params)

      ActiveRecord::Base.transaction { perform_transfer_operations }
      { success: true, transfer: @transfer }
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::StatementInvalid => e
      { success: false, errors: e.message }
    end

    private

    attr_reader :current_user,
                :from_account,
                :to_account,
                :description,
                :amount_cents,
                :transfer

    def process_params(params)
      @current_user = params[:current_user]
      @from_account = params[:from_account]
      @to_account = params[:to_account]
      @description = params[:description]
      @amount_cents = params[:amount_cents]
    end

    def perform_transfer_operations
      create_transfer
      create_from_account_transaction
      create_to_account_transaction
      adjust_account_balance(from_account, amount_cents, :expense)
      adjust_account_balance(to_account, amount_cents, :income)
    end

    def create_transfer
      @transfer = Transfer.create!(user: current_user,
                                   description:,
                                   amount_cents:,
                                   from_account:,
                                   to_account:)
    end

    def create_from_account_transaction
      from_acc_desc = "Transferred to #{to_account.name} account for '#{description}'"
      Transaction.create!(user: current_user,
                          description: from_acc_desc,
                          direction: :expense,
                          amount_cents:,
                          account: from_account,
                          transfer:)
    end

    def create_to_account_transaction
      to_acc_desc = "Transferred from #{from_account.name} account for '#{description}'"
      Transaction.create!(user: current_user,
                          description: to_acc_desc,
                          direction: :income,
                          amount_cents:,
                          account: to_account,
                          transfer:)
    end
  end
end
