import React from 'react'
import { ArrowUpRight, Plus } from 'lucide-react'

export default function WelcomeSection({ onAddTask }) {
  return (
    <section className="welcome-section">
      <div>
        <div className="welcome-date"><span className="date-sparkle">✳</span> SUNDAY, NOVEMBER 22, 2026</div>
        <h1>Good morning, Jordan <span className="wave">✦</span></h1>
        <p>Make today count. You’re doing great — keep the momentum going.</p>
      </div>
      <button className="primary-button" onClick={(event) => onAddTask(event.currentTarget)} type="button">
        <Plus size={17} strokeWidth={2.4} /> Add new task <ArrowUpRight className="button-arrow" size={15} />
      </button>
    </section>
  )
}
