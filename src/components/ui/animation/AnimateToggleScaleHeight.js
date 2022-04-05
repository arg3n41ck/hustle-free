import React from "react"
import { motion } from "framer-motion"

const AnimateToggleScaleHeight = ({ value, children }) => {
  return (
    <motion.div
      animate={{
        scale: value ? 1 : 0,
        height: value ? 64 : 0,
      }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}

export default AnimateToggleScaleHeight
