// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Loading from './loading'
import Hero from '@/components/hero'
import Services from '@/components/services'
import PortfolioGrid from '@/components/portoliogrid'
import AboutPage from './about/page'
import { AnimatePresence, motion } from 'framer-motion'
import Timeline from '@/components/timeline'
import ContactCTA from '@/components/contact'
// Motion container para animaciones de entrada/salida
const MotionContainer: any = motion.div

export default function Page() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simula un tiempo de carga de 1.5 segundos
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    // AnimatePresence permite animar la salida de Loading
    <>
      {/* Loader sobre el contenido */}
      <AnimatePresence>
        {loading && <Loading key="loading" />}
      </AnimatePresence>

      {/* Contenido siempre montado, con fade-in tras loading */}
      <MotionContainer
        key="content"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-0"
      >
        <Hero />
        <Services />
        <PortfolioGrid />
        <AboutPage />
        <Timeline/>
        <ContactCTA/>
      </MotionContainer>
      
    </>
  )
}

