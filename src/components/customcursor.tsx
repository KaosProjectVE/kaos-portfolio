// src/components/CustomCursor.tsx
'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

// Cast rápido para evitar errores de className en Motion
const MotionDiv: any = motion.div

export default function CustomCursor() {
  // Posición del cursor
  const [position, setPosition] = useState({ x: 0, y: 0 })
  // Estado para hover sobre links
  const [hoverLink, setHoverLink] = useState(false)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      // Detecta si está sobre un <a>
      setHoverLink(Boolean((e.target as HTMLElement).closest('a')))
    }
    window.addEventListener('mousemove', moveCursor)
    return () => window.removeEventListener('mousemove', moveCursor)
  }, [])

  return (
    <MotionDiv
      className="pointer-events-none fixed top-0 left-0 z-50"
      // Animación: cambia tamaño y color al hoverLink
      animate={{
        x: position.x - (hoverLink ? 16 : 8),
        y: position.y - (hoverLink ? 16 : 8),
        scale: hoverLink ? 8 : 3,
        backgroundColor: hoverLink ? '#FFBF00' : '#D8C9B3',
        opacity: 1,
      }}
      initial={false}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ width: 8, height: 8, borderRadius: '50%' }}
    />
  )
}
