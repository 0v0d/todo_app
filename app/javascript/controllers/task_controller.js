import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
    static targets = ["deleteSelectedBox", "checkbox", "taskList", "noTasksMessage", "tableContainer", "selectAll"]

    connect() {
        this.hideDeleteButton()
        this.updateSelectAllState()
    }

    showDeleteButton() {
        this.deleteSelectedBoxTarget.style.display = 'block'
    }

    hideDeleteButton() {
        this.deleteSelectedBoxTarget.style.display = 'none'
    }

    toggleDeleteBox() {
        const checkedBoxes = this.checkboxTargets.filter(checkbox => checkbox.checked)
        if (checkedBoxes.length > 0) {
            this.showDeleteButton()
        } else {
            this.hideDeleteButton()
        }
        this.updateSelectAllState()
    }

    deleteSelectedTasks(event) {
        event.preventDefault()
        const selectedTasks = this.checkboxTargets.filter(checkbox => checkbox.checked)
        const selectedTaskIds = selectedTasks.map(checkbox => checkbox.value)

        if (selectedTaskIds.length === 0) {
            alert(event.currentTarget.dataset.noItemsMessage)
            return
        }

        if (confirm(event.currentTarget.dataset.confirmMessage)) {
            fetch('/tasks/delete_selected', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': this.getCSRFToken()
                },
                body: JSON.stringify({task_ids: selectedTaskIds})
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        selectedTaskIds.forEach(id => {
                            const row = document.querySelector(`tr[data-task-id="${id}"]`)
                            if (row) row.remove()
                        })
                        this.hideDeleteButton()
                        this.checkIfNoTasks()
                    } else {
                        alert(data.message)
                    }
                })
        }
    }

    toggleAllCheckboxes(event) {
        this.checkboxTargets.forEach(checkbox => {
            checkbox.checked = event.target.checked
        })
        this.toggleDeleteBox()
    }

    checkIfNoTasks() {
        const remainingTasks = this.taskListTarget.querySelectorAll('tr[data-task-id]')
        if (remainingTasks.length === 0) {
            this.tableContainerTarget.style.display = 'none'
            this.noTasksMessageTarget.style.display = 'block'
        } else {
            this.tableContainerTarget.style.display = 'block'
            this.noTasksMessageTarget.style.display = 'none'
        }
    }

    updateSelectAllState() {
        const totalCheckboxes = this.checkboxTargets.length
        const checkedBoxes = this.checkboxTargets.filter(checkbox => checkbox.checked).length

        if (checkedBoxes === totalCheckboxes) {
            this.selectAllTarget.checked = true
            this.selectAllTarget.indeterminate = false
        } else if (checkedBoxes > 0) {
            this.selectAllTarget.checked = false
            this.selectAllTarget.indeterminate = true
        } else {
            this.selectAllTarget.checked = false
            this.selectAllTarget.indeterminate = false
        }
    }

    getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
}
