class RenameUserIdToPatientIdInAppointments < ActiveRecord::Migration[8.0]
  def change
    rename_column :appointments, :user_id, :patient_id
  end
end
