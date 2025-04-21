// src/components/PortfolioGrid.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Tipado rápido para evitar errores de className en Motion
const MotionDiv: any = motion.div

// Datos de ejemplo de proyectos
const projects = [
  {
    title: 'Proyecto A',
    description: 'Descripción breve del proyecto A',
    image: '/assets/project-a.jpg',
    link: '/projects/a'
  },
  {
    title: 'Proyecto B',
    description: 'Descripción breve del proyecto B',
    image: '/assets/project-b.jpg',
    link: '/projects/b'
  },
  {
    title: 'Proyecto C',
    description: 'Descripción breve del proyecto C',
    image: '/assets/project-c.jpg',
    link: '/projects/c'
  }
]

export default function PortfolioGrid() {
  return (
    <section className="py-20 px-4 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-12">Nuestros Proyectos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <MotionDiv
            key={i}
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.6 }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{proj.title}</h3>
              <p className="text-gray-600 mb-4">{proj.description}</p>
              <a
                href={proj.link}
                className="inline-block mt-auto text-indigo-600 hover:underline"
              >Ver más →</a>
            </div>
          </MotionDiv>
        ))}
      </div>
    </section>
  )
}
