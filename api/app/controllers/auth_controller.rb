class AuthController < ApplicationController
    skip_before_action :authenticate_request, only: [:login, :signup]
    
    # POST /auth/signup
    def signup
      user = User.new(user_params)
      
      if user.save
        token = JsonWebToken.encode(user_id: user.id)
        session[:user_id] = user.id # Set session
        
        render json: { 
          user: user.as_json(only: [:id, :email]),
          token: token, # JWT for mobile clients
          message: 'Account created successfully' 
        }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # POST /auth/login
    def login
      user = User.find_by(email: params[:email]&.downcase)
      
      if user&.authenticate(params[:password])
        token = JsonWebToken.encode(user_id: user.id)
        session[:user_id] = user.id # Set session
        
        render json: { 
          user: user.as_json(only: [:id, :email]),
          token: token, # JWT for mobile clients
          message: 'Logged in successfully' 
        }
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end
    
    # DELETE /auth/logout
    def logout
      session[:user_id] = nil
      render json: { message: 'Logged out successfully' }
    end
    
    # GET /auth/me
    def me
      render json: { user: current_user.as_json(only: [:id, :email]) }
    end
    
    # PATCH /auth/preferences
    def update_preferences
      if current_user.update(preference_params)
        render json: {
          message: 'Preferences updated successfully',
          user: current_user.as_json(only: [:id, :email, :booking_confirmations, :reminders_24h, :cancellation_notices])
        }
      else
        render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    private
    
    def user_params
      params.permit(:email, :password, :password_confirmation)
    end
    
    def preference_params
      params.permit(:booking_confirmations, :reminders_24h, :cancellation_notices)
    end
  end