import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Pause, Play, Star } from 'lucide-react'
import { FLUTUANTES, MAPS, WHATSAPP } from '../data'
import { ATRASO } from './Intro'
import { Titulo, suave } from './Reveal'

function Brasas() {
  const brasas = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        esquerda: (i * 37) % 100,
        tamanho: 2 + ((i * 7) % 4),
        duracao: 5 + ((i * 13) % 7),
        atraso: -((i * 11) % 9),
        deriva: ((i * 17) % 60) - 30,
      })),
    [],
  )

  return (
    <div className="brasas" aria-hidden="true">
      {brasas.map((b, i) => (
        <span
          key={i}
          style={{
            left: `${b.esquerda}%`,
            width: b.tamanho,
            height: b.tamanho,
            animationDuration: `${b.duracao}s`,
            animationDelay: `${b.atraso}s`,
            '--deriva': `${b.deriva}px`,
          }}
        />
      ))}
    </div>
  )
}

function Cartao({ foto, indice, mx, my }) {
  const profundidade = indice === 0 ? 26 : -18
  const x = useTransform(mx, (v) => v * profundidade)
  const y = useTransform(my, (v) => v * profundidade)

  return (
    <motion.div className={`flutuante flutuante-${indice + 1}`} style={{ x, y }}>
      <motion.figure
        initial={{ opacity: 0, scale: 0.8, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: ATRASO + 0.9 + indice * 0.2 },
          scale: { duration: 0.8, delay: ATRASO + 0.9 + indice * 0.2, ease: suave },
          y: { duration: 5 + indice, delay: ATRASO + 1.4, repeat: Infinity, ease: 'easeInOut' },
        }}
      >
        <img src={foto.src} alt="" style={{ objectPosition: foto.pos }} loading="eager" />
        <figcaption>{foto.rotulo}</figcaption>
      </motion.figure>
    </motion.div>
  )
}

export default function Hero() {
  const video = useRef(null)
  const palco = useRef(null)
  const [tocando, setTocando] = useState(true)

  const mx = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 })
  const my = useSpring(useMotionValue(0), { stiffness: 80, damping: 18 })

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      setTocando(false)
      return
    }
    v.play().catch(() => setTocando(false))
  }, [])

  function aoMover(evento) {
    const caixa = palco.current?.getBoundingClientRect()
    if (!caixa) return
    mx.set((evento.clientX - caixa.left) / caixa.width - 0.5)
    my.set((evento.clientY - caixa.top) / caixa.height - 0.5)
  }

  function alternar() {
    const v = video.current
    if (!v) return
    if (v.paused) {
      v.play()
      setTocando(true)
    } else {
      v.pause()
      setTocando(false)
    }
  }

  const entrada = (atraso) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: ATRASO + atraso, ease: suave },
  })

  return (
    <section className="hero" id="inicio">
      <div className="hero-texto">
        <motion.p className="selo-pilula" {...entrada(0.1)}>
          <Star size={12} fill="currentColor" /> Rodízio de carnes nobres
        </motion.p>

        <Titulo
          como="h1"
          className="hero-titulo"
          delay={ATRASO + 0.2}
          linhas={['Sinta o sabor', <>da <em>brasa.</em></>]}
        />

        <motion.p className="hero-lead" {...entrada(0.7)}>
          A casa da família de Saquarema. Carnes nobres no espeto, sushi, buffet e drinks,
          tudo no mesmo rodízio, no coração do Bacaxá.
        </motion.p>

        <motion.div className="hero-acoes" {...entrada(0.85)}>
          <motion.a
            className="botao botao-ouro botao-grande"
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Reservar pelo WhatsApp <ArrowUpRight size={17} />
          </motion.a>
          <motion.a
            className="botao botao-linha botao-grande"
            href={MAPS}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            Como chegar
          </motion.a>
        </motion.div>

        <motion.ul className="hero-pontos" {...entrada(1.05)}>
          <li>Sushi incluso</li>
          <li>Espaço Kids</li>
          <li>Música ao vivo</li>
        </motion.ul>
      </div>

      <div className="hero-palco" ref={palco} onMouseMove={aoMover}>
        <motion.div
          className="hero-video"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: ATRASO, ease: suave }}
        >
          <video
            ref={video}
            src="/videos/picanha.mp4"
            poster="/fotos/picanha-espeto.jpg"
            muted
            loop
            playsInline
            preload="auto"
          />
        </motion.div>

        <Brasas />

        <motion.div
          className="selo-giratorio"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: ATRASO + 0.6, ease: suave }}
          aria-hidden="true"
        >
          <motion.svg
            className="selo-anel"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <path id="anel" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" />
            </defs>
            <text>
              <textPath href="#anel" startOffset="0">
                Estrela Grill ✦ Churrascaria ✦ Saquarema ✦ Rodízio ✦
              </textPath>
            </text>
          </motion.svg>
          <Star className="selo-estrela" size={26} fill="currentColor" />
        </motion.div>

        {FLUTUANTES.slice(0, 2).map((foto, i) => (
          <Cartao key={foto.src} foto={foto} indice={i} mx={mx} my={my} />
        ))}

        <button
          type="button"
          className="hero-pausa"
          onClick={alternar}
          aria-label={tocando ? 'Pausar vídeo' : 'Tocar vídeo'}
        >
          {tocando ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>

      <motion.a
        className="hero-rolar"
        href="#casa"
        aria-label="Rolar para a próxima seção"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: ATRASO + 1.4, duration: 1 }}
      >
        <ArrowDown size={15} /> Role
      </motion.a>
    </section>
  )
}
