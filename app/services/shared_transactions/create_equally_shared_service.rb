# frozen_string_literal: true

module SharedTransactions
  class CreateEquallySharedService < CreateService
    private

    def validate_user_shares_shares; end

    def calculate_user_shares # rubocop:disable Metrics/MethodLength
      total_shares = user_shares.count
      per_share_value = total_amount_cents / total_shares
      difference = total_amount_cents % total_shares
      @user_shares = user_shares.map do |user_share|
        {
          user: User.find_by(user_share[:user_id]),
          share_amount_cents: per_share_value
        }
      end
      user_shares.first[:share_amount_cents] += difference if difference != 0
      user_shares
    end
  end
end
