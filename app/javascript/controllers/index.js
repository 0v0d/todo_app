// Import and register all your controllers from the importmap under controllers/*

import { application } from "controllers/application"

// Eager load all controllers defined in the import map under controllers/**/*_controller
import { eagerLoadControllersFrom } from "@hotwired/stimulus-loading"
eagerLoadControllersFrom("controllers", application)

import SortableController from "./tasks_sortable_controller"
application.register("sortable", SortableController)

import ModalResetController from "./modal_reset_controller"
application.register("modal-reset", ModalResetController)

import TaskFormController from "./task_form_controller"
application.register("task-form", TaskFormController)