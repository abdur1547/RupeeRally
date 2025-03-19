# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v0/users', type: :request do
  describe 'GET#user_info' do
    let(:user) { create(:user) }
    let(:access_token) { valid_jwt(user) }
    let(:headers) do
      {
        Authorization: access_token
      }
    end

    before { get '/api/v0/user_info', headers: }

    describe 'success' do
      it 'should returns default number of accounts' do
        expect(response).to be_ok
        expect(response).to match_json_schema('v0/user')
      end
    end

    describe 'failure' do
      include_context 'forbidden'
      include_context 'unauthorized'
    end
  end

  describe 'GET#show' do
    let(:user) { create(:user) }
    let(:access_token) { valid_jwt(user) }
    let(:headers) do
      {
        Authorization: access_token
      }
    end
    let(:accounts) { create_list(:account, 100, user:) }
    let(:selected_account) { accounts.sample }

    before { get "/api/v0/accounts/#{selected_account.id}", headers: }

    describe 'success' do
      context 'when account id is valid' do
        it 'returns account' do
          expect(response).to be_ok
          expect(response.parsed_body['data']['accounts'].count).to eq(1)
          expect(response.parsed_body['data']['accounts'].first['id']).to eq(selected_account.id)
          expect(response).to match_json_schema('v0/accounts/show')
        end
      end
    end

    describe 'failure' do
      include_context 'forbidden'
      include_context 'unauthorized'

      context 'when account id is not valid' do
        let(:selected_account) { create(:account) }

        it 'returns not_found' do
          expect(response).to be_not_found
        end
      end
    end
  end

  describe 'POST#create' do
    let(:user) { create(:user) }
    let(:access_token) { valid_jwt(user) }
    let(:headers) do
      {
        Authorization: access_token
      }
    end

    let(:account_name) { 'test_account_no_01' }
    let(:initial_balance_cents) { nil }
    let(:params) do
      {
        name: account_name,
        initial_balance_cents:
      }
    end

    before { post '/api/v0/accounts', headers:, params: }

    describe 'success' do
      context 'with default params' do
        it 'creates and return new account with initial balance 0' do
          expect(response).to be_created
          expect(response.parsed_body['data']['accounts'].count).to eq(1)
          expect(response.parsed_body['data']['accounts'].first['balance_cents']).to eq(0)
          expect(response.parsed_body['data']['accounts'].first['name']).to eq(account_name)
          expect(response.parsed_body['data']['accounts'].first['total_expense_cents']).to eq(0)
          expect(response.parsed_body['data']['accounts'].first['total_income_cents']).to eq(0)
          expect(response.parsed_body['data']['accounts'].first['initial_balance_cents']).to eq(0)
          expect(response).to match_json_schema('v0/accounts/create')
        end
      end

      context 'when initial balance is given' do
        let(:initial_balance_cents) { 1000 }

        it 'creates and return new account with given initial balance' do
          expect(response).to be_created
          expect(response.parsed_body['data']['accounts'].count).to eq(1)
          expect(response.parsed_body['data']['accounts'].first['balance_cents']).to eq(initial_balance_cents)
          expect(response.parsed_body['data']['accounts'].first['name']).to eq(account_name)
          expect(response.parsed_body['data']['accounts'].first['total_expense_cents']).to eq(0)
          expect(response.parsed_body['data']['accounts'].first['total_income_cents']).to eq(0)
          expect(response.parsed_body['data']['accounts'].first['initial_balance_cents']).to eq(initial_balance_cents)
          expect(response).to match_json_schema('v0/accounts/create')
        end
      end
    end

    describe 'failure' do
      include_context 'forbidden'
      include_context 'unauthorized'

      context 'when account with name already exist' do
        let(:account) { create(:account, user:) }
        let(:params) do
          {
            name: account.name,
            initial_balance_cents:
          }
        end

        it 'returns not_found' do
          expect(response).to be_unprocessable
          expect(response.parsed_body['errors'][0]).to eq('Name has already been taken')
        end
      end

      context 'when account name is not provided' do
        let(:params) { {} }

        it 'returns not_found' do
          expect(response).to be_unprocessable
          expect(response.parsed_body['errors'].count > 0).to be_truthy
        end
      end
    end
  end

  describe 'DELETE#destroy' do
    let(:user) { create(:user) }
    let(:access_token) { valid_jwt(user) }
    let(:headers) do
      {
        Authorization: access_token
      }
    end
    let(:accounts) { create_list(:account, 100, user:) }
    let(:selected_account) { accounts.sample }

    before { delete "/api/v0/accounts/#{selected_account.id}", headers: }

    describe 'success' do
      context 'when account id is valid' do
        it 'deletes account' do
          expect(response).to be_ok
          expect(response).to match_json_schema('v0/accounts/destroy')
          expect(Account.find_by(id: selected_account.id)).to be_nil
        end
      end
    end

    describe 'failure' do
      include_context 'forbidden'
      include_context 'unauthorized'

      context 'when account id is not valid' do
        let(:selected_account) { create(:account) }

        it 'returns not_found' do
          expect(response).to be_not_found
        end
      end
    end
  end

  describe 'PATCH#update' do
    let(:user) { create(:user) }
    let(:access_token) { valid_jwt(user) }
    let(:headers) do
      {
        Authorization: access_token
      }
    end
    let(:i_balance_cents) { 2000 }
    let(:i_initial_balance_cents) { 3000 }
    let!(:account) { create(:account, user:, initial_balance_cents: i_initial_balance_cents, balance_cents: i_balance_cents) }
    let(:u_initial_balance_cents) { 1000 }
    let(:updated_name) { 'name_01' }
    let(:params) do
      {
        name: updated_name,
        initial_balance_cents: u_initial_balance_cents
      }
    end

    before { patch "/api/v0/accounts/#{account.id}", params:, headers: }

    describe 'success' do
      context 'when account id is valid' do
        it 'updates account' do
          expect(response).to be_ok
          expect(response).to match_json_schema('v0/accounts/update')
          acc = Account.find_by(id: account.id)
          expect(acc.name).to eql(updated_name)
          expect(acc.initial_balance_cents).to eql(u_initial_balance_cents)
        end
      end

      context 'when initial balance is increased' do
        let(:u_initial_balance_cents) { 4000 }

        it 'should increase account balance' do
          expect(response).to be_ok
          updated_balance = account.balance_cents + 1000
          expect(response.parsed_body['data']['accounts'][0]['balance_cents']).to eql(updated_balance)
          expect(response.parsed_body['data']['accounts'][0]['initial_balance_cents']).to eql(u_initial_balance_cents)
          expect(response).to match_json_schema('v0/accounts/update')
          acc = Account.find_by(id: account.id)
          expect(acc.initial_balance_cents).to eql(u_initial_balance_cents)
          expect(acc.balance_cents).to eql(updated_balance)
        end
      end

      context 'when initial balance is decreased' do
        let(:u_initial_balance_cents) { 2000 }

        it 'should decreased account balance' do
          expect(response).to be_ok
          updated_balance = account.balance_cents - 1000
          expect(response.parsed_body['data']['accounts'][0]['balance_cents']).to eql(updated_balance)
          expect(response.parsed_body['data']['accounts'][0]['initial_balance_cents']).to eql(u_initial_balance_cents)
          expect(response).to match_json_schema('v0/accounts/update')
          acc = Account.find_by(id: account.id)
          expect(acc.initial_balance_cents).to eql(u_initial_balance_cents)
          expect(acc.balance_cents).to eql(updated_balance)
        end
      end
    end

    describe 'failure' do
      include_context 'forbidden'
      include_context 'unauthorized'

      context 'when account id is not valid' do
        let(:account) { create(:account) }

        it 'returns not_found' do
          expect(response).to be_not_found
        end
      end
    end
  end
end
