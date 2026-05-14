import { memo } from 'react'
import { motion, useScroll } from 'framer-motion'

function ReadingProgressBarComponent() {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 bg-burgundy origin-left z-50 shadow-sm"
    />
  )
}

export default memo(ReadingProgressBarComponent)