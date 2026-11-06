import { Star } from 'lucide-react'
import { MARQUEE } from '../data'

export default function Faixa() {
  const itens = [...MARQUEE, ...MARQUEE]

  return (
    <div className="faixa" aria-hidden="true">
      <div className="faixa-trilho">
        {itens.map((nome, i) => (
          <span key={i}>
            {nome} <Star size={14} fill="currentColor" />
          </span>
        ))}
      </div>
    </div>
  )
}
