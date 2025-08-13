import React from 'react'
import Hero from '../components/Hero'
import FeaturedSection from '../components/FeaturedSection'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <FeaturedSection/>
      <Banner/>
      <Testimonial/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}

export default Home;
