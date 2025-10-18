Rails.application.routes.draw do
 post 'auth/signup', to: 'auth#signup'
 post 'auth/login', to: 'auth#login'
 delete 'auth/logout', to: 'auth#logout'
 get 'auth/me', to: 'auth#me'
 
 # Providers routes
 resources :providers, only: [:index, :show] 
end