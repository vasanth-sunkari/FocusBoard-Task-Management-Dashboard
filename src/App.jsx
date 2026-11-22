import React, { useEffect, useRef, useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import DashboardHeader from './components/DashboardHeader.jsx'
import WelcomeSection from './components/WelcomeSection.jsx'
import StatCards from './components/StatCards.jsx'
import FocusNotes from './components/FocusNotes.jsx'
import TaskManager from './components/TaskManager.jsx'
import TaskModal from './components/TaskModal.jsx'
import { focusNotes, initialTasks } from './data/tasks.js'

const TASKS_STORAGE_KEY = 'focusboard.tasks'

function loadTasks() {
  let savedTasks
  try {
    savedTasks = window.localStorage.getItem(TASKS_STORAGE_KEY)
  } catch (error) {
    console.error('Could not read saved FocusBoard tasks.', error)
    return initialTasks
  }

  if (savedTasks === null) return initialTasks

  try {
    const parsedTasks = JSON.parse(savedTasks)
    if (Array.isArray(parsedTasks)) return parsedTasks
    console.error('Saved FocusBoard tasks are not a valid task list.')
  } catch (error) {
    console.error('Could not parse saved FocusBoard tasks.', error)
  }

  return initialTasks
}

export default function App() {
  const [tasks, setTasks] = useState(loadTasks)
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [activeTab, setActiveTab] = useState('All tasks')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const modalTrigger = useRef(null)

  useEffect(() => {
    try {
      window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks))
    } catch (error) {
      console.error('Could not save FocusBoard tasks.', error)
    }
  }, [tasks])

  const openNewTask = (trigger) => {
    modalTrigger.current = trigger
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEditTask = (task, trigger) => {
    modalTrigger.current = trigger
    setEditingTask(task)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    requestAnimationFrame(() => modalTrigger.current?.focus())
  }

  const saveTask = (task) => {
    if (editingTask) {
      setTasks((current) => current.map((item) => item.id === editingTask.id ? { ...item, ...task } : item))
    } else {
      setTasks((current) => [{ ...task, id: Date.now(), color: 'violet' }, ...current])
    }
    closeModal()
    setEditingTask(null)
  }

  const deleteTask = (taskId) => setTasks((current) => current.filter((task) => task.id !== taskId))

  const navigate = (item) => {
    setActiveItem(item)
    setActiveTab(item === 'Completed' ? 'Completed' : 'All tasks')
    if (item === 'My Tasks' || item === 'Completed') document.getElementById('tasks')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="dashboard-shell">
      <Sidebar activeItem={activeItem} taskCount={tasks.length} onNavigate={navigate} />
      <main className="main-content" id="dashboard">
        <DashboardHeader />
        <div className="dashboard-content">
          <WelcomeSection onAddTask={openNewTask} />
          <StatCards tasks={tasks} />
          <div className="overview-grid">
            <FocusNotes notes={focusNotes} />
            <aside className="week-card">
              <div className="week-card-heading"><span className="section-eyebrow">THIS WEEK</span><button aria-label="More weekly summary options" className="subtle-more" type="button">···</button></div>
              <div className="week-progress-line"><div><strong>Weekly progress</strong><span>Keep it up!</span></div><b>68%</b></div>
              <div className="week-progress-track"><span /></div>
              <div className="week-summary">
                <div><span className="summary-check"><CheckIcon /></span><strong>12</strong><small>tasks done</small></div>
                <span className="summary-divider" />
                <div><span className="summary-streak">✦</span><strong>4 days</strong><small>current streak</small></div>
              </div>
              <div className="week-message"><span>✦</span> You’re building a great rhythm!</div>
            </aside>
          </div>
          <TaskManager tasks={tasks} activeTab={activeTab} onTabChange={setActiveTab} onEdit={openEditTask} onDelete={deleteTask} />
        </div>
      </main>
      <TaskModal open={modalOpen} task={editingTask} onClose={closeModal} onSave={saveTask} />
    </div>
  )
}

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 16 16" fill="none"><path d="m3.5 8 3 3 6-6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" /></svg>
}
