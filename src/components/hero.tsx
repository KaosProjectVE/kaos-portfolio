// src/components/Hero.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { motion } from 'framer-motion'


// Componente Tipado h1 animado con Framer Motion
const MotionH1: any = motion.h1

// Import dinámico de Particles para evitar SSR
const Particles = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

export default function Hero() {
  // Opciones de partículas de fondo
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

  // Opciones de partículas frontales
  
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
      {/* Partículas de fondo */}
      <Particles
        id="tsparticles-back"
        init={async (engine: Engine) => await loadFull(engine)}
        options={backOptions as any}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Texto hero */}
      <div className="relative z-20 flex items-center justify-center h-full px-4">
        <MotionH1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl lg:text-8xl font-extrabold text-white text-center drop-shadow-lg"
        >
          Transformamos el <span className="text-[#D8C9B3]">Kaos</span> en Diseño
        </MotionH1>
      </div>

      {/* Partículas frontales */}
      <Particles
        id="tsparticles-front"
        init={async (engine: Engine) => await loadFull(engine)}
        options={frontOptions as any}
        className="absolute inset-0 z-30 pointer-events-none"
      />
    </section>
  )
}
