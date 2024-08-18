class Task < ApplicationRecord
  acts_as_list
  attr_accessor :due_date_year, :due_date_month, :due_date_day, :due_time
  before_save :combine_due_date_and_time

  private

  def combine_due_date_and_time
    if due_date_year.present? && due_date_month.present? && due_date_day.present? && due_time.present?
      date_str = "#{due_date_year}-#{due_date_month}-#{due_date_day} #{due_time}"
      self.due_date = Time.zone.parse(date_str)
    end
  end
end
