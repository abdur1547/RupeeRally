# frozen_string_literal: true

require 'sidekiq/web'

Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  
  authenticate :user, ->(user) { user.admin? } do
    mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  get 'up' => 'rails/health#show', as: :rails_health_check

  root 'welcome#index'

  draw :api_v0
end
