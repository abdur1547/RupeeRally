# frozen_string_literal: true

module Api::V0::Accounts
  class Create
    include ApplicationService

    class Contract < ApplicationContract
      params do
        required(:name).filled(:string)
        optional(:initial_balance_cents).maybe(:integer)
      end
    end

    def execute(params, current_user:)
      @params = params
      @current_user = current_user

      yield create_account
      Success(json_serialize)
    end

    private

    attr_reader :params, :current_user, :account

    def create_account
      initial_balance_cents = params[:initial_balance_cents].presence || 0
      @account = current_user.accounts.new(
        name: params[:name],
        balance_cents: initial_balance_cents,
        initial_balance_cents:
      )

      return Success(account) if account.save

      Failure(account.errors.full_messages)
    end

    def json_serialize
      Api::V0::AccountsSerializer.render_as_hash([account], root: :accounts)
    end
  end
end
