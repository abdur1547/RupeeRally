# frozen_string_literal: true

api_only_routes = %i[index show create update destroy]

namespace :api do
  namespace :v0 do
    get 'api_status', to: 'example#index'

    scope :auth do
      post :signup, to: 'auth#signup'
      post :signin, to: 'auth#signin'
      post :refresh, to: 'auth#refresh'
    end

    get :user_info, to: 'users#show'

    resources :accounts, only: api_only_routes
    resources :categories, only: api_only_routes
    resources :transactions, only: %i[index show destroy]
    resources :transfers, only: %i[create update]
    resources :individual_transactions, only: %i[create update]
    resources :shared_transactions, only: %i[create]
  end
end
