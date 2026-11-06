import { useRef } from 'react'
import { animate, motion, useInView, useScroll, useTransform } from 'motion/react'
import { useEffect } from 'react'
import { COLAGEM, NUMEROS } from '../data'
import { Reveal, Titulo } from './Reveal'

function Contador({ valor, sufixo, decimais = 0 }) {
  const ref = useRef(null)
  const visivel = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })

  useEffect(() => {
    if (!visivel || !ref.current) return
    const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const formatar = (n) => n.toFixed(decimais).replace('.', ',')
    if (reduzido) {
      ref.current.textContent = formatar(valor)
      return
    }
    const controle = animate(0, valor, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => {
        if (ref.current) ref.current.textContent = formatar(n)
      },
    })
    return () => controle.stop()
  }, [visivel, valor, decimais])

  return (
    <strong className="numero">
      <span ref={ref}>{valor.toFixed(decimais).replace('.', ',')}</span>
      {sufixo}
    </strong>
  )
}

export default function Casa() {
  const secao = useRef(null)
  const { scrollYProgress } = useScroll({ target: secao, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-30, 90])
  const y3 = useTransform(scrollYProgress, [0, 1], [90, -40])
  const ys = [y1, y2, y3]

  return (
    <section className="bloco casa" id="casa" ref={secao}>
      <div className="casa-texto">
        <Reveal>
          <p className="eyebrow">A casa</p>
        </Reveal>
        <Titulo linhas={['Família, fogo', <>e <em>rodízio.</em></>]} />
        <Reveal delay={0.15}>
          <p className="lead">
            A Estrela Grill é a churrascaria da família de Saquarema, no Bacaxá. O espeto
            passa na sua mesa, a carne sai no ponto e a casa fica aberta para almoço e jantar,
            com buffet completo, sushi e carta de drinks.
          </p>
        </Reveal>

        <dl className="numeros">
          {NUMEROS.map((item, i) => (
            <Reveal key={item.texto} delay={0.1 + i * 0.1} className="numeros-item">
              <dt>
                <Contador valor={item.valor} sufixo={item.sufixo} decimais={item.decimais} />
              </dt>
              <dd>{item.texto}</dd>
            </Reveal>
          ))}
        </dl>
      </div>

      <div className="colagem">
        {COLAGEM.map((foto, i) => (
          <motion.figure key={foto.src} className={`colagem-foto colagem-${i + 1}`} style={{ y: ys[i] }}>
            <motion.img
              src={foto.src}
              alt={foto.alt}
              style={{ objectPosition: foto.pos }}
              loading="lazy"
              initial={{ scale: 1.25 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.figure>
        ))}
      </div>
    </section>
  )
}
