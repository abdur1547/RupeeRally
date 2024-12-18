# frozen_string_literal: true

module Api::V0::Accounts
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

      yield fetch_account
      yield destroy_account
      Success()
    end

    private

    attr_reader :params, :current_user, :account

    def fetch_account
      @account = current_user.accounts.find_by(id: params[:id])

      return Success(account) if account

      Failure(:not_found)
    end

    def destroy_account
      return Success() if account.destroy

      Failure(account.errors.full_messages)
    end
  end
end
