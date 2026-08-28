import { useMemo, useRef, useState } from 'react'
import { AlertTriangle, ArrowLeft, BarChart3, ChevronRight, CircleAlert, ClipboardList, Heart, Pizza, RotateCcw, Search, Sparkles, Star, Trophy } from 'lucide-react'
import favoriteThings from './assets/gustos-favoritos.png'

type AppId = 'home' | 'cariño' | 'comida' | 'emergencia' | 'calificar' | 'estado' | 'reclamos' | 'logros' | 'indirectas'
const APPS = [
  { id: 'cariño', label: 'Cariño', icon: Heart, color: 'pink' }, { id: 'comida', label: 'Qué comemos', icon: Pizza, color: 'orange' },
  { id: 'emergencia', label: 'Emergencia', icon: AlertTriangle, color: 'red' }, { id: 'calificar', label: 'Calificar', icon: Star, color: 'yellow' },
  { id: 'estado', label: 'Estado de ánimo', icon: BarChart3, color: 'purple' }, { id: 'reclamos', label: 'Reclamos', icon: ClipboardList, color: 'blue' },
  { id: 'logros', label: 'Logros', icon: Trophy, color: 'green' }, { id: 'indirectas', label: 'Indirectas', icon: Search, color: 'lavender' },
] as const
const FOOD = ['Completo dinámico 🌭', 'Papitas con mantequilla 🥔', 'Atún con mayo y ají 🌶️', 'Tomatito con queso blanco 🍅', 'Completo dinámico 🌭', 'Completo dinámico 🌭']

function Home({ open }: { open: (id: AppId) => void }) {
  return <div className="home-screen">
    <div className="ios-status"><strong>9:41</strong><span>●●● ︿ ▰</span></div>
    <header className="hello"><div><span>LOVE OS · BETA</span><p>¿Qué necesitas hoy?</p></div><div className="avatar">♥</div></header>
    <button className="care-widget" onClick={() => open('estado')}><span className="pulse-dot" /><div><small>LOVECARE™ EN LÍNEA</small><strong>Todos los sistemas operativos</strong></div><ChevronRight size={20} /></button>
    <section className="apps-grid" aria-label="Aplicaciones">{APPS.map(item => { const Icon = item.icon; return <button key={item.id} className="app-tile" onClick={() => open(item.id)}><span className={`app-icon ${item.color}`}><Icon size={25} /></span><span>{item.label}</span></button> })}</section>
    <section className="daily-card"><span>REPORTE DIARIO</span><p>Probabilidad de que tu persona favorita quiera verte</p><strong>100%</strong><div><i /></div></section>
    <p className="version">Diseñado para parejas y simps profesionales ♡</p>
  </div>
}

