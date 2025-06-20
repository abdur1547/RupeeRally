# frozen_string_literal: true

# require 'rails_helper'

# RSpec.describe '/api/v0/individual_transactions', type: :request do
#   describe 'POST#create' do
#     let(:user) { create(:user) }
#     let(:access_token) { valid_jwt(user) }
#     let(:headers) do
#       {
#         Authorization: access_token
#       }
#     end

#     let(:description) { Faker::Lorem.sentence }
#     let(:direction) { 'income' }
#     let(:amount_cents) { Faker::Number.number(digits: 5) }
#     let(:accounts) { create_list(:account, 10, user:) }
#     let(:selected_account) { accounts.sample }
#     let(:account_id) { selected_account.id }
#     let!(:previous_balance) { selected_account.balance_cents }
#     let!(:previous_total_income) { selected_account.total_income_cents }
#     let!(:previous_total_expense) { selected_account.total_expense_cents }
#     let(:categories) { create_list(:category, 10, user:, category_type: direction) }
#     let(:selected_category) { categories.sample }
#     let(:category_id) { selected_category.id }
#     let(:date) { 'date' }
#     let(:time) { 'time' }
#     let(:params) do
#       {
#         description:,
#         direction:,
#         amount_cents:,
#         account_id:,
#         category_id:,
#         date:,
#         time:
#       }
#     end

#     before { post '/api/v0/individual_transactions', headers:, params: }

#     describe 'success' do
#       context 'with income transaction type' do
#         it 'creates and return new transaction increase account balance' do
#           expect(response).to be_created
#           expect(response.parsed_body['data']['transactions'].count).to eq(1)
#           expect(response.parsed_body['data']['transactions'].first['description']).to eq(description)

#           child_transactions = response.parsed_body['data']['transactions'].first['child_transactions']
#           expect(child_transactions.count).to eq(0)

#           selected_account.reload
#           expect(selected_account.balance_cents).to eql(previous_balance + amount_cents)
#           expect(selected_account.total_income_cents).to eql(previous_total_income + amount_cents)
#           expect(selected_account.total_expense_cents).to eql(previous_total_expense)
#           expect(response).to match_json_schema('v0/transactions/create')
#         end
#       end

#       context 'with expense transaction type' do
#         let(:direction) { 'expense' }

#         it 'creates and return new transaction increase account balance' do
#           expect(response).to be_created
#           expect(response.parsed_body['data']['transactions'].count).to eq(1)
#           expect(response.parsed_body['data']['transactions'].first['description']).to eq(description)

#           child_transactions = response.parsed_body['data']['transactions'].first['child_transactions'].first
#           expect(child_transactions).to eq(nil)

#           selected_account.reload
#           expect(selected_account.balance_cents).to eql(previous_balance - amount_cents)
#           expect(selected_account.total_income_cents).to eql(previous_total_income)
#           expect(selected_account.total_expense_cents).to eql(previous_total_expense + amount_cents)
#           expect(response).to match_json_schema('v0/transactions/create')
#         end
#       end
#     end

#     describe 'failure' do
#       include_context 'forbidden'
#       include_context 'unauthorized'

#       context 'when account id is invalid' do
#         let(:account_id) { create(:account).id }

#         it 'returns not_found' do
#           expect(response).to be_not_found
#           expect(response.parsed_body['errors'][0]).to eq('Account not found')
#         end
#       end

#       context 'when category id is invalid' do
#         let(:category_id) { create(:category).id }

