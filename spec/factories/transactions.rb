FactoryBot.define do
  factory :transaction do
    description { Faker::Lorem.sentence }
    amount_cents { Faker::Number.number(digits: 5) }
    divided_by { :by_none }
    transaction_type { :individual }
    direction { :income }
    status { :pending }
    user_share { 100 }
    selected_date { Date.today.strftime(Constants::API_DATE_FROMAT) }
    selected_time { Time.now.strftime(Constants::API_TIME_FROMAT) }
    user { create(:user) }
    paid_by { user }
    parent_transaction_id { nil }
    child_transactions {[]}
  end
end
