import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { INSTAGRAM, NAV, WHATSAPP } from '../data'
import { ATRASO } from './Intro'
import { IconeInstagram } from './Icones'

export default function Header() {
  const [aberto, setAberto] = useState(false)
  const [rolou, setRolou] = useState(false)

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 40)
    aoRolar()
    window.addEventListener('scroll', aoRolar, { passive: true })
    return () => window.removeEventListener('scroll', aoRolar)
  }, [])

  return (
    <motion.header
      className={`topo${rolou ? ' topo-rolou' : ''}`}
      initial={{ opacity: 0, y: -18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: ATRASO + 0.1 }}
    >
      <a className="topo-marca" href="#inicio" aria-label="Estrela Grill, início">
        <img src="/logo.png" alt="Estrela Grill Churrascaria" width="170" height="80" />
      </a>

      <nav className="topo-nav" aria-label="Principal">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.nome}
          </a>
        ))}
      </nav>

      <div className="topo-acoes">
        <a className="topo-insta" href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
          <IconeInstagram />
        </a>
        <motion.a
          className="botao botao-ouro"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Reservar
        </motion.a>
        <button
          type="button"
          className="menu-botao"
          aria-expanded={aberto}
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          onClick={() => setAberto((valor) => !valor)}
        >
          {aberto ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {aberto && (
          <motion.div
            className="menu-folha"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
          >
            {NAV.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setAberto(false)}>
                {item.nome}
              </a>
            ))}
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">
              Instagram
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
