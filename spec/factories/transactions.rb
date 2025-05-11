FactoryBot.define do
  factory :transaction do
    description { Faker::Lorem.sentence }
    amount_cents { Faker::Number.number(digits: 5) }
    direction { :income }
    status { :pending }
    selected_date { Date.today.strftime(Constants::API_DATE_FROMAT) }
    selected_time { Time.now.strftime(Constants::API_TIME_FROMAT) }
    user { association(:user) }
    account { association(:account, user:) }
  end
end
