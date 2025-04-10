# frozen_string_literal: true

module Api::V0
  class AuthController < ApiController
    include ActionController::Cookies
    skip_before_action :authenticate_user!, only: %i[signup signin refresh]

    def signup
      Api::V0::Auth::SignupService.call(params.to_unsafe_h) do |result|
        result.success { |data| success_response(data, status: :created) }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def signin
      Api::V0::Auth::SigninService.call(params.to_unsafe_h) do |result|
        result.success do |data|
          set_auth_cookies(data[:access_token], data[:refresh_token])
          response.set_header('Authorization', data[:access_token])
          success_response
        end
        result.failure(:unauthorized) { unauthorized_response }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    def refresh
      Api::V0::Auth::RefreshService.call(params.to_unsafe_h) do |result|
        result.success do |data|
          set_auth_cookies(data[:access_token], data[:refresh_token])
          response.set_header('Authorization', data[:access_token])
          success_response
        end
        result.failure(:unauthorized) { unauthorized_response }
        result.failure { |errors| unprocessable_entity(errors) }
      end
    end

    private

    def set_auth_cookies(access_token, refresh_token)
      cookies[:access_token] = {
        value: access_token,
        httponly: true,
        secure: Rails.env.production?
      }
      cookies[:refresh_token] = {
        value: refresh_token,
        httponly: true,
        secure: Rails.env.production?
      }
    end
  end
end
