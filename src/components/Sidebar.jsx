import React from 'react'
import {
  CheckCheck,
  CircleCheck,
  LayoutDashboard,
  Settings,
  Target,
  ListTodo,
} from 'lucide-react'

const navigation = [
  { label: 'Dashboard', icon: LayoutDashboard },
  { label: 'My Tasks', icon: ListTodo },
  { label: 'Completed', icon: CircleCheck },
]

export default function Sidebar({ activeItem, taskCount, onNavigate }) {
  return (
    <aside className="sidebar">
      <a className="brand" href="#dashboard" aria-label="FocusBoard home">
        <span className="brand-mark"><CheckCheck size={19} strokeWidth={2.6} /></span>
        <span>focus<span className="brand-accent">board</span></span>
      </a>

      <div className="sidebar-section-label">WORKSPACE</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map(({ label, icon: Icon }) => (
          <button
            className={`nav-item ${activeItem === label ? 'is-active' : ''}`}
            key={label}
            onClick={() => onNavigate(label)}
            type="button"
          >
            <Icon size={18} strokeWidth={1.8} />
            <span>{label}</span>
            {label === 'My Tasks' && <span className="nav-count">{taskCount}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-tip">
          <div className="tip-icon"><Target size={17} /></div>
          <p>Make today count</p>
          <span>One focused step at a time.</span>
          <div className="tip-progress"><span /></div>
          <small>3 of 5 daily goals</small>
        </div>
        <button
          className={`nav-item settings-link ${activeItem === 'Settings' ? 'is-active' : ''}`}
          onClick={() => onNavigate('Settings')}
          type="button"
        >
          <Settings size={18} strokeWidth={1.8} />
          <span>Settings</span>
        </button>
        <div className="sidebar-profile">
          <div className="avatar avatar-small">JD</div>
          <div className="sidebar-profile-copy">
            <strong>Jordan Davis</strong>
            <span>Free plan</span>
          </div>
          <span className="profile-menu-dots" aria-hidden="true">···</span>
        </div>
      </div>
    </aside>
  )
}
