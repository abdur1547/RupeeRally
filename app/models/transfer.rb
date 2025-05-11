# frozen_string_literal: true

class Transfer < ApplicationRecord
  belongs_to :from_account, class_name: 'Account'
  belongs_to :to_account, class_name: 'Account'
  belongs_to :user
  has_many :transactions, dependent: :destroy

  validates :description, presence: true
  validates :amount_cents, numericality: { greater_than: 0 }
  validate :from_account_and_to_account_must_be_different
  validate :from_account_and_to_account_must_belong_to_user

  private

  def from_account_and_to_account_must_be_different
    return unless from_account == to_account

    errors.add(:base, 'From account and To account must be different')
  end

  def from_account_and_to_account_must_belong_to_user
    return if user.accounts.include?(from_account) && user.accounts.include?(to_account)

    errors.add(:base, 'Both accounts must belong to the user')
  end
end