#         it 'returns not_found' do
#           expect(response).to be_not_found
#           expect(response.parsed_body['errors'][0]).to eq('Category not found')
#         end
#       end
#     end
#   end

  # describe 'PATCH#update' do
  #   let(:user) { create(:user) }
  #   let(:access_token) { valid_jwt(user) }
  #   let(:headers) do
  #     {
  #       Authorization: access_token
  #     }
  #   end
  #   let(:accounts) { create_list(:account, 10, user:) }
  #   let(:account_01) { accounts.sample }
  #   let(:account_01_id) { account_01.id }
  #   let!(:account_01_previous_balance) { account_01.balance_cents }
  #   let!(:account_01_previous_total_income) { account_01.total_income_cents }
  #   let!(:account_01_previous_total_expense) { account_01.total_expense_cents }
  #   let(:account_02) { accounts.sample }
  #   let(:account_02_id) { account_02.id }
  #   let!(:account_02_previous_balance) { account_02.balance_cents }
  #   let!(:account_02_previous_total_income) { account_02.total_income_cents }
  #   let!(:account_02_previous_total_expense) { account_02.total_expense_cents }
  #   let(:previous_transaction_type) { 'income' }
  #   let(:updated_transaction_type) { 'income' }
  #   let!(:previous_category_amount) {Faker::Number.number(digits: 5)}
  #   let(:category) { create(:category, user:, amount_cents: previous_category_amount, category_type: previous_transaction_type) }
  #   let!(:previous_amount) { Faker::Number.number(digits: 5) }
  #   let!(:updated_amount) { Faker::Number.number(digits: 5) }
  #   let!(:transaction) { create(:transaction, user:, divided_by: 0, amount_cents: previous_amount, transaction_type: previous_transaction_type) }

  #   let(:params) do
  #     {
  #       description: transaction.description,
  #       transaction_type: updated_transaction_type,
  #       amount_cents: updated_amount,
  #       account_id: account_01_id,
  #       category_id: category.id
  #     }
  #   end

  #   before { patch "/api/v0/individual_transactions/#{transaction.id}", params:, headers: }

  #   context 'success' do
  #     context 'only changing transaction type' do
  #       context 'when changed to expenses type' do
  #         let(:updated_transaction_type) { 'expense' }

  #         it 'should update account balance and total income' do
  #           expect(response).to be_ok
  #           expect(response).to match_json_schema('v0/transactions/update')
  #           type = response.parsed_body['data']['transactions'].first['description']
  #           expect(type).to eql(updated_transaction_type)
  #           account_01.reload
  #           expect(account_01.balance_cents).to eql(account_01_previous_balance - previous_amount + updated_amount)
  #           expect(account_01.total_income_cents).to eql(account_01_previous_total_income - previous_amount + updated_amount)
  #           expect(account_01.total_expense_cents).to eql(account_01_previous_total_expense)
  #         end
  #       end

  #       context 'with expense transaction' do
  #         let(:transaction_type) { 'expense' }

  #         it 'should update account balance and total expense' do
  #           expect(response).to be_ok
  #           expect(response).to match_json_schema('v0/transactions/update')
  #           account_01.reload
  #           expect(account_01.balance_cents).to eql(account_01_previous_balance + previous_amount - updated_amount)
  #           expect(account_01.total_income_cents).to eql(account_01_previous_total_income)
  #           expect(account_01.total_expense_cents).to eql(account_01_previous_total_expense - previous_amount + updated_amount)
  #         end
  #       end
  #     end

  #     context 'when account is changed' do
  #       let(:params) do
  #         {
  #           description: transaction.description,
  #           transaction_type: user_transaction.transaction_type,
  #           amount_cents: updated_amount,
  #           account_id: account_02_id,
  #           category_id: category.id
  #         }
  #       end

  #       context 'with income transaction' do
  #         it 'should update both accounts balances and total income' do
  #           expect(response).to be_ok
  #           expect(response).to match_json_schema('v0/transactions/update')
  #           account_01.reload
  #           account_02.reload
  #           expect(account_01.balance_cents).to eql(account_01_previous_balance - previous_amount)
  #           expect(account_01.total_income_cents).to eql(account_01_previous_total_income - previous_amount)
  #           expect(account_01.total_expense_cents).to eql(account_01_previous_total_expense)
  #           expect(account_02.balance_cents).to eql(account_02_previous_balance + updated_amount)
  #           expect(account_02.total_income_cents).to eql(account_02_previous_total_income + updated_amount)
  #           expect(account_02.total_expense_cents).to eql(account_02_previous_total_expense)
  #         end
  #       end

  #       context 'with expense transaction' do
  #         let(:transaction_type) { 'expense' }

  #         it 'should update account balance and total expense' do
  #           expect(response).to be_ok
  #           expect(response).to match_json_schema('v0/transactions/update')
  #           account_01.reload
  #           account_02.reload
  #           expect(account_01.balance_cents).to eql(account_01_previous_balance + previous_amount)
  #           expect(account_01.total_income_cents).to eql(account_01_previous_total_income)
  #           expect(account_01.total_expense_cents).to eql(account_01_previous_total_expense - previous_amount)
  #           expect(account_02.balance_cents).to eql(account_02_previous_balance - updated_amount)
  #           expect(account_02.total_income_cents).to eql(account_02_previous_total_income)
  #           expect(account_02.total_expense_cents).to eql(account_02_previous_total_expense + updated_amount)
  #         end
  #       end
  #     end
  #   end

  #   context 'failure' do
  #     include_context 'forbidden'
  #     include_context 'unauthorized'

  #     context 'when transaction id is not valid' do
  #       let(:transaction) { create(:transaction) }

  #       it 'returns not_found' do
  #         expect(response).to be_not_found
  #       end
  #     end

  #     context 'when account id is not valid' do
  #       let(:account) { create(:account) }
  #       let(:params) do
  #         {
  #           description: transaction.description,
  #           transaction_type: user_transaction.transaction_type,
  #           amount_cents: updated_amount,
  #           account_id: account.id,
  #           category_id: category.id
  #         }
  #       end

  #       it 'returns not_found' do
  #         expect(response).to be_not_found
  #       end
  #     end

  #     context 'when category id is not valid' do
  #       let(:category) { create(:category) }
  #       let(:params) do
  #         {
  #           description: transaction.description,
  #           transaction_type: user_transaction.transaction_type,
  #           amount_cents: updated_amount,
  #           account_id: account_01_id,
  #           category_id: category.id
  #         }
  #       end

  #       it 'returns not_found' do
  #         expect(response).to be_not_found
  #       end
  #     end
  #   end
  # end
# end
