# frozen_string_literal: true

user_01_password = ENV['TES_USER_01_PASSWORD'] || '123456789'

user_01 = User.create(name: "Full Name",
                      email: "test.user.01@rupeerally.com",
                      password: user_01_password,
                      password_confirmation: user_01_password
                      );

categories = [
  {name: 'Food', category_type: :expense, user: user_01},
  {name: 'Rent', category_type: :expense, user: user_01},
  {name: 'Transport', category_type: :expense, user: user_01},
  {name: 'Bills', category_type: :expense, user: user_01},
  {name: 'Missing Records', category_type: :expense, user: user_01},
  {name: 'Miscellaneous', category_type: :expense, user: user_01},
  {name: 'Salary', category_type: :income, user: user_01},
  {name: 'Returns', category_type: :income, user: user_01},
]
accounts = [
  {name: "Cash", balance_cents: 500000, initial_balance_cents: 700000, user: user_01},
  {name: "Meezan", balance_cents: 2700000, initial_balance_cents: 3000000, user: user_01},
  {name: "SadaPay", balance_cents: 300000, initial_balance_cents: 300000, user: user_01},
  {name: "UBL", balance_cents: 7500000, initial_balance_cents: 8000000, user: user_01},
]

Category.create(categories)
Account.create(accounts)