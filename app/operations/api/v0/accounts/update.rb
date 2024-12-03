# frozen_string_literal: true

module Api::V0::Accounts
  class Update
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:id).filled(:integer)
        optional(:name).maybe(:string)
        optional(:initial_balance_cents).maybe(:integer)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      yield fetch_account
      yield update_account
      Success(json_serialize)
    end

    private

    attr_reader :params, :current_user, :account

    def fetch_account
      @account = current_user.accounts.find_by(id: params[:id])

      return Success(account) if account

      Failure(:not_found)
    end

    def update_account
      return Success(account.reload) if account.update(update_params)

      Failure(account.errors.full_messages)
    end

    def update_params
      {
        name: params[:name],
        initial_balance_cents: params[:initial_balance_cents],
        balance_cents: account.balance_cents + calculate_difference
      }.compact_blank
    end

    def calculate_difference
      final_value = params[:initial_balance_cents].presence || account.initial_balance_cents
      initial_value = account.initial_balance_cents
      final_value - initial_value
    end

    def json_serialize
      Api::V0::AccountsSerializer.render_as_hash([account], root: :accounts)
    end
  end
end
