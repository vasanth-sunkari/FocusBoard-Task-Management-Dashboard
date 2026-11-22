import React, { useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

export default function FocusNotes({ notes }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const note = notes[activeIndex]
  const goTo = (direction) => setActiveIndex((index) => (index + direction + notes.length) % notes.length)

  return (
    <section className="focus-section" aria-label="Focus notes">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow"><Sparkles size={13} /> A MOMENT FOR YOU</div>
          <h2>Focus notes</h2>
        </div>
        <div className="carousel-controls">
          <button className="carousel-button" onClick={() => goTo(-1)} aria-label="Previous note" type="button"><ArrowLeft size={16} /></button>
          <button className="carousel-button" onClick={() => goTo(1)} aria-label="Next note" type="button"><ArrowRight size={16} /></button>
        </div>
      </div>
      <div className={`focus-note note-${note.theme}`} aria-live="polite">
        <div className="note-copy">
          <span className="note-eyebrow">{note.eyebrow}</span>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <span className="note-author"><span /> {note.author}</span>
        </div>
        <div className="note-art" aria-hidden="true">
          <span className="note-orbit orbit-one" />
          <span className="note-orbit orbit-two" />
          <span className="note-star">{note.icon}</span>
          <span className="note-art-dot dot-one" />
          <span className="note-art-dot dot-two" />
        </div>
      </div>
      <div className="carousel-indicators" aria-label={`Note ${activeIndex + 1} of ${notes.length}`}>
        {notes.map((item, index) => (
          <button
            aria-label={`Show note ${index + 1}`}
            aria-current={index === activeIndex ? 'true' : undefined}
            className={`indicator ${index === activeIndex ? 'is-active' : ''}`}
            key={item.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          />
        ))}
        <span>{String(activeIndex + 1).padStart(2, '0')} <span>/</span> {String(notes.length).padStart(2, '0')}</span>
      </div>
    </section>
  )
}
