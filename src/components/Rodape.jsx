import { INSTAGRAM, LINKTREE, MAPS, NAV, WHATSAPP } from '../data'
import { IconeInstagram, IconeWhatsApp } from './Icones'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="rodape-marca">
        <img src="/logo.png" alt="Estrela Grill Churrascaria" width="240" height="113" loading="lazy" />
        <p>A casa da família de Saquarema. Faça a sua reserva.</p>
      </div>

      <nav className="rodape-links" aria-label="Rodapé">
        {NAV.map((item) => (
          <a key={item.href} href={item.href}>
            {item.nome}
          </a>
        ))}
        <a href={LINKTREE} target="_blank" rel="noreferrer">
          Grupo Estrela
        </a>
      </nav>

      <div className="rodape-redes">
        <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="Instagram">
          <IconeInstagram size={20} />
        </a>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
          <IconeWhatsApp size={20} />
        </a>
        <a href={MAPS} target="_blank" rel="noreferrer" aria-label="Localização no Google Maps">
          Localização
        </a>
      </div>

      <p className="rodape-copy">© {new Date().getFullYear()} Estrela Grill Churrascaria · Bacaxá, Saquarema – RJ</p>
    </footer>
  )
}
