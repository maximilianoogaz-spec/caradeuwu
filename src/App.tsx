import { useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, CalendarDays, Check, Heart, LockKeyhole, Sparkles } from 'lucide-react'

type Step = 'question' | 'date' | 'payment' | 'success'

const MONTHS = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const WEEKDAYS = ['LU', 'MA', 'MI', 'JU', 'VI', 'SÁ', 'DO']

function Calendar({ value, onChange }: { value: Date | null; onChange: (date: Date) => void }) {
  const today = useMemo(() => new Date(), [])
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const firstDay = (view.getDay() + 6) % 7
  const days = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells = Array.from({ length: firstDay + days }, (_, index) => index < firstDay ? null : index - firstDay + 1)

  const changeMonth = (amount: number) => setView(current => new Date(current.getFullYear(), current.getMonth() + amount, 1))
  const isSelected = (day: number) => value?.getFullYear() === view.getFullYear() && value?.getMonth() === view.getMonth() && value?.getDate() === day

  return (
    <div className="calendar">
      <div className="calendar-head">
        <button aria-label="Mes anterior" onClick={() => changeMonth(-1)}><ArrowLeft size={18} /></button>
        <strong>{MONTHS[view.getMonth()]} {view.getFullYear()}</strong>
        <button aria-label="Mes siguiente" onClick={() => changeMonth(1)}><ArrowRight size={18} /></button>
      </div>
      <div className="calendar-grid weekdays">{WEEKDAYS.map(day => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid days">
        {cells.map((day, index) => day === null ? <span key={`empty-${index}`} /> : (
          <button
            key={day}
            className={isSelected(day) ? 'selected' : ''}
            disabled={new Date(view.getFullYear(), view.getMonth(), day, 23, 59) < today}
            onClick={() => onChange(new Date(view.getFullYear(), view.getMonth(), 26))}
          >{day}</button>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('question')
  const [date, setDate] = useState<Date | null>(null)
  const [noPosition, setNoPosition] = useState<{ x: number; y: number } | null>(null)
  const playArea = useRef<HTMLDivElement>(null)

  const dodgeNo = () => {
    const area = playArea.current
    if (!area) return
    const padding = 10
    const buttonWidth = 100
    const buttonHeight = 48
    setNoPosition({
      x: padding + Math.random() * Math.max(0, area.clientWidth - buttonWidth - padding * 2),
      y: padding + Math.random() * Math.max(0, area.clientHeight - buttonHeight - padding * 2),
    })
  }

  const formattedDate = date?.toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <main>
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />

      {step === 'question' && (
        <section className="hero">
          <h1><em>SITA</em> contigo</h1>
          <p className="love-note">tkm beamonos pofabo</p>
          <div className="play-area" ref={playArea}>
            <button className="yes-button" onClick={() => setStep('date')}><Heart size={20} fill="currentColor" /> Sí, obvio</button>
            <button
              className="no-button"
              style={noPosition ? { left: noPosition.x, top: noPosition.y } : undefined}
              onMouseEnter={dodgeNo}
              onPointerDown={dodgeNo}
              onFocus={dodgeNo}
            >No</button>
          </div>
        </section>
      )}

      {step === 'date' && (
        <section className="card date-card">
          <div className="icon-badge"><CalendarDays size={25} /></div>
          <p className="eyebrow">AHORA LO IMPORTANTE</p>
          <h2>Elige nuestro día</h2>
          <p className="muted">Marca una fecha para esta cita que promete.</p>
          <Calendar value={date} onChange={setDate} />
          <button className="primary wide" disabled={!date} onClick={() => setStep('payment')}>Continuar <ArrowRight size={18} /></button>
        </section>
      )}

      {step === 'payment' && (
        <section className="card payment-card">
          <div className="icon-badge"><Sparkles size={25} /></div>
          <p className="eyebrow">ÚLTIMO PASITO</p>
          <h2>Reserva confirmada</h2>
          <p className="muted">Tu cita está a punto de quedar oficialmente agendada.</p>
          <div className="receipt">
            <div><span>Fecha</span><strong>{formattedDate}</strong></div>
            <div><span>Plan</span><strong>Cita sorpresa ✨</strong></div>
            <div className="total"><span>Total ficticio</span><strong>$2.990</strong></div>
          </div>
          <button className="primary wide" onClick={() => setStep('success')}><LockKeyhole size={17} /> Pagar $2.990</button>
          <p className="fake-note"><LockKeyhole size={12} /> Pago de mentira · No se solicitarán datos reales</p>
          <button className="text-button" onClick={() => setStep('date')}>Cambiar fecha</button>
        </section>
      )}

      {step === 'success' && (
        <section className="card success-card">
          <div className="success-icon"><Check size={32} strokeWidth={3} /></div>
          <p className="eyebrow">¡TRATO HECHO!</p>
          <h2>Tenemos una cita</h2>
          <p className="muted">Nos vemos el <strong>{formattedDate}</strong>.<br />Yo pongo el plan, tú trae esa sonrisa.</p>
          <div className="ticket"><Heart fill="currentColor" /><span>ADMIT ONE</span><b>$2.990</b></div>
          <button className="text-button" onClick={() => { setStep('question'); setDate(null) }}>Volver al inicio</button>
        </section>
      )}
      <footer>HECHO CON <Heart size={12} fill="currentColor" /> Y UN POQUITO DE VALENTÍA</footer>
    </main>
  )
}

export default App
