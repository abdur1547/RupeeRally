# frozen_string_literal: true

module Api::V0::IndividualTransactions
  class Create
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:description).filled(:string)
        required(:direction).filled(:string, included_in?: Transaction.directions.keys)
        required(:amount_cents).filled(:integer)
        required(:account_id).filled(:integer)
        required(:category_id).filled(:integer)
        optional(:date).filled(:string)
        optional(:time).filled(:string)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      yield validate_account_id
      yield validate_category_id
      yield create_transaction
      Success(json_serialize)
    end

    private

    attr_reader :params, :current_user, :account, :category, :transaction

    def validate_account_id
      @account = current_user.accounts.find_by(id: params[:account_id])
      return Success() if @account

      Failure(:account_not_found)
    end

    def validate_category_id
      @category = current_user.categories.find_by(id: params[:category_id])
      return Success() if category

      Failure(:category_not_found)
    end

    def create_transaction
      @transaction = ::IndividualTransactions::CreateService.call(create_params)
      Success(transaction)
    rescue ActiveRecord::RecordInvalid, ActiveRecord::RecordNotSaved, ActiveRecord::StatementInvalid => e
      Failure(e.message)
    end

    def create_params
      {
        current_user:,
        account:,
        category:,
        description: params[:description],
        direction: params[:direction],
        amount_cents: params[:amount_cents]
      }
    end

    def json_serialize
      Api::V0::TransactionsSerializer.render_as_hash([transaction], root: :transactions)
    end
  end
end
