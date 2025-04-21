// src/components/Hero.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { loadFull } from 'tsparticles'

// Import dinámico para evitar SSR
const Particles = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

export default function Hero() {
  // Configuración de partículas en segundo plano
  const backOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 80, density: { enable: true, area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      size: { value: { min: 1, max: 4 }, random: true },
      move: { enable: true, speed: 0.8 },
      links: { enable: true, distance: 120, color: '#ffffff', opacity: 0.25, width: 1 },
      opacity: { value: { min: 0.3, max: 0.8 }, random: true },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' } },
      modes: { repulse: { distance: 100 } },
    },
    detectRetina: true,
  }

  // Configuración de partículas en primer plano
  // Configuración de partículas en primer plano (negras)
  const frontOptions = {
    fullScreen: {  enable: true },
    particles: {
      number: { value: 200, density: { enable: true, area: 800 }},
      color: { value: '#000000' }, // Partículas negras en primer plano
      shape: { type: 'circle' },
      size: { value: { min: 2, max: 6 }, random: true },
      move: { enable: true, speed: 0.5 },
      links: { enable: false },
      opacity: { value: 0.7, random: true },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: 'repulse' } },
      modes: { repulse: { distance: 80 } },
    },
    detectRetina: true,
  }


  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Capa trasera */}
      <Particles
        id="tsparticles-back"
        init={loadFull}
        options={backOptions}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ position: 'absolute' }}
      />

      {/* Overlay suave */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Texto */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white text-center drop-shadow-lg"
        >
          Transformamos el <span className="text-[#D8C9B3]">Kaos</span> en Diseño
        </motion.h1>
      </div>

      {/* Capa frontal */}
      <Particles
        id="tsparticles-front"
        init={loadFull}
        options={frontOptions}
        className="absolute inset-0 z-30 pointer-events-none"
        style={{ position: 'absolute' }}
      />
    </section>
  )
}

