class TasksController < ApplicationController
  before_action :set_task, only: [ :show, :edit, :update, :sort ]

  def index
    @tasks = Task.order(:position)
    @has_tasks = @tasks.exists?
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to tasks_path
    end
  end

  def update
    if @task.update(task_params)
      redirect_to @task
    end
  end

  def show
  end

  def edit
  end

  def sort
    @task.insert_at(params[:position].to_i)
    head :ok
  end

  def delete_selected
    if params[:task_ids].present?
      Task.where(id: params[:task_ids]).destroy_all
      render json: { success: true }
    else
      render json: { success: false }
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params.require(:task).permit(:title, :description, :completed, :due_date_year, :due_date_month, :due_date_day, :due_time)
  end
end
