# == Schema Information
#
# Table name: refresh_tokens
#
#  id            :integer          not null, primary key
#  crypted_token :string
#  user_id       :integer          not null
#  exp           :datetime         not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_refresh_tokens_on_crypted_token  (crypted_token) UNIQUE
#  index_refresh_tokens_on_user_id        (user_id)
#

# frozen_string_literal: true

FactoryBot.define do
  factory :refresh_token do
    token { SecureRandom.hex }
    crypted_token { Digest::SHA256.hexdigest(token) }
    user { create(:user) }
    exp { Time.now.utc }
  end
end
