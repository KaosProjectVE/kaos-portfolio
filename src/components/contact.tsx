// src/components/ContactCTA.tsx
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'

// Casteo rápido para poder usar className en Motion
const MotionButton: any = motion.button

export default function ContactCTA() {
  const whatsappLink = 'https://wa.me/584126057182?text=Hola%20Kaos%20Project,%20quiero%20más%20información'

  return (
    <>
      {/* Botón fijo de WhatsApp */}
      <MotionButton
        className="fixed bottom-5 right-5 z-50 bg-green-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center focus:outline-none"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.open(whatsappLink, '_blank')}
      >
        <FaWhatsapp size={24} className="mr-2" />
        <span className="font-semibold">WhatsApp</span>
      </MotionButton>
    </>
  )
}