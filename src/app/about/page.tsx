// src/app/about/page.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import type { MotionProps } from 'framer-motion'
import type { HTMLAttributes } from 'react'

// Definiciones de tipos para Motion + HTML props
type MotionH1Type = HTMLAttributes<HTMLHeadingElement> & MotionProps
type MotionH2Type = HTMLAttributes<HTMLHeadingElement> & MotionProps
type MotionPType  = HTMLAttributes<HTMLParagraphElement> & MotionProps

const MotionH1 = motion.h1 as React.FC<MotionH1Type>
const MotionH2 = motion.h2 as React.FC<MotionH2Type>
const MotionP  = motion.p  as React.FC<MotionPType>

// Timeline de hitos de la empresa
const timeline = [
  { year: '2018', event: 'Fundación de Kaos Project' },
  { year: '2019', event: 'Primer gran cliente internacional' },
  { year: '2020', event: 'Expansión a diseño web y branding' },
  { year: '2022', event: 'Lanzamiento de servicios de social media' },
  { year: '2024', event: 'Más de 100 proyectos completados' },
]

// Equipo
const team = [
  { name: 'Juan Pérez', role: 'Creative Director', image: '/assets/team1.jpg' },
  { name: 'María López', role: 'Lead Designer',     image: '/assets/team2.jpg' },
  { name: 'Carlos Ruiz', role: 'Frontend Developer', image: '/assets/team3.jpg' },
]

// Carga dinámica del componente tsParticles
const Particles = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

export default function AboutPage() {
  // Configuración de partículas (hexagonales flotantes)
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: '#000000' } },
    particles: {
      number: { value: 50, density: { enable: true, area: 600 } },
      shape: { type: 'polygon', polygon: { sides: 6 } },
      size: { value: { min: 5, max: 15 }, random: true },
      move: { enable: true, speed: 0.5, direction: 'top', outModes: { default: 'out' } },
      opacity: { value: 0.3, random: { enable: true, minimumValue: 0.1 } },
      color: { value: ['#6d28d9', '#1e40af', '#9333ea'] },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: 'bubble' },
        onClick: { enable: true, mode: 'push' },
      },
      modes: {
        bubble: { distance: 100, size: 20, duration: 2, opacity: 0.5 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  }

  return (
    <main className="relative overflow-hidden bg-black text-white py-20 px-4">
      {/* Fondo de partículas hexagonales */}
      <Particles
        id="about-particles"
        init={async (engine: Engine) => await loadFull(engine)}
        options={particlesOptions as any}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Introducción */}
      <div className="relative z-10 max-w-4xl mx-auto mb-20">
        <MotionH1
          className="text-5xl font-bold text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sobre Kaos Project
        </MotionH1>
        <MotionP
          className="text-center text-lg text-gray-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          En Kaos Project combinamos creatividad y tecnología para transformar
          ideas en experiencias visuales memorables. Nuestro equipo trabaja
          en cada detalle para que cada proyecto sea único.
        </MotionP>
      </div>

      {/* Timeline */}
      <section className="relative z-10 max-w-4xl mx-auto mb-20">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            className="flex items-start mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <div className="w-24 text-right pr-4 font-mono text-gray-300">
              {item.year}
            </div>
            <div className="flex-1 border-l border-gray-600 pl-6">
              <p className="text-lg text-gray-100">{item.event}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Equipo */}
      <section className="relative z-10 max-w-5xl mx-auto">
        <MotionH2
          className="text-3xl font-bold mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Nuestro Equipo
        </MotionH2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {team.map((t, i) => (
            <motion.div
              key={i}
              className="bg-gray-800 rounded-2xl p-6 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.3, type: 'spring', stiffness: 200 }}
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-32 h-32 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-1">{t.name}</h3>
              <span className="text-gray-300">{t.role}</span>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}