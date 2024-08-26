module ApplicationHelper
  def due_date_class(task)
    task.due_date <= 3.days.from_now ? "text-danger" : "text-success"
  end

  def format_due_date(task)
    task.due_date.strftime("%Y-%m-%d %H:%M")
  end

  def due_date_distance(task)
    time_current = Time.current
    if task.due_date < time_current
      "#{distance_of_time_in_words(task.due_date, time_current)}#{t('index.ago')}"
    else
      distance_of_time_in_words(time_current, task.due_date)
    end
  end
end
