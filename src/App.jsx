import { useCallback, useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import './App.css'

const sections = [
  { id: 'inicio', label: 'Inicio', number: '01' },
  { id: 'perfil', label: 'Perfil', number: '02' },
  { id: 'proyectos', label: 'Proyectos', number: '03' },
  { id: 'rutas', label: 'Rutas', number: '04' },
  { id: 'contacto', label: 'Contacto', number: '05' },
]

const projects = [
  { code: 'ERP', title: 'Sistemas ERP', meta: 'Análisis · Diseño · QA' },
  { code: 'APK', title: 'Aplicaciones Android', meta: 'Producto · UX · Testing' },
  { code: 'WEB', title: 'Plataformas web', meta: 'UI · Responsive · Calidad' },
  { code: 'DESK', title: 'Software de escritorio', meta: 'Procesos · Gestión · QA' },
]

const base = import.meta.env.BASE_URL
const photos = [
  { src: `${base}routes/01.jpg` },
  { src: `${base}routes/02.jpg` },
  { src: `${base}routes/03.jpg` },
  { src: `${base}routes/04.jpg` },
  { src: `${base}routes/05.jpg` },
  { src: `${base}routes/06.jpg` },
  { src: `${base}routes/07.jpg` },
  { src: `${base}routes/08.jpg` },
  { src: `${base}routes/09.jpg` },
  { src: `${base}routes/10.jpg` },
  { src: `${base}routes/11.jpg` },
]

const SLOT_COUNT = 3

const email = 'quispehanccof@gmail.com'
const whatsappUrl = 'https://wa.me/qr/3IRVF44LTZXCK1'

function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame
    let stars = []
    let width = 0
    let height = 0

    const createStars = () => {
      const count = Math.min(240, Math.floor((width * height) / 6500))
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.3 + 0.25,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.16 + 0.025,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createStars()
    }

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        const pulse = 0.62 + Math.sin(time * 0.001 + star.phase) * 0.3
        context.beginPath()
        context.fillStyle = `rgba(213, 224, 255, ${star.alpha * pulse})`
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        context.fill()
        if (!reduceMotion) {
          star.y += star.speed
          if (star.y > height + 3) {
            star.y = -3
            star.x = Math.random() * width
          }
        }
      })
      if (!reduceMotion) frame = window.requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas className="starfield" ref={canvasRef} aria-hidden="true" />
}

function HomeScene({ onExplore }) {
  return (
    <section className="scene scene-home" aria-labelledby="home-title">
      <div className="home-copy">
        <p className="scene-overline">Portafolio digital · 2026</p>
        <h1 id="home-title">NANDITO</h1>
        <div className="home-rule"></div>
        <p className="home-tagline">Diseñador, analista QA y project manager.</p>
        <button className="text-action" type="button" onClick={onExplore}>
          Iniciar recorrido <span aria-hidden="true">↓</span>
        </button>
      </div>
      <div className="home-coordinates" aria-hidden="true">13°31′S · 71°58′W</div>
      <div className="surface-scene" aria-hidden="true">
        <span className="surface-mountain mountain-a"></span>
        <span className="surface-mountain mountain-b"></span>
        <div className="rider"><i></i><b></b><span></span></div>
        <div className="flag"><i></i><span>N</span></div>
      </div>
    </section>
  )
}

function ProfileScene() {
  return (
    <section className="scene scene-profile" aria-labelledby="profile-title">
      <div className="scene-copy profile-copy">
        <p className="scene-overline">Misión 01 · Sobre mí</p>
        <h2 id="profile-title">Ideas útiles.<br />Productos confiables.</h2>
        <p className="scene-lead">
          Soy estudiante de Ingeniería Informática y de Sistemas en la UNSAAC. Combino tecnología, diseño y gestión para acompañar productos desde la idea hasta su lanzamiento.
        </p>
        <div className="skill-list">
          <span>Diseño UI/UX</span>
          <span>Análisis QA</span>
          <span>Project management</span>
        </div>
      </div>
      <aside className="mission-card">
        <span className="card-orbit" aria-hidden="true"><i></i></span>
        <small>BASE</small>
        <strong>Cusco, Perú</strong>
        <p>UNSAAC · Ingeniería Informática y de Sistemas</p>
        <div className="signal"><i></i><i></i><i></i><i></i></div>
      </aside>
    </section>
  )
}

