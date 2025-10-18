class ProvidersController < ApplicationController
    skip_before_action :authenticate_request, only: [:index, :show]

    # GET /providers
    def index
        @providers = Provider.all

        # Apply filters 
        @providers = @providers.by_specialty(params[:specialty]) if params[:specialty].present?
        @providers = @providers.by_location(params[:location]) if params[:location].present?
        @providers = @providers.rated_above(params[:rating]) if params[:rating].present?

        # Sorting 
        @providers = case params[:sort]
                    when 'rating_desc'
                        @providers.order(rating: :desc)
                    when 'rating_asc'
                        @providers.order(rating: :asc)
                    when 'price_desc'
                        @providers.order(hourly_rate: :desc)
                    when 'price_asc'
                        @providers.order(hourly_rate: :asc)
                    when 'experience_desc'
                        @providers.order(experience_years: :desc)
                    else
                        @providers.order(created_at: :desc)
                    end
        
        render json: {
            providers: @providers.as_json(include: :availabilities),
            total: @providers.count, 
        }
    end

    # GET /providers/:id
    def show
        provider = Provider.find(params[:id])
        render json: {
            provider: provider.as_json(include: :availabilities)
        }
    rescue ActiveRecord::RecordNotFound
        render json: { error: 'Provider not found' }, status: :not_found
    end
end