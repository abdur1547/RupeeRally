# frozen_string_literal: true

module Api::V0
  class CategoriesController < ApiController
    def index
      Categories::Index.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { |accounts| success_response(accounts, status: :ok) }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def show
      Categories::Show.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { |data| success_response(data, status: :ok) }
        result.failure(:not_found) { not_found_response }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def create
      Categories::Create.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { |data| success_response(data, status: :created) }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def update
      Categories::Update.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { |data| success_response(data, status: :ok) }
        result.failure(:not_found) { not_found_response }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def destroy
      Categories::Destroy.call(params.to_unsafe_h, current_user: @current_user) do |result|
        result.success { success_response }
        result.failure(:not_found) { not_found_response }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end
  end
end
