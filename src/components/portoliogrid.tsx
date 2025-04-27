// src/components/PortfolioGrid.tsx
'use client'

import React, { useState, useEffect } from 'react'
import Masonry from 'react-masonry-css'
import Tilt from 'react-parallax-tilt'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { loadFull } from 'tsparticles'
import type { Engine } from 'tsparticles-engine'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Cast rápido para evitar errores de className en Motion
type MotionComponent = any
const MotionDiv: MotionComponent = motion.div

// Import dinámico de Particles para fondo
type ParticlesType = typeof import('react-tsparticles').Particles
const Particles: any = dynamic(
  () => import('react-tsparticles').then((mod) => mod.Particles),
  { ssr: false }
)

// Opciones de partículas de fondo (estilo Hero)
const backOptions = {
  fullScreen: { enable: false },
  particles: {
    number: { value: 50, density: { enable: true, area: 600 } },
    color: { value: ['#1e3a8a', '#9333ea'] },
    shape: { type: 'circle' },
    size: { value: { min: 3, max: 7 }, random: true },
    move: { enable: true, speed: 0.6 },
    opacity: { value: { min: 0.3, max: 0.7 }, random: true },
  },
  interactivity: {
    events: { onHover: { enable: true, mode: 'repulse' } },
    modes: { repulse: { distance: 100 } },
  },
  detectRetina: true,
}

// Definición de datos de proyectos
interface Project {
  title: string
  shortDesc: string
  details: string
  images: string[]
}

const projects: Project[] = [
  {
    title: 'Centro Médico Flight',
    shortDesc: 'Centro Médico Flight',
    details: 'Este proyecto Centro Médico Flight consistió en la creación de una identidad corporativa completa, incluyendo logo, paleta de colores y aplicaciones en material promocional. Se utilizó una metodología centrada en el usuario y un proceso iterativo de diseño.',
    images: ['/assets/project-a-1.jpg', '/assets/project-a-2.jpg', '/assets/project-a-3.jpg'],
  },
  {
    title: 'Proyecto B',
    shortDesc: 'Descripción breve del proyecto B',
    details: 'Proyecto B incluyó el desarrollo de una landing page responsive con animaciones sutiles. Se integró un CMS para gestión de contenido y se optimizó el rendimiento con lazy loading de imágenes.',
    images: ['/assets/project-b-1.jpg', '/assets/project-b-2.jpg'],
  },
  {
    title: 'Proyecto C',
    shortDesc: 'Descripción breve del proyecto C',
    details: 'En proyecto C realizamos un e-commerce con pasarela de pago, gestión de inventarios y funcionalidades avanzadas de búsqueda y filtrado. Se trabajó en la UX para maximizar conversiones.',
    images: ['/assets/project-c-1.jpg', '/assets/project-c-2.jpg', '/assets/project-c-3.jpg'],
  },
  {
    title: 'Proyecto D',
    shortDesc: 'Descripción breve del proyecto D',
    details: 'Diseño de una app móvil para reservas en línea, con integración de mapas interactivos y notificaciones push. La interfaz sigue lineamientos de Material Design adaptados a la identidad de marca.',
    images: ['/assets/project-d-1.jpg', '/assets/project-d-2.jpg'],
  },
  {
    title: 'Proyecto E',
    shortDesc: 'Descripción breve del proyecto E',
    details: 'Proyecto E exponente de branding digital, con desarrollo de assets sociales, templates de posts y estrategia de contenido. Se definieron KPI y se realizó seguimiento de métricas de engagement.',
    images: ['/assets/project-e-1.jpg', '/assets/project-e-2.jpg', '/assets/project-e-3.jpg'],
  },
]

// Configuración de columnas para Masonry
const breakpointColumnsObj = { default: 3, 1024: 2, 640: 1 }

export default function PortfolioGrid() {
  const [selected, setSelected] = useState<number | null>(null)
  const [currentImage, setCurrentImage] = useState(0)

  // Reset del slide cuando cambia proyecto
  useEffect(() => {
    if (selected !== null) setCurrentImage(0)
  }, [selected])

  return (
    <section className="relative py-20 px-4 bg-black overflow-hidden">
      {/* Fondo de partículas */}
      <Particles
        id="portfolio-particles"
        init={async (engine: Engine) => await loadFull(engine)}
        options={backOptions as any}
        className="absolute inset-0 z-0 pointer-events-none"
      />
      {/* Overlay semitransparente */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      <div className="relative z-20">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Nuestros Proyectos</h2>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto"
          columnClassName="space-y-8 px-2"
        >
          {projects.map((proj, i) => (
            <Tilt
              key={i}
              tiltMaxAngleX={10}
              tiltMaxAngleY={10}
              glareEnable={true}
              glareMaxOpacity={0.2}
              className="w-full"
            >
              <MotionDiv
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                onClick={() => setSelected(i)}
              >
                <img
                  src={proj.images[0]}
                  alt={proj.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
                  <p className="text-gray-300">{proj.shortDesc}</p>
                </div>
              </MotionDiv>
            </Tilt>
          ))}
        </Masonry>

        {/* Modal de proyecto seleccionado */}
        <AnimatePresence>
          {selected !== null && (
            <MotionDiv
              className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <MotionDiv
                className="bg-white rounded-lg overflow-hidden max-w-3xl w-full"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  {/* Botón de cerrar */}
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10"
                  >✕</button>

                  {/* Slider de imágenes */}
                  <div className="relative">
                    <img
                      src={projects[selected].images[currentImage]}
                      alt={projects[selected].title}
                      className="w-full h-64 object-cover"
                    />
                    {projects[selected].images.length > 1 && (
                      <>  <button
                          onClick={() => setCurrentImage((prev) => (prev - 1 + projects[selected].images.length) % projects[selected].images.length)}
                          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
                        ><FaChevronLeft /></button>
                        <button
                          onClick={() => setCurrentImage((prev) => (prev + 1) % projects[selected].images.length)}
                          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2"
                        ><FaChevronRight /></button>
                      </>
                    )}
                  </div>

                  {/* Detalles del proyecto */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{projects[selected].title}</h3>
                    <p className="text-gray-700 whitespace-pre-line">{projects[selected].details}</p>
                  </div>
                </div>
              </MotionDiv>
            </MotionDiv>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
