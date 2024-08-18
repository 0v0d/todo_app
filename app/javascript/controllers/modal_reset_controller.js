import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    connect() {
        console.log("ModalResetController connected")
        this.resetForms = this.resetForms.bind(this)
        this.element.addEventListener('hidden.bs.modal', this.resetForms)
    }

    disconnect() {
        console.log("ModalResetController disconnected")
        this.element.removeEventListener('hidden.bs.modal', this.resetForms)
    }

    resetForms() {
        console.log("Resetting forms")
        this.element.querySelectorAll('form').forEach(form => {
            form.reset()
            // チェックボックスを明示的にリセット
            form.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
                checkbox.checked = checkbox.defaultChecked
            })
            // エラーメッセージを非表示にする
            form.querySelectorAll('.invalid-feedback').forEach(error => {
                error.classList.remove('d-block')
            })
            // 警告メッセージを非表示にする
            form.querySelectorAll('.alert-warning').forEach(alert => {
                alert.classList.add('d-none')
            })
        })
    }
}
