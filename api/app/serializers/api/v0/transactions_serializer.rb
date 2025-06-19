# frozen_string_literal: true

module Api::V0
  class TransactionsSerializer < Blueprinter::Base
    identifier :id
    fields :direction,
           :description,
           :status,
           :amount_cents,
           :selected_date,
           :selected_time,
           :user_id,
           :account_id,
           :category_id
    field :created_at, datetime_format: '%H:%M %d:%m:%Y'
  end
end
