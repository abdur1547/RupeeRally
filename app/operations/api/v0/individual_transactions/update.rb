# frozen_string_literal: true

module Api::V0::IndividualTransactions
  class Update
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:id).filled(:integer)
        optional(:description).maybe(:string)
        optional(:direction).maybe(:string, included_in?: Transaction.directions.keys)
        optional(:amount_cents).maybe(:integer)
        optional(:account_id).maybe(:integer)
        optional(:category_id).filled(:integer)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      yield fetch_parent_transaction
      yield validate_account_id
      yield validate_category_id
      records = yield update_transaction
      Success(json_serialize(records))
    end

    private

    attr_reader :params, :current_user, :account, :category, :parent_transaction

    def fetch_parent_transaction
      @parent_transaction = current_user.transactions.find_by(id: params[:id])

      return Success(parent_transaction) if parent_transaction

      Failure(:not_found)
    end

    def validate_account_id
      return Success(nil) if params[:account_id].blank?

      @account = current_user.accounts.find_by(id: params[:account_id])
      return Success(@account) if account

      Failure(:account_not_found)
    end

    def validate_category_id
      return Success(nil) if params[:category_id].blank?

      @category = current_user.categories.find_by(id: params[:category_id])
      return Success() if category

      Failure(:category_not_found)
    end

    def update_transaction
      transaction = ::IndividualTransactions::UpdateService.call(update_params)
      Success(transaction)
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::StatementInvalid => e
      Failure(e.message)
    end

    def update_params
      {
        account:,
        category:,
        description: params[:description],
        direction: params[:direction],
        amount_cents: params[:amount_cents],
        parent_transaction:
      }
    end

    def json_serialize(records)
      Api::V0::TransactionsSerializer.render_as_hash([records], root: :transactions)
    end
  end
end
