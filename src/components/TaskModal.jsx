import React, { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const emptyTask = { title: '', description: '', status: 'To do', priority: 'Medium', dueDate: '' }

export default function TaskModal({ open, task, onClose, onSave }) {
  const [form, setForm] = useState(emptyTask)
  const [titleError, setTitleError] = useState('')
  const dialogRef = useRef(null)
  const titleInputRef = useRef(null)
  const onCloseRef = useRef(onClose)

  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    setForm(task ? { ...task } : emptyTask)
    setTitleError('')
    titleInputRef.current?.focus()

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])')
        if (!focusable?.length) return

        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [open, task])

  if (!open) return null

  const updateField = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setTitleError('Enter a task name.')
      titleInputRef.current?.focus()
      return
    }
    setTitleError('')
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() })
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="task-modal" ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="task-modal-title">
        <div className="modal-heading">
          <div>
            <span className="modal-kicker">{task ? 'KEEP IT MOVING' : 'MAKE IT HAPPEN'}</span>
            <h2 id="task-modal-title">{task ? 'Edit task' : 'Create a task'}</h2>
          </div>
          <button className="icon-button modal-close" onClick={onClose} type="button" aria-label="Close dialog"><X size={18} /></button>
        </div>
        <form onSubmit={submit}>
          <label className="form-field">Task name
            <input
              aria-describedby={titleError ? 'task-title-error' : undefined}
              aria-invalid={titleError ? 'true' : undefined}
              maxLength={90}
              name="title"
              onChange={(event) => {
                updateField(event)
                if (event.target.value.trim()) setTitleError('')
              }}
              placeholder="What needs to get done?"
              ref={titleInputRef}
              required
              value={form.title}
            />
            {titleError && <span className="form-error" id="task-title-error" role="alert">{titleError}</span>}
          </label>
          <label className="form-field">Description
            <textarea maxLength={180} name="description" onChange={updateField} placeholder="Add a few details..." rows={3} value={form.description} />
          </label>
          <div className="form-row">
            <label className="form-field">Status
              <select name="status" onChange={updateField} value={form.status}>
                <option>To do</option><option>In Progress</option><option>Completed</option>
              </select>
            </label>
            <label className="form-field">Priority
              <select name="priority" onChange={updateField} value={form.priority}>
                <option>Low</option><option>Medium</option><option>High</option>
              </select>
            </label>
          </div>
          <label className="form-field">Due date
            <input maxLength={32} name="dueDate" onChange={updateField} placeholder="e.g. Tomorrow or Nov 28" value={form.dueDate} />
          </label>
          <div className="modal-actions">
            <button className="secondary-button" onClick={onClose} type="button">Cancel</button>
            <button className="primary-button" type="submit">{task ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
