import { MotionConfig, motion } from 'motion/react'
import { useLenis } from './hooks/useLenis'
import { WHATSAPP } from './data'
import Intro, { ATRASO } from './components/Intro'
import Header from './components/Header'
import Hero from './components/Hero'
import Faixa from './components/Faixa'
import Casa from './components/Casa'
import Cortes from './components/Cortes'
import Rodizio from './components/Rodizio'
import Visita from './components/Visita'
import Rodape from './components/Rodape'
import { IconeWhatsApp } from './components/Icones'

export default function App() {
  useLenis()

  return (
    <MotionConfig reducedMotion="user">
      <Intro />
      <Header />
      <main>
        <Hero />
        <Faixa />
        <Casa />
        <Cortes />
        <Rodizio />
        <Visita />
      </main>
      <Rodape />
      <motion.a
        className="whats-fixo"
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        aria-label="Chamar no WhatsApp"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: ATRASO + 1.6, type: 'spring', bounce: 0.4 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <IconeWhatsApp size={26} />
      </motion.a>
    </MotionConfig>
  )
}
