// src/components/Services.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { FaPaintBrush, FaLaptopCode, FaPalette } from 'react-icons/fa'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'

// Cast rápidos para evitar errores de className en Motion
const MotionDiv: any = motion.div
const MotionH2: any = motion.h2

// Datos de servicios ofrecidos
const servicios = [
  {
    icon: <FaPaintBrush size={32} />,
    title: 'Diseño Gráfico',
    desc: 'Posts, historias y kits de branding personalizados.',
  },
  {
    icon: <FaLaptopCode size={32} />,
    title: 'Desarrollo Web',
    desc: 'Landing pages y e‑commerce con WordPress y Elementor.',
  },
  {
    icon: <FaPalette size={32} />,
    title: 'Branding',
    desc: 'Logos, paletas de color y manual de marca.',
  },
]

// Carga dinámica de Particles para fondo
const Particles: any = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

const frontOptions = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 200, density: { enable: true, area: 800 } },
    color: { value: '#000000' },
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

export default function Services() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Fondo degradado + noise */}
      <div
        className="absolute inset-0 bg-gradient-to-tr from-black via-gray-900 to-black"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[url('/assets/noise.png')] opacity-10 mix-blend-overlay"
        aria-hidden
      />

      {/* Partículas frontales */}
      <Particles
        id="services-particles"
        init={async (engine: Engine) => await loadFull(engine)}
        options={frontOptions as any}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Contenido en primer plano */}
      <MotionH2
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-3xl font-bold text-white mb-12"
      >
        Nuestros Servicios
      </MotionH2>

      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4"
      >
        {servicios.map((s, i) => (
          <MotionDiv
            key={i}
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: '0px 20px 30px rgba(0,0,0,0.4)' }}
            className="bg-gray-800 rounded-2xl p-8 flex flex-col items-center text-center cursor-pointer transition-shadow duration-300"
          >
            <div className="text-[#D8C9B3] mb-4">{s.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">{s.title}</h3>
            <p className="text-gray-300">{s.desc}</p>
          </MotionDiv>
        ))}
      </MotionDiv>
    </section>
  )
}
