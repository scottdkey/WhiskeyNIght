# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api do
      resources :sessions do
        resources :attendees
      end

      resources :sessions do
        resources :items
      end

      resources :items do
        resources :ingredients
      end
  end

  get '*other', to: 'static#index'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
