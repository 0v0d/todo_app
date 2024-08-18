Rails.application.routes.draw do
  scope "(:locale)", locale: /#{I18n.available_locales.map(&:to_s).join('|')}/ do
    root "tasks#index"
    resources :tasks do
      collection do
        delete "delete_selected"
      end
      member do
        patch :sort
      end
    end
  end
end
