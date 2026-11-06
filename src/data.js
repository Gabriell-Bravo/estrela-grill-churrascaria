export const INSTAGRAM = 'https://www.instagram.com/estrelagrillchurrascaria_'
export const LINKTREE = 'https://linktr.ee/grupoestrelasaquarema'
export const WHATSAPP_TEXTO = 'Olá! Quero reservar uma mesa na Estrela Grill.'
export const WHATSAPP = `https://wa.me/5522996088528?text=${encodeURIComponent(WHATSAPP_TEXTO)}`
export const TELEFONE = '(22) 99608-8528'
export const ENDERECO = 'Rua José Souza, 42 · Bacaxá · Saquarema – RJ'
export const MAPS =
  'https://www.google.com/maps/search/?api=1&query=Estrela+Grill+Churrascaria+Rua+Jos%C3%A9+Souza+42+Bacax%C3%A1+Saquarema'
export const MAPA_EMBED =
  'https://maps.google.com/maps?q=Rua%20Jos%C3%A9%20Souza%2042%20Bacax%C3%A1%20Saquarema&z=16&output=embed'

export const HORARIOS = [
  { dia: 'Segunda a sexta', hora: '11h30–16h · 18h30–22h' },
  { dia: 'Sábado', hora: '11h30–16h · 18h30–22h30' },
  { dia: 'Domingo', hora: '11h30–16h30' },
]

export const NAV = [
  { href: '#inicio', nome: 'Início' },
  { href: '#casa', nome: 'A casa' },
  { href: '#cortes', nome: 'Cortes' },
  { href: '#rodizio', nome: 'Rodízio' },
  { href: '#visita', nome: 'Visita' },
]

export const MARQUEE = [
  'Picanha',
  'Paleta de cordeiro',
  'Alcatra com queijo',
  'Sushi no rodízio',
  'Buffet completo',
  'Carta de drinks',
  'Sobremesas',
  'Espaço Kids',
]

export const NUMEROS = [
  { valor: 2, sufixo: ' anos', texto: 'de casa aberta em Saquarema' },
  { valor: 16.5, sufixo: ' mil', texto: 'seguidores no Instagram', decimais: 1 },
  { valor: 7, sufixo: ' dias', texto: 'por semana, de almoço e jantar' },
]

export const FLUTUANTES = [
  { src: '/fotos/sushi-rodizio.jpg', rotulo: 'Sushi incluso', pos: 'center 55%' },
  { src: '/fotos/moscow-mule.jpg', rotulo: 'Carta de drinks', pos: 'center 55%' },
  { src: '/fotos/picanha-prato.jpg', rotulo: 'Picanha no prato', pos: 'center' },
]

export const CORTES = [
  {
    nome: 'Picanha',
    texto: 'No ponto, suculenta, fatiada na mesa.',
    src: '/fotos/picanha-faca.jpg',
    pos: 'center 40%',
  },
  {
    nome: 'Paleta de cordeiro',
    texto: 'Assada devagar, macia e de sabor marcante.',
    src: '/fotos/paleta.jpg',
    pos: 'center 45%',
  },
  {
    nome: 'Alcatra com queijo',
    texto: 'Um dos cortes mais pedidos da casa.',
    src: '/fotos/alcatra-queijo.jpg',
    pos: 'center 40%',
  },
  {
    nome: 'No espeto',
    texto: 'O espeto passa de mesa em mesa.',
    src: '/fotos/picanha-espeto.jpg',
    pos: 'center 30%',
  },
  {
    nome: 'Corte da casa',
    texto: 'Macio, saboroso e no ponto certo.',
    src: '/fotos/no-ponto.jpg',
    pos: 'center 40%',
  },
  {
    nome: 'Cordeiro na tábua',
    texto: 'Servido com ervas, direto da brasa.',
    src: '/fotos/tabua-carne.jpg',
    pos: 'center 55%',
  },
]

export const DIFERENCIAIS = [
  {
    titulo: 'Carnes nobres',
    texto: 'Cortes escolhidos e preparados na hora, servidos no espeto direto na sua mesa.',
    src: '/fotos/espeto-facas.jpg',
    pos: 'center 30%',
  },
  {
    titulo: 'Sushi e buffet',
    texto: 'Além das carnes, o rodízio inclui sushis, saladas, acompanhamentos e pratos quentes.',
    src: '/fotos/sushi-rodizio.jpg',
    pos: 'center 50%',
  },
  {
    titulo: 'Drinks e sobremesas',
    texto: 'Carta de drinks autorais para brindar e sobremesas para fechar a refeição.',
    src: '/fotos/drinks.jpg',
    pos: 'center 55%',
  },
]

export const COLAGEM = [
  { src: '/fotos/equipe.jpg', alt: 'Equipe da Estrela Grill com os espetos', pos: 'center 30%' },
  { src: '/fotos/mesa-espeto.jpg', alt: 'Cliente sendo servida no espeto', pos: 'center 40%' },
  { src: '/fotos/espeto-salao.jpg', alt: 'Espeto de carne no salão da churrascaria', pos: 'center 30%' },
]
