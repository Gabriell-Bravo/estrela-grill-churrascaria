import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { suave } from './Reveal'

export const INTRO_S = 1.9

const reduzido = window.matchMedia('(prefers-reduced-motion: reduce)').matches
/** Quanto a abertura espera para animar, para a intro não esconder a entrada. */
export const ATRASO = reduzido ? 0 : INTRO_S - 0.5

export default function Intro() {
  const [aberta, setAberta] = useState(
    () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    if (!aberta) return
    const id = window.setTimeout(() => setAberta(false), INTRO_S * 1000)
    return () => window.clearTimeout(id)
  }, [aberta])

  return (
    <AnimatePresence>
      {aberta && (
        <motion.div
          className="intro"
          initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ clipPath: 'inset(0% 0% 100% 0%)' }}
          transition={{ duration: 0.9, ease: suave }}
        >
          <motion.img
            className="intro-logo"
            src="/logo.png"
            alt="Estrela Grill Churrascaria"
            initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: suave }}
          />
          <motion.span
            className="intro-linha"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, delay: 0.4, ease: suave }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
