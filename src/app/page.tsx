// src/app/page.tsx

import Hero from '@/components/hero'
import Services from '@/components/services'
import PortfolioGrid from '@/components/portoliogrid'
import Abaut from '@/app/about/page'
export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <Abaut />
      <PortfolioGrid />
      
      
      
    </>
  )
}