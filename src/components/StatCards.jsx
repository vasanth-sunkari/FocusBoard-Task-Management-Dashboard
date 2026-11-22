import React from 'react'
import { ArrowDownRight, ArrowUpRight, Check, Clock3, ListTodo, Target } from 'lucide-react'

const statDetails = [
  { key: 'total', label: 'Total tasks', icon: ListTodo, iconClass: 'stat-icon-violet', trend: '+12.5%', trendUp: true, caption: 'vs. last week' },
  { key: 'progress', label: 'In progress', icon: Clock3, iconClass: 'stat-icon-blue', trend: '2 due soon', caption: 'Stay on track' },
  { key: 'completed', label: 'Completed', icon: Check, iconClass: 'stat-icon-green', trend: '+8.2%', trendUp: true, caption: 'vs. last week' },
  { key: 'rate', label: 'Completion rate', icon: Target, iconClass: 'stat-icon-orange', trend: '+4.3%', trendUp: true, caption: 'vs. last week' },
]

export default function StatCards({ tasks }) {
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0
  const values = { total: tasks.length, progress: inProgress, completed, rate: `${completionRate}%` }

  return (
    <section className="stats-grid" aria-label="Task statistics">
      {statDetails.map(({ key, label, icon: Icon, iconClass, trend, trendUp, caption }) => (
        <article className="stat-card" key={key}>
          <div className="stat-card-top">
            <span className="stat-label">{label}</span>
            <span className={`stat-icon ${iconClass}`}><Icon size={17} strokeWidth={2} /></span>
          </div>
          <div className="stat-value">{values[key]}</div>
          <div className="stat-foot">
            <span className={`stat-trend ${trendUp ? 'trend-up' : key === 'progress' ? 'trend-neutral' : ''}`}>
              {trendUp ? <ArrowUpRight size={13} /> : key === 'progress' ? <Clock3 size={12} /> : <ArrowDownRight size={13} />}
              {trend}
            </span>
            <span>{caption}</span>
          </div>
        </article>
      ))}
    </section>
  )
}
