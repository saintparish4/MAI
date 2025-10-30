module Api
    module V1
      module Provider
        class DashboardController < ApplicationController
          before_action :authenticate_provider!
          
          # GET /api/v1/provider/dashboard
          def index
            render json: {
              provider: current_provider.as_json(only: [:id, :name, :specialty, :avatar_url]),
              stats: calculate_stats,
              upcoming_appointments: upcoming_appointments_json,
              recent_appointments: recent_appointments_json,
              calendar_connected: current_provider.calendar_connected?
            }
          end
          
          private
          
          def calculate_stats
            {
              total_appointments: total_appointments_count,
              this_week_appointments: this_week_appointments_count,
              completion_rate: completion_rate,
              average_duration: average_duration,
              top_appointment_reasons: top_appointment_reasons
            }
          end
          
          def total_appointments_count
            current_provider.appointments.count
          end
          
          def this_week_appointments_count
            current_provider.appointments
                           .where(start_time: Time.current.beginning_of_week..Time.current.end_of_week)
                           .count
          end
          
          def completion_rate
            total = current_provider.appointments.where(status: %w[completed cancelled]).count
            return 0 if total.zero?
            
            completed = current_provider.appointments.where(status: 'completed').count
            ((completed.to_f / total) * 100).round(1)
          end
          
          def average_duration
            durations = current_provider.appointments
                                       .where(status: 'completed')
                                       .pluck(:start_time, :end_time)
                                       .map { |start, finish| (finish - start) / 60 }
            
            return 0 if durations.empty?
            
            (durations.sum / durations.count).round
          end
          
          def top_appointment_reasons
            current_provider.appointments
                           .where.not(notes: nil)
                           .group(:notes)
                           .order('count_all DESC')
                           .limit(5)
                           .count
                           .map { |reason, count| { reason: reason, count: count } }
          end
          
          def upcoming_appointments_json
            current_provider.appointments
                           .includes(:patient)
                           .where('start_time >= ?', Time.current)
                           .order(start_time: :asc)
                           .limit(10)
                           .as_json(
                             include: {
                               patient: { only: [:id, :email] }
                             },
                             methods: [:formatted_time]
                           )
          end
          
          def recent_appointments_json
            current_provider.appointments
                           .includes(:patient)
                           .where('start_time < ?', Time.current)
                           .order(start_time: :desc)
                           .limit(10)
                           .as_json(
                             include: {
                               patient: { only: [:id, :email] }
                             },
                             methods: [:formatted_time]
                           )
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