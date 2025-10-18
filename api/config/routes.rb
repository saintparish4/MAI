Rails.application.routes.draw do
  # Auth routes
 post 'auth/signup', to: 'auth#signup'
 post 'auth/login', to: 'auth#login'
 delete 'auth/logout', to: 'auth#logout'
 get 'auth/me', to: 'auth#me'
 
 # Providers routes
 resources :providers, only: [:index, :show] do
    member do 
        get 'available_slots', to: 'slots#available_slots'
    end
  end

  # Appointments routes
  resources :appointments, only: [:index, :show, :create] do
    member do 
        patch 'cancel' 
    end
  end
end

