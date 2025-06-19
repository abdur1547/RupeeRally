# == Schema Information
#
# Table name: blacklisted_tokens
#
#  id         :integer          not null, primary key
#  jti        :string
#  user_id    :integer          not null
#  exp        :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_blacklisted_tokens_on_jti      (jti) UNIQUE
#  index_blacklisted_tokens_on_user_id  (user_id)
#

# frozen_string_literal: true

FactoryBot.define do
  factory :blacklisted_token do
    jti { SecureRandom.hex }
    user { create(:user) }
    exp { Time.now.utc + 1.hour }
  end
end
