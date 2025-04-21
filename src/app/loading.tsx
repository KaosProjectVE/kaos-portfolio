// src/app/loading.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'

// Cast rápido para evitar errores de className en Motion
const MotionH1: any = motion.h1
const MotionDiv: any = motion.div

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center z-50">
      <MotionH1
        className="text-2xl sm:text-4xl font-bold text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Bienvenidos a Kaos Project
        <br />
        donde tu <span className="text-[#D8C9B3]">Kaos</span> se convierte en diseño
      </MotionH1>

      <div className="mt-8">
        <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  )
}
