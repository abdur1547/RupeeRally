# frozen_string_literal: true

module Api::V0
  class TransfersSerializer < Blueprinter::Base
    identifier :id
    fields :description,
           :amount_cents
    field :created_at, datetime_format: '%H:%M %d:%m:%Y'
    field :updated_at, datetime_format: '%H:%M %d:%m:%Y'
    association :transactions, blueprint: Api::V0::TransactionsSerializer
    association :from_account, blueprint: Api::V0::AccountsSerializer
    association :to_account, blueprint: Api::V0::AccountsSerializer
  end
end
