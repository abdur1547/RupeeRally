# frozen_string_literal: true

module Api::V0::UserOperations
  class Show
    include ApplicationService

    class Contract < ApplicationContract
      params do # rubocop:disable Lint/EmptyBlock
      end
    end

    def execute(_params, current_user:)
      @current_user = current_user

      Success(json_serialize)
    end

    private

    attr_reader :current_user

    def json_serialize
      Api::V0::UsersSerializer.render_as_hash(current_user)
    end
  end
end
