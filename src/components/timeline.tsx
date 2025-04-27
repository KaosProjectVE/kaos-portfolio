// src/components/Timeline.tsx
'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { motion } from 'framer-motion'

// Cast rápido para evitar errores de className en Motion
type MotionComponent = any
const MotionDiv: MotionComponent = motion.div

// Import dinámico de Particles para fondo
type ParticlesType = typeof import('react-tsparticles').Particles
const Particles: any = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

// Opciones de partículas de fondo (branding vibes)
const backOptions = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: ['#D8C9B3', '#9333ea'] },
    shape: { type: 'circle' },
    size: { value: { min: 2, max: 5 }, random: true },
    move: { enable: true, speed: 0.4 },
    opacity: { value: { min: 0.2, max: 0.6 }, random: true },
    links: { enable: true, distance: 120, color: '#D8C9B3', opacity: 0.2 },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'grab' } },
    modes: { grab: { distance: 100, links: { opacity: 0.4 } } },
  },
  detectRetina: true,
}

// Datos de la línea de tiempo de branding
type TimelineEvent = {
  step: string
  title: string
  description: string
}

const events: TimelineEvent[] = [
  { step: 'Paso 1', title: 'Brief de Marca', description: 'Definimos valores, personalidad y audiencia objetivo para sentar las bases de la identidad visual.' },
  { step: 'Paso 2', title: 'Moodboard & Paleta', description: 'Creamos un tablero de inspiración con colores, tipografías y referencias gráficas alineadas al brief.' },
  { step: 'Paso 3', title: 'Diseño de Logotipo', description: 'Desarrollamos múltiples conceptos de logo y refinamos hasta la versión final que represente la marca.' },
  { step: 'Paso 4', title: 'Guía de Estilo', description: 'Documentamos uso de logo, colores, tipografías y elementos gráficos para asegurar coherencia.' },
  { step: 'Paso 5', title: 'Aplicaciones', description: 'Diseñamos papelería, redes sociales y material promocional aplicando la nueva identidad.' },
  { step: 'Paso 6', title: 'Entrega & Feedback', description: 'Revisamos con el cliente, ajustamos detalles finales y proporcionamos recursos vectoriales y guías.' },
]

export default function Timeline() {
  return (
    <section className="relative py-20 bg-black overflow-hidden">
      {/* Fondo de partículas */}
      <Particles
        id="timeline-particles"
        init={async (engine: Engine) => await loadFull(engine)}
        options={backOptions as any}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Overlay suave */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="relative z-20 container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Cómo trabajamos en Branding</h2>
        <div className="relative">
          {/* Línea central con animación al viewport */}
          <MotionDiv
            className="absolute top-0 left-1/2 -ml-0.5 w-1 h-full bg-gradient-to-b from-[#D8C9B3] to-[#9333EA] origin-top"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
          />

          <div className="flex flex-col space-y-16">
            {events.map((evt, i) => {
              const isLeft = i % 2 === 0
              return (
                <div key={i} className="relative flex items-center">
                  {/* Punto de evento individual */}
                  <MotionDiv
                    className="absolute left-1/2 -ml-3 w-6 h-6 rounded-full bg-[#D8C9B3] z-20 border-2 border-white"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.5, 1], opacity: [0, 1, 1] }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.3 }}
                  />

                  {/* Contenedor de contenido individual */}
                  <MotionDiv
                    className={`w-1/2 p-6 bg-gray-900 rounded-lg shadow-lg z-10 ${isLeft ? 'mr-auto text-right' : 'ml-auto text-left'}`}
                    initial={{ opacity: 0, x: isLeft ? -150 : 150, rotate: isLeft ? -5 : 5 }}
                    whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.2 }}
                  >
                    <span className="block text-sm text-[#D8C9B3] mb-2">{evt.step}</span>
                    <h3 className="text-2xl font-bold text-white mb-2">{evt.title}</h3>
                    <p className="text-gray-300">{evt.description}</p>
                  </MotionDiv>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}