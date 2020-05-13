Rails.application.routes.draw do

  namespace :api do
    resources :sessions do
      resources :people
    end

    resources :foods do
      resources :food_ingredients
    end

    resources :drinks do
      resources :drink_ingredents
    end
  end

  get '*other', to: 'static#index'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
