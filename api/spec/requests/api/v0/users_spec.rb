# frozen_string_literal: true

require 'rails_helper'

RSpec.describe '/api/v0/users', type: :request do
  let(:user) { create(:user) }
  let(:access_token) { valid_jwt(user) }
  
  describe 'GET#user_info' do

    before do
      cookies[:access_token] = access_token
      get '/api/v0/user_info'
    end

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
end
