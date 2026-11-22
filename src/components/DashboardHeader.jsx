import React from 'react'
import { Bell, ChevronDown, Search } from 'lucide-react'

export default function DashboardHeader() {
  return (
    <header className="topbar">
      <div className="breadcrumb"><span>Workspace</span><span className="breadcrumb-divider">/</span><strong>Overview</strong></div>
      <div className="topbar-actions">
        <label className="global-search">
          <Search size={16} />
          <input aria-label="Search dashboard" placeholder="Search anything..." />
          <kbd>⌘ K</kbd>
        </label>
        <button className="icon-button notification-button" aria-label="Notifications" type="button">
          <Bell size={18} />
          <span className="notification-dot" />
        </button>
        <button className="topbar-user" type="button" aria-label="Jordan Davis profile">
          <span className="avatar">JD</span>
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  )
}
