FactoryBot.define do
  factory :transfer do
    amount_cents { Faker::Number.number(digits: 5) }
    description { Faker::Lorem.sentence }
    user { association(:user) }
    from_account { association(:account, user:) }
    to_account { association(:account, user:) }
    transactions do
      [create(:transaction, description:, amount_cents:, account: from_account, user:),
       create(:transaction, description:, amount_cents:, account: to_account, user:)]
    end
  end
end
