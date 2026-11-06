import { motion } from 'motion/react'
import { ArrowUpRight, Clock, MapPin } from 'lucide-react'
import { ENDERECO, HORARIOS, INSTAGRAM, MAPA_EMBED, MAPS, TELEFONE, WHATSAPP } from '../data'
import { Reveal, Titulo } from './Reveal'
import { IconeInstagram, IconeWhatsApp } from './Icones'

function indiceDeHoje() {
  const dia = new Date().getDay()
  if (dia === 0) return 2
  if (dia === 6) return 1
  return 0
}

export default function Visita() {
  const hoje = indiceDeHoje()

  return (
    <section className="bloco visita" id="visita">
      <div className="visita-texto">
        <Reveal>
          <p className="eyebrow">Venha</p>
        </Reveal>
        <Titulo linhas={['Bacaxá,', <><em>Saquarema.</em></>]} />
        <Reveal delay={0.1}>
          <p className="endereco">
            <MapPin size={16} /> {ENDERECO}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <ul className="horarios" aria-label="Horários de funcionamento">
            {HORARIOS.map((h, i) => (
              <li key={h.dia} className={i === hoje ? 'hoje' : ''}>
                <span>
                  <Clock size={14} /> {h.dia}
                  {i === hoje && <b>Hoje</b>}
                </span>
                <strong>{h.hora}</strong>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.2} className="visita-acoes">
          <motion.a className="botao botao-ouro" href={MAPS} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            Abrir no mapa <ArrowUpRight size={16} />
          </motion.a>
          <motion.a className="botao botao-verde" href={WHATSAPP} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <IconeWhatsApp size={16} /> {TELEFONE}
          </motion.a>
          <motion.a className="botao botao-linha" href={INSTAGRAM} target="_blank" rel="noreferrer" whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <IconeInstagram size={16} /> Instagram
          </motion.a>
        </Reveal>
      </div>

      <Reveal className="mapa" y={50}>
        <iframe
          title="Mapa da Estrela Grill Churrascaria no Bacaxá, Saquarema"
          src={MAPA_EMBED}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </Reveal>
    </section>
  )
}
