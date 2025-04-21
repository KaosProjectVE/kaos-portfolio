// src/components/PortfolioGrid.tsx
'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: string
  title: string
  image: string
  category: string
  description: string
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Branding “Kaos”',
    image: '/assets/project1.jpg',
    category: 'Branding',
    description: 'Desarrollo completo de imagen de marca, desde el logo hasta manual de identidad y aplicaciones.',
  },
  {
    id: '2',
    title: 'Web Portfolio',
    image: '/assets/project2.jpg',
    category: 'Desarrollo Web',
    description: 'Implementación de sitio web responsivo en WordPress y Elementor, optimizado para SEO y velocidad.',
  },
  {
    id: '3',
    title: 'Social Media Pack',
    image: '/assets/project3.jpg',
    category: 'Diseño Gráfico',
    description: 'Paquete de publicaciones e historias para Instagram con estética moderna y animaciones ligeras.',
  },
]

export default function PortfolioGrid() {
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <AnimatePresence>
      {selected && (
        // Wrapper con perspectiva 3D
        <motion.div
          className="fixed inset-0 bg-white bg-opacity-20 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ perspective: 1000 }} // perspectiva aplicada al contenedor
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 relative"
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'center center' }}
            initial={{ rotateX: -90, opacity: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
            animate={{ rotateX: 0, opacity: 1, boxShadow: '0px 20px 40px rgba(0,0,0,0.3)' }}
            exit={{ rotateX: -90, opacity: 0, boxShadow: '0px 0px 0px rgba(0,0,0,0)' }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setSelected(null)}
            >
              ✕
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{selected.title}</h3>
            <span className="text-sm text-gray-600 mb-4 block">{selected.category}</span>
            <p className="text-gray-700">{selected.description}</p>
          </motion.div>
        </motion.div>
      )}

      <motion.section
        className="py-20 bg-black"
        initial={{ y: 20 }}
        animate={{ y: [20, -20, 20] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.h2
          className="text-center text-3xl font-bold text-white mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Algunos de nuestros proyectos
        </motion.h2>

        <motion.div
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 shadow-2xl rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
              }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelected(p)}
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm text-[#D8C9B3] mb-2">{p.category}</span>
                <h3 className="text-xl font-semibold text-white">{p.title}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}