import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import { DIFERENCIAIS, WHATSAPP } from '../data'
import { Reveal, Titulo, suave } from './Reveal'

function Cartao({ item, i }) {
  return (
    <motion.article
      className="diferencial"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, delay: i * 0.12, ease: suave }}
      whileHover="sobre"
    >
      <div className="diferencial-foto">
        <motion.img
          src={item.src}
          alt=""
          style={{ objectPosition: item.pos }}
          loading="lazy"
          variants={{ sobre: { scale: 1.07 } }}
          transition={{ duration: 0.8, ease: suave }}
        />
      </div>
      <div className="diferencial-texto">
        <span>{String(i + 1).padStart(2, '0')}</span>
        <h3>{item.titulo}</h3>
        <p>{item.texto}</p>
      </div>
    </motion.article>
  )
}

function FaixaVideo() {
  const caixa = useRef(null)
  const video = useRef(null)
  const { scrollYProgress } = useScroll({ target: caixa, offset: ['start end', 'center center'] })
  const recorte = useTransform(
    scrollYProgress,
    [0, 1],
    ['inset(12% 10% 12% 10% round 36px)', 'inset(0% 0% 0% 0% round 0px)'],
  )
  const escala = useTransform(scrollYProgress, [0, 1], [1.18, 1])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      v.pause()
      return
    }
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [])

  return (
    <div className="faixa-video" ref={caixa}>
      <motion.div className="faixa-video-quadro" style={{ clipPath: recorte }}>
        <motion.video
          ref={video}
          src="/videos/espeto.mp4"
          poster="/fotos/picanha-espeto.jpg"
          muted
          loop
          playsInline
          preload="metadata"
          style={{ scale: escala }}
        />
        <div className="faixa-video-sombra" />
        <div className="faixa-video-texto">
          <Titulo linhas={['Do espeto', <>para a sua <em>mesa.</em></>]} />
          <Reveal delay={0.2}>
            <motion.a
              className="botao botao-ouro botao-grande"
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              Reservar uma mesa <ArrowUpRight size={17} />
            </motion.a>
          </Reveal>
        </div>
      </motion.div>
    </div>
  )
}

export default function Rodizio() {
  return (
    <>
      <section className="bloco rodizio" id="rodizio">
        <div className="bloco-cabeca">
          <Reveal>
            <p className="eyebrow">O rodízio</p>
          </Reveal>
          <Titulo linhas={['Muito além', <>do <em>churrasco.</em></>]} />
          <Reveal delay={0.15}>
            <p className="lead">
              Aqui a mesa é completa: carnes selecionadas, buffet, sushi incluso no rodízio e
              uma carta de drinks para acompanhar.
            </p>
          </Reveal>
        </div>

        <div className="diferenciais">
          {DIFERENCIAIS.map((item, i) => (
            <Cartao key={item.titulo} item={item} i={i} />
          ))}
        </div>
      </section>

      <FaixaVideo />
    </>
  )
}
