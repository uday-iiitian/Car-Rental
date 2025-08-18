import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {

    const testimonials = [
        { name: "Emma Rodriguez", 
            location: "Barcelona, Spain", 
            image: assets.testimonial_image_1,
            rating: 5,
            testimonial: "Absolutely amazing experience! I booked my honeymoon through this site and everything from flights to hotel transfers was seamless. Highly recommend their curated packages." },

        { name: "Liam Johnson", 
            location: "New York, USA", 
            image: assets.testimonial_image_2,
            rating: 4,
            testimonial: "The interface is so easy to use and I loved the filters for budget and activities. Found a hidden gem resort in Bali thanks to this website!"
         },
        { name: "Sophia Lee",
            location: "Seoul, South Korea", 
            image: assets.testimonial_image_2,
            rating: 5,
            testimonial: "Their customer support was top-notch. When our flight got delayed, they quickly rearranged our itinerary without any extra charges. Would use again!" }
    ];
  return (
    <div className="py-28 px-6 lg:px-24 xl:px-44">

        <Title title="What Our Customer Say" subTitle="Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."/>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">

                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">

                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />

                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>

                        </div>

                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt='star-icon'/>
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial
