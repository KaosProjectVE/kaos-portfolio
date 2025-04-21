// src/app/page.tsx

import Hero from '@/components/Hero'
import Services from '@/components/services'
import PortfolioGrid from '@/components/PortfolioGrid'
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