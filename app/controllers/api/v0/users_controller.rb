# frozen_string_literal: true

module Api::V0
  class UsersController < ApiController
    def show
      Api::V0::UserOperations::Show.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { |data| success_response(data) }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end
  end
end