function ProjectsScene() {
  return (
    <section className="scene scene-projects" aria-labelledby="projects-title">
      <div className="projects-heading">
        <p className="scene-overline">Misión 02 · Trabajo</p>
        <h2 id="projects-title">Experiencia multiplataforma.</h2>
        <p>Diseño, calidad y dirección durante todo el ciclo del producto.</p>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <article className="project-card" key={project.code}>
            <div className="project-index">0{index + 1}</div>
            <span className="project-code">{project.code}</span>
            <h3>{project.title}</h3>
            <p>{project.meta}</p>
            <span className="project-arrow" aria-hidden="true">↗</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function RoutesScene() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => setTick((value) => value + 1), 3000)
    return () => window.clearInterval(timer)
  }, [])

  const slots = Array.from({ length: SLOT_COUNT }, (_, slot) => {
    const index = (tick + slot) % photos.length
    return { photo: photos[index], index }
  })
  const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <section className="scene scene-routes" aria-labelledby="routes-title">
      <div className="routes-heading">
        <p className="scene-overline">Bitácora 03 · En ruta</p>
        <h2 id="routes-title">Viajar también inspira.</h2>
        <p>Recorro nuevos caminos en moto y guardo cada historia en una fotografía.</p>
      </div>
      <div className="route-gallery">
        {slots.map(({ photo, index }, slot) => (
          <figure className={`route-photo route-photo-${slot + 1}`} key={photo.src}>
            <img src={photo.src} alt="" loading="eager" decoding="async" />
            <figcaption><span>{String(index + 1).padStart(2, '0')}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="photo-note">{reduceMotion ? 'Bitácora visual · 11 viajes en moto' : 'Bitácora visual · 11 viajes en moto, rotando cada 3 segundos'}</p>
    </section>
  )
}

function WhatsAppQr() {
  const [qrCode, setQrCode] = useState('')

  useEffect(() => {
    let active = true
    QRCode.toDataURL(whatsappUrl, {
      width: 320,
      margin: 1,
      color: {
        dark: '#101218',
        light: '#f2f2f2',
      },
    }).then((dataUrl) => {
      if (active) setQrCode(dataUrl)
    })

    return () => {
      active = false
    }
  }, [])

  return (
    <a className="whatsapp-card" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Abrir contacto de WhatsApp">
      <div className="qr-frame">
        {qrCode ? <img src={qrCode} alt="Código QR para contactar a NANDITO por WhatsApp" /> : <span></span>}
        <i aria-hidden="true"></i>
      </div>
      <div className="qr-copy">
        <small>Canal directo</small>
        <strong>WhatsApp</strong>
        <p>Escanea el código<br />para conversar.</p>
      </div>
      <span className="qr-arrow" aria-hidden="true">↗</span>
    </a>
  )
}

function ContactScene() {
  return (
    <section className="scene scene-contact" aria-labelledby="contact-title">
      <div className="contact-layout">
        <div className="contact-copy">
          <p className="scene-overline">Transmisión 04 · Contacto</p>
          <h2 id="contact-title">¿Tienes un proyecto<br />en mente?</h2>
          <p>Estoy disponible para colaborar en diseño, QA y gestión de productos digitales.</p>
          <a className="email-address" href={`mailto:${email}`}>{email}</a>
          <a className="contact-button" href={`mailto:${email}`}>
            Enviar correo <span aria-hidden="true">↗</span>
          </a>
        </div>
        <WhatsAppQr />
      </div>
      <div className="contact-radar" aria-hidden="true">
        <span></span><span></span><span></span><i></i>
      </div>
    </section>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [introVisible, setIntroVisible] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroVisible(false), 650)
    return () => window.clearTimeout(timer)
  }, [])

  const navigateTo = useCallback((target) => {
    const next = (target + sections.length) % sections.length
    setMenuOpen(false)
    setActiveSection(next)
  }, [])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (menuOpen || introVisible) return
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') navigateTo(activeSection + 1)
      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') navigateTo(activeSection - 1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeSection, introVisible, menuOpen, navigateTo])

  const current = sections[activeSection]

  return (
    <div className="space-app">
      <Starfield />
      <div className="nebula" aria-hidden="true"></div>

      <header className="identity">
        <button className="identity-link" type="button" onClick={() => navigateTo(0)} aria-label="Ir al inicio">
          <span className="identity-mark"><i></i><b>N</b></span>
          <span className="identity-text">
            <strong>NANDITO</strong>
            <small>Ingeniería · diseño · calidad</small>
          </span>
        </button>
      </header>

      <button
        className={`menu-toggle ${menuOpen ? 'menu-toggle-open' : ''}`}
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-controls="main-menu"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        <span></span><span></span>
      </button>

      <div className={`navigation ${menuOpen ? 'navigation-open' : ''}`} id="main-menu">
        <div className="navigation-curtain"></div>
        <nav aria-label="Navegación principal">
          {sections.map((section, index) => (
            <button
              className={index === activeSection ? 'active' : ''}
              style={{ '--delay': `${index * 90}ms` }}
              type="button"
              onClick={() => navigateTo(index)}
              key={section.id}
            >
              <span>{section.number}</span>{section.label}
            </button>
          ))}
          <div className="navigation-meta">Cusco · Perú · 2026</div>
        </nav>
      </div>

      <div className={`world world-${current.id}`} aria-hidden="true">
        <div className="planet-atmosphere"></div>
        <div className="planet"><span></span></div>
        <div className="orbit orbit-one"></div>
        <div className="orbit orbit-two"></div>
      </div>

      <main className="scene-stage" key={current.id}>
        {activeSection === 0 && <HomeScene onExplore={() => navigateTo(1)} />}
        {activeSection === 1 && <ProfileScene />}
        {activeSection === 2 && <ProjectsScene />}
        {activeSection === 3 && <RoutesScene />}
        {activeSection === 4 && <ContactScene />}
      </main>

      <div className="section-status" aria-label={`Sección ${activeSection + 1} de ${sections.length}`}>
        <span>{current.number}</span>
        <div><i style={{ width: `${((activeSection + 1) / sections.length) * 100}%` }}></i></div>
        <span>05</span>
      </div>

      <div className="section-controls">
        <button type="button" onClick={() => navigateTo(activeSection - 1)} aria-label="Sección anterior">←</button>
        <span>{current.label}</span>
        <button type="button" onClick={() => navigateTo(activeSection + 1)} aria-label="Siguiente sección">→</button>
      </div>

      <div className={`intro-screen ${introVisible ? '' : 'intro-finished'}`} aria-hidden="true">
        <div className="intro-content">
          <span>N</span>
          <strong>NANDITO</strong>
          <div><i></i></div>
        </div>
      </div>
    </div>
  )
}

export default App
