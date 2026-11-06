import { useCallback, useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue } from 'motion/react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CORTES } from '../data'
import { Reveal, Titulo } from './Reveal'

const PASSO_MS = 3400

export default function Cortes() {
  const janela = useRef(null)
  const trilho = useRef(null)
  const x = useMotionValue(0)
  const [indice, setIndice] = useState(0)
  const [maximo, setMaximo] = useState(CORTES.length - 1)
  const [pausado, setPausado] = useState(false)

  const medir = useCallback(() => {
    const primeiro = trilho.current?.firstElementChild
    if (!primeiro || !janela.current) return { passo: 0, max: 0 }
    const intervalo = parseFloat(getComputedStyle(trilho.current).columnGap) || 0
    const passo = primeiro.offsetWidth + intervalo
    const sobra = trilho.current.scrollWidth - janela.current.clientWidth
    return { passo, max: Math.max(0, Math.ceil(sobra / passo)) }
  }, [])

  useEffect(() => {
    const atualizar = () => setMaximo(medir().max)
    atualizar()
    window.addEventListener('resize', atualizar)
    return () => window.removeEventListener('resize', atualizar)
  }, [medir])

  const alvoDe = useCallback(
    (i) => {
      const { passo } = medir()
      const sobra = trilho.current.scrollWidth - janela.current.clientWidth
      return -Math.min(i * passo, Math.max(0, sobra))
    },
    [medir],
  )

  useEffect(() => {
    const controle = animate(x, alvoDe(indice), { type: 'spring', stiffness: 120, damping: 24 })
    return () => controle.stop()
  }, [indice, maximo, alvoDe, x])

  useEffect(() => {
    if (pausado) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => setIndice((i) => (i >= maximo ? 0 : i + 1)), PASSO_MS)
    return () => window.clearTimeout(id)
  }, [indice, maximo, pausado])

  function ir(proximo) {
    setIndice(Math.min(maximo, Math.max(0, proximo)))
  }

  function aoSoltar() {
    const { passo } = medir()
    if (!passo) return
    const novo = Math.min(maximo, Math.max(0, Math.round(-x.get() / passo)))
    if (novo === indice) animate(x, alvoDe(novo), { type: 'spring', stiffness: 120, damping: 24 })
    setIndice(novo)
  }

  return (
    <section className="bloco cortes" id="cortes">
      <div className="cortes-cabeca">
        <div>
          <Reveal>
            <p className="eyebrow">Na brasa</p>
          </Reveal>
          <Titulo linhas={['Cortes que', <>falam por <em>si.</em></>]} />
        </div>
        <div className="cortes-controles">
          <button type="button" onClick={() => ir(indice - 1)} aria-label="Corte anterior" disabled={indice === 0}>
            <ArrowLeft size={18} />
          </button>
          <button type="button" onClick={() => ir(indice >= maximo ? 0 : indice + 1)} aria-label="Próximo corte">
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <div
        className="cortes-janela"
        ref={janela}
        onMouseEnter={() => setPausado(true)}
        onMouseLeave={() => setPausado(false)}
        onFocus={() => setPausado(true)}
        onBlur={() => setPausado(false)}
      >
        <motion.div
          className="cortes-trilho"
          ref={trilho}
          style={{ x }}
          drag="x"
          dragMomentum={false}
          onDragStart={() => setPausado(true)}
          onDragEnd={() => {
            aoSoltar()
            setPausado(false)
          }}
        >
          {CORTES.map((corte, i) => (
            <figure className="corte" key={corte.nome} tabIndex={0}>
              <div className="corte-foto">
                <img
                  src={corte.src}
                  alt={`${corte.nome}: ${corte.texto}`}
                  style={{ objectPosition: corte.pos }}
                  loading="lazy"
                  draggable="false"
                />
              </div>
              <figcaption>
                <span>{String(i + 1).padStart(2, '0')}</span>
                <strong>{corte.nome}</strong>
                <em>{corte.texto}</em>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>

      <Reveal className="cortes-progresso" delay={0.1}>
        {Array.from({ length: maximo + 1 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={i === indice ? 'ativo' : ''}
            aria-label={`Ir para a posição ${i + 1}`}
            aria-current={i === indice ? 'true' : undefined}
            onClick={() => ir(i)}
          >
            {i === indice && !pausado && <span key={indice} style={{ animationDuration: `${PASSO_MS}ms` }} />}
          </button>
        ))}
      </Reveal>
    </section>
  )
}
