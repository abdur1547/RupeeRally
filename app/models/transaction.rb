# frozen_string_literal: true

class Transaction < ApplicationRecord
  enum :direction, { income: 0, expense: 1 }
  enum :status, { pending: 0, settled: 1 }

  validates :description, presence: true
  validates :amount_cents, numericality: { only_integer: true }
  validates :user_share, presence: true

  belongs_to :user
  belongs_to :account, optional: true
  belongs_to :category, optional: true
  belongs_to :transfer, optional: true
end
