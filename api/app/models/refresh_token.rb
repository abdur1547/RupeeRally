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

class RefreshToken < ApplicationRecord
  belongs_to :user
  before_create :set_crypted_token

  attr_accessor :token

  def self.find_by_token(token)
    crypted_token = Digest::SHA256.hexdigest token
    RefreshToken.find_by(crypted_token:)
  end

  private

  def set_crypted_token
    self.token = SecureRandom.hex
    self.crypted_token = Digest::SHA256.hexdigest(token)
    self.exp = Time.now.utc + Constants::REFRESH_TOKEN_LIFETIME
  end
end
