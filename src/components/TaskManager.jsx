import React, { useMemo, useState } from 'react'
import { CalendarDays, Check, ChevronDown, Circle, Clock3, Pencil, Search, Trash2 } from 'lucide-react'

const tabs = ['All tasks', 'To do', 'In Progress', 'Completed']

function getStatusIcon(status) {
  if (status === 'Completed') return Check
  if (status === 'In Progress') return Clock3
  return Circle
}

export default function TaskManager({ tasks, activeTab, onTabChange, onEdit, onDelete }) {
  const [search, setSearch] = useState('')
  const [priority, setPriority] = useState('All priorities')

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesTab = activeTab === 'All tasks' || task.status === activeTab
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || `${task.title} ${task.description}`.toLowerCase().includes(query)
    const matchesPriority = priority === 'All priorities' || task.priority === priority
    return matchesTab && matchesSearch && matchesPriority
  }), [activeTab, priority, search, tasks])

  const confirmDelete = (task) => {
    if (window.confirm(`Delete "${task.title}"? This action cannot be undone.`)) onDelete(task.id)
  }

  return (
    <section className="task-manager" id="tasks">
      <div className="task-section-heading">
        <div>
          <div className="section-eyebrow"><span className="heading-dot" /> YOUR WORKSPACE</div>
          <h2>Tasks <span className="task-total">{tasks.length}</span></h2>
        </div>
        <button className="view-all-button" onClick={() => onTabChange('All tasks')} type="button">View all <span>↗</span></button>
      </div>
      <div className="task-toolbar">
        <div className="task-tabs" role="tablist" aria-label="Filter tasks by status">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={`task-tab ${activeTab === tab ? 'is-active' : ''}`}
              key={tab}
              onClick={() => onTabChange(tab)}
              role="tab"
              type="button"
            >
              {tab}<span className="tab-count">{tab === 'All tasks' ? tasks.length : tasks.filter((task) => task.status === tab).length}</span>
            </button>
          ))}
        </div>
        <div className="task-filters">
          <label className="task-search">
            <Search size={15} />
            <input aria-label="Search tasks" onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." value={search} />
          </label>
          <label className="priority-select">
            <select aria-label="Filter by priority" onChange={(event) => setPriority(event.target.value)} value={priority}>
              <option>All priorities</option><option>High</option><option>Medium</option><option>Low</option>
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </div>

      <div className="task-list">
        <div className="task-list-header">
          <span>TASK NAME</span><span>STATUS</span><span>PRIORITY</span><span>DUE DATE</span><span />
        </div>
        {filteredTasks.length ? filteredTasks.map((task) => {
          const StatusIcon = getStatusIcon(task.status)
          return (
            <article className="task-row" key={task.id}>
              <div className="task-name-cell">
                <span className={`task-color-mark mark-${task.color || 'violet'}`} />
                <div className="task-title-copy">
                  <strong>{task.title}</strong>
                  <span>{task.description || 'No description added'}</span>
                </div>
              </div>
              <div className="task-status-cell">
                <span className={`status-pill status-${task.status.toLowerCase().replace(' ', '-')}`}><StatusIcon size={13} />{task.status}</span>
              </div>
              <div className="task-priority-cell">
                <span className={`priority-label priority-${task.priority.toLowerCase()}`}><span />{task.priority}</span>
              </div>
              <div className="task-date-cell"><CalendarDays size={14} /><span>{task.dueDate || 'No date'}</span></div>
              <div className="task-actions-cell">
                <button className="row-action" aria-label={`Edit ${task.title}`} onClick={(event) => onEdit(task, event.currentTarget)} type="button"><Pencil size={15} /></button>
                <button className="row-action delete-action" aria-label={`Delete ${task.title}`} onClick={() => confirmDelete(task)} type="button"><Trash2 size={15} /></button>
              </div>
            </article>
          )
        }) : (
          <div className="empty-state">
            <span><Search size={19} /></span>
            <strong>No tasks found</strong>
            <p>Try changing your search or filters.</p>
          </div>
        )}
      </div>
      <div className="task-list-footer"><span>Showing <strong>{filteredTasks.length}</strong> of <strong>{tasks.length}</strong> tasks</span><span>Last updated just now <span className="footer-status-dot" /></span></div>
    </section>
  )
}
