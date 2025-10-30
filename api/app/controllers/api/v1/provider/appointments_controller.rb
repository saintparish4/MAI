module Api
    module V1
      module Provider
        class AppointmentsController < ApplicationController
          before_action :authenticate_provider!
          before_action :set_appointment, only: [:update, :complete, :cancel]
          
          # GET /api/v1/provider/appointments
          def index
            appointments = current_provider.appointments
                                          .includes(:patient)
                                          .order(start_time: :desc)
            
            upcoming = appointments.where('start_time >= ?', Time.current)
            past = appointments.where('start_time < ?', Time.current)
            
            render json: {
              upcoming: upcoming.as_json(include: { patient: { only: [:id, :email] } }),
              past: past.as_json(include: { patient: { only: [:id, :email] } })
            }
          end
          
          # PATCH /api/v1/provider/appointments/:id
          def update
            if @appointment.update(appointment_params)
              render json: {
                message: 'Appointment updated successfully',
                appointment: @appointment
              }
            else
              render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
            end
          end
          
          # PATCH /api/v1/provider/appointments/:id/complete
          def complete
            if @appointment.start_time > Time.current
              return render json: { error: 'Cannot mark future appointments as complete' }, status: :unprocessable_entity
            end
            
            if @appointment.update(status: 'completed', notes: params[:notes])
              render json: {
                message: 'Appointment marked as complete',
                appointment: @appointment
              }
            else
              render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
            end
          end
          
          # PATCH /api/v1/provider/appointments/:id/cancel
          def cancel
            if @appointment.update(status: 'cancelled')
              NotificationService.send_cancellation_notifications(@appointment, 'provider')
              render json: {
                message: 'Appointment cancelled successfully',
                appointment: @appointment
              }
            else
              render json: { errors: @appointment.errors.full_messages }, status: :unprocessable_entity
            end
          end
          
          private
          
          def set_appointment
            @appointment = current_provider.appointments.find(params[:id])
          rescue ActiveRecord::RecordNotFound
            render json: { error: 'Appointment not found' }, status: :not_found
          end
          
          def appointment_params
            params.permit(:notes)
          end
          
          def authenticate_provider!
            authenticate_request
            
            unless current_user&.provider?
              render json: { error: 'Unauthorized - Provider access only' }, status: :unauthorized
            end
          end
          
          def current_provider
            @current_provider ||= current_user.provider_profile
          end
        end
      end
    end
  end