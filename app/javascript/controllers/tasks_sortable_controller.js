import { Controller } from "@hotwired/stimulus"
import Sortable from "sortablejs"

export default class extends Controller {
    connect() {
        this.sortable = Sortable.create(this.element, {
            handle: ".sortable-handle",
            animation: 150,
            onEnd: this.end.bind(this)
        })
    }

    disconnect() {
        if (this.sortable) {
            this.sortable.destroy()
            this.sortable = null
        }
    }

    end(event) {
        const id = event.item.dataset.taskId
        const position = event.newIndex + 1

        fetch(`/tasks/${id}/sort`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-Token': this.getCSRFToken()
            },
            body: JSON.stringify({ position })
        })
    }

    getCSRFToken() {
        return document.querySelector('meta[name="csrf-token"]').content
    }
}
