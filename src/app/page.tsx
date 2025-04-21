// src/app/page.tsx

import Hero from '@/Components/Hero'
import Services from '@/Components/services'
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