# frozen_string_literal: true

module Api::V0::Transactions
  class Destroy
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:id).filled(:integer)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      @transaction = yield fetch_transaction
      yield destroy_transaction
      Success()
    end

    private

    attr_reader :params,
                :current_user,
                :transaction,
                :transaction_type,
                :account,
                :amount_cents

    def fetch_transaction
      @transaction = current_user.transactions.includes(:child_transactions).where('transactions.id = ? ',
                                                                                   params[:id]).first

      return Success(transaction) if transaction

      Failure(:not_found)
    end

    def delete_service
      case transaction.transaction_type
      when 'individual'
        ::IndividualTransactions::DeleteService
      when 'transfer'
        ::TransferTransactions::DeleteService
      end
    end

    def destroy_transaction
      delete_service.call(transaction)
      Success()
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::StatementInvalid => e
      Failure(e.message)
    end
  end
end
