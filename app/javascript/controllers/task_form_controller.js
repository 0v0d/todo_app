import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["title", "dueDateYear", "dueDateMonth", "dueDateDay", "dueTime", "titleError", "dueDateError", "dueTimeError", "pastDateWarning", "addTaskButton"]

    connect() {
        console.log("TaskFormController connected")
        this.validateForm = this.validateForm.bind(this)
        this.addTaskButtonTarget.addEventListener('click', this.validateForm)
    }

    disconnect() {
        console.log("TaskFormController disconnected")
        this.addTaskButtonTarget.removeEventListener('click', this.validateForm)
    }

    clearErrors() {
        this.titleErrorTarget.classList.remove('d-block')
        this.dueDateErrorTarget.classList.remove('d-block')
        this.dueTimeErrorTarget.classList.remove('d-block')
        this.pastDateWarningTarget.classList.add('d-none')
    }

    validateForm(event) {
        let isValid = true
        this.clearErrors()

        if (this.titleTarget.value.trim() === '') {
            this.titleErrorTarget.classList.add('d-block')
            isValid = false
        }

        const isDueDateYearFilled = this.dueDateYearTarget.value !== ''
        const isDueDateMonthFilled = this.dueDateMonthTarget.value !== ''
        const isDueDateDayFilled = this.dueDateDayTarget.value !== ''

        if ((isDueDateYearFilled || isDueDateMonthFilled || isDueDateDayFilled) &&
            !(isDueDateYearFilled && isDueDateMonthFilled && isDueDateDayFilled)) {
            this.dueDateErrorTarget.classList.add('d-block')
            isValid = false
        }

        if (isDueDateYearFilled && isDueDateMonthFilled && isDueDateDayFilled && this.dueTimeTarget.value === '') {
            this.dueTimeTarget.value = "00:00"
        }

        if (isDueDateYearFilled && isDueDateMonthFilled && isDueDateDayFilled) {
            const dueDate = new Date(this.dueDateYearTarget.value, this.dueDateMonthTarget.value - 1, this.dueDateDayTarget.value, ...this.dueTimeTarget.value.split(':'))
            const now = new Date()

            if (dueDate < now) {
                this.pastDateWarningTarget.classList.remove('d-none')
                isValid = false
            }
        }

        if (!isValid) {
            event.preventDefault()
            event.stopPropagation()
        }
    }
}
