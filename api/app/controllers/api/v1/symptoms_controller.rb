module Api
    module V1
        class SymptomsController < ApplicationController
            skip_before_action :authenticate_request, only: [:analyze]

            # POST /api/v1/analyze-symptoms
            def analyze
                description = params[:description]

                if description.blank?
                    return render json: { error: 'Symptom description is required' }, status: :unprocessable_entity
                end

                if description.length < 10
                    return render json: { error: 'Please provide more details about your symptoms' }, status: :unprocessable_entity
                end

                if description.length > 1000
                    return render json: { error: 'Description is too long (max 1000 characters)' }, status: :unprocessable_entity
                end

                analyzer = SymptomAnalyzerService.new(description)
                result = analyzer.analyze

                render json: {
                    analysis: result,
                    timestamp: Time.current.iso8601
                }
            end
        end
    end
end