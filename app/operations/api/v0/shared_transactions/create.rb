# frozen_string_literal: true

module Api::V0::SharedTransactions
  class Create
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:description).filled(:string)
        required(:total_amount_cents).filled(:integer)
        required(:account_id).filled(:integer)
        required(:category_id).filled(:integer)
        required(:paid_by).filled(:integer)
        required(:divided_by).filled(:string, included_in?: Transaction.divided_bies.keys)
        required(:user_shares).array(:hash) do
          required(:user_id).filled(:integer)
          required(:user_share).filled(:integer)
        end
        optional(:date).filled(:string)
        optional(:time).filled(:string)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      yield validate_account_id
      yield validate_category_id
      validate_paid_by_id
      yield validate_user_share_ids
      yield create_transaction
      Success(json_serialize)
    end

    private

    attr_reader :params, :current_user, :account, :category, :paid_by, :transaction

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

    def validate_paid_by_id
      @paid_by = User.find_by(id: params[:paid_by])
      return Success() if category

      Failure(:category_not_found)
    end

    def validate_user_share_ids
      user_ids = params[:user_shares].pluck(:user_id)
      users = User.where(id: user_ids)
      return Success() if user_ids.count == users.count

      Failure(:category_not_found)
    end

    def create_service
      case params[:divided_by]
      when 'equally'
        SharedTransactions::CreateEquallySharedService
      end
    end

    def create_transaction
      @transaction = create_service.call(create_params)
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
        total_amount_cents: params[:total_amount_cents],
        paid_by: paid_by,
        user_shares: params[:user_shares],
        divided_by: params[:divided_by]
      }
    end

    def json_serialize
      Api::V0::TransactionsSerializer.render_as_hash([transaction], root: :transactions)
    end
  end
end
