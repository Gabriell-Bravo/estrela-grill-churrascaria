import { motion } from 'motion/react'

export const suave = [0.22, 1, 0.36, 1]

export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -70px 0px' }}
      transition={{ duration: 0.9, delay, ease: suave }}
    >
      {children}
    </Tag>
  )
}

export function Titulo({ linhas, como = 'h2', className, delay = 0 }) {
  const Tag = como
  return (
    <Tag className={className}>
      {linhas.map((linha, i) => (
        <motion.span
          className="mascara"
          key={i}
          initial="escondido"
          whileInView="visivel"
          viewport={{ once: true, margin: '0px 0px -40px 0px' }}
        >
          <motion.span
            className="mascara-dentro"
            variants={{ escondido: { y: '112%' }, visivel: { y: 0 } }}
            transition={{ duration: 1.05, delay: delay + i * 0.12, ease: suave }}
          >
            {linha}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  )
}