function Shell({ title, back, children }: { title: string; back: () => void; children: React.ReactNode }) {
  return <div className="module-screen"><div className="ios-status module-status"><strong>9:41</strong><span>●●● ︿ ▰</span></div><header className="module-nav"><button onClick={back} aria-label="Volver"><ArrowLeft /></button><strong>{title}</strong><span /></header>{children}</div>
}
function Affection({ back }: { back: () => void }) {
  const [amount, setAmount] = useState(2); const [sent, setSent] = useState(false); const levels = ['poquito', 'normal', 'urgente', 'riesgo vital']
  return <Shell title="Solicitar cariño" back={back}><div className="module-body centered"><div className="big-emoji">💗</div><h2>¿Cuánto cariño necesitas?</h2><p>Selecciona cuidadosamente. No hay límite diario.</p><input className="love-range" type="range" min="0" max="3" value={amount} onChange={e => { setAmount(Number(e.target.value)); setSent(false) }} /><div className="range-labels"><span>poquito</span><span>riesgo vital</span></div><div className="result-pill">Nivel: <strong>{levels[amount]}</strong></div><button className="action" onClick={() => setSent(true)}>Enviar solicitud <Heart size={18} fill="currentColor" /></button>{sent ? <div className="success-message">✓ Orden emitida. Tu pareja tiene 0 minutos para presentarse.</div> : null}</div></Shell>
}
function Food({ back }: { back: () => void }) {
  const [choice, setChoice] = useState('Toca la ruleta'); const [spinning, setSpinning] = useState(false)
  const spin = () => { setSpinning(true); setChoice('Decidiendo algo muy serio…'); window.setTimeout(() => { setChoice(FOOD[Math.floor(Math.random() * FOOD.length)]); setSpinning(false) }, 900) }
  return <Shell title="¿Qué comemos?" back={back}><div className="module-body centered"><div className={`food-wheel ${spinning ? 'spin' : ''}`}><span>🌭</span><span>🥔</span><span>🍅</span><span>🌶️</span><b>?</b></div><h2>{choice}</h2><p>Algoritmo entrenado con gustos científicamente deliciosos.</p><button className="action" onClick={spin} disabled={spinning}><RotateCcw size={18} /> Girar ruleta</button><small className="fine-print">* La probabilidad de completo dinámico fue alterada sospechosamente.</small></div></Shell>
}
function Emergency({ back }: { back: () => void }) {
  const [active, setActive] = useState(false)
  return <Shell title="Emergencia" back={back}><div className="module-body centered emergency"><CircleAlert size={54} /><span>PROTOCOLO LOVECARE™</span><h2>Botón de emergencia</h2><p>Úsese ante frío, hambre, enojo o necesidad crítica de cariño.</p><button className={`sos ${active ? 'activated' : ''}`} onClick={() => setActive(true)}>{active ? 'SOLICITUD ENVIADA' : 'NECESITO MIMOS'}</button>{active ? <div className="success-message">Solicitud crítica enviada a tu persona favorita.</div> : null}</div></Shell>
}
function Rating({ back }: { back: () => void }) {
  const labels = ['Comportamiento', 'Facha', 'Capacidad de hacer reír', 'Nivel de aweonao']
  return <Shell title="Evaluar a tu pareja" back={back}><div className="module-body"><div className="big-emoji centered">⭐</div><h2 className="centered">Evaluación trimestral</h2><div className="ratings">{labels.map(label => <div key={label}><span>{label}</span><div>{[1,2,3,4,5].map(n => <button aria-label={`${n} estrellas`} key={n}><Star fill="currentColor" /></button>)}</div></div>)}</div><div className="system-note">Resultado: 5.0 · Error del sistema: valores inferiores no permitidos.</div></div></Shell>
}
function Status({ back }: { back: () => void }) {
  const stats = [['Nivel de sueño',82,'#8d76db'],['Hambre',64,'#e9a353'],['Ganas de verte',99.7,'#db5c73'],['Tolerancia a tonteras',12,'#65a991']]
  return <Shell title="Estado de ánimo" back={back}><div className="module-body"><div className="status-heading"><div><span>ACTUALIZADO AHORA</span><h2>Panel vital</h2></div><span className="live">● EN VIVO</span></div><div className="stats">{stats.map(([label,value,color]) => <div key={String(label)}><header><span>{label}</span><strong>{value}%</strong></header><div><i style={{ width:`${value}%`, background:String(color) }} /></div></div>)}</div><div className="diagnosis"><Sparkles /><div><strong>Diagnóstico del sistema</strong><p>Se recomienda ver a tu persona favorita y comer algo rico.</p></div></div></div></Shell>
}
function Complaints({ back }: { back: () => void }) {
  const [sent,setSent]=useState(false); const [selected,setSelected]=useState(''); const options=['Me molestó','Se demoró en responder','Anda muy lindo y me enoja','Otro delito gravísimo']
  return <Shell title="Sistema de reclamos" back={back}><div className="module-body"><h2>¿Qué hizo tu pareja ahora?</h2><p>Todos los reclamos son tratados con la seriedad que merecen.</p><div className="option-list">{options.map(o=><button className={selected===o?'selected':''} key={o} onClick={()=>{setSelected(o);setSent(false)}}>{o}<span>{selected===o?'✓':'○'}</span></button>)}</div><button className="action full" disabled={!selected} onClick={()=>setSent(true)}>Enviar reclamo</button>{sent?<div className="system-note">Reclamo recibido. Será ignorado cuidadosamente en 3–5 días hábiles.</div>:null}</div></Shell>
}
function Achievements({ back }: { back: () => void }) {
  const items=[['🏆','Primera cita','Desbloqueado'],['🏆','Nos aguantamos 30 días','Desbloqueado'],['🔒','No molestar por 24 horas','Imposible'],['🔒','Completar misión secreta','0% completado']]
  return <Shell title="Logros" back={back}><div className="module-body"><div className="achievement-title"><span>NIVEL ACTUAL</span><h2>Pareja legendaria</h2><div><i /></div></div><div className="achievement-list">{items.map(([icon,title,state],i)=><div className={i>1?'locked':''} key={title}><span>{icon}</span><div><strong>{title}</strong><small>{state}</small></div></div>)}</div></div></Shell>
}
function Detector({ back }: { back: () => void }) {
  const [text,setText]=useState(''); const [done,setDone]=useState(false); const results=useMemo(()=>[['Coqueteo detectado',94],['Simpeo',71],['Hacerse el desentendido',100]],[])
  return <Shell title="Detector de indirectas" back={back}><div className="module-body"><div className="big-emoji centered">🔮</div><h2 className="centered">Analizador profesional</h2><p className="centered">Escribe una frase sospechosa de tu persona favorita.</p><textarea value={text} onChange={e=>{setText(e.target.value);setDone(false)}} placeholder="Ej: oye, ¿qué haces hoy?" /><button className="action full" disabled={!text.trim()} onClick={()=>setDone(true)}>Analizar indirecta</button>{done?<div className="analysis-result">{results.map(([label,n])=><div key={String(label)}><span>{label}</span><strong>{n}%</strong></div>)}<p>Veredicto: quiere verte, pero intenta disimular.</p></div>:null}</div></Shell>
}
function App() {
  const [current, setCurrent] = useState<AppId>('home'); const history = useRef<AppId[]>([])
  const open = (id: AppId) => { history.current.push(current); setCurrent(id) }; const back = () => setCurrent(history.current.pop() ?? 'home')
  const views: Record<Exclude<AppId,'home'>, React.ReactNode> = { cariño:<Affection back={back}/>, comida:<Food back={back}/>, emergencia:<Emergency back={back}/>, calificar:<Rating back={back}/>, estado:<Status back={back}/>, reclamos:<Complaints back={back}/>, logros:<Achievements back={back}/>, indirectas:<Detector back={back}/> }
  return <main><img className="favorites-collage" src={favoriteThings} alt="" aria-hidden="true"/><div className="os-wash"/><div className="phone">{current==='home'?<Home open={open}/>:views[current]}</div></main>
}
export default App
