import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
    
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500">
            <div className="flex flex-wrap items-start justify-between gap-8 pb-6 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src={assets.logo} alt="dummyLogoColored" />
                    <p className="max-w-[410px] mt-6">Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.</p>
                    <div className='flex items-center gap-3 mt-6'>
                        <a href="#"> <img src={assets.facebook_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"> <img src={assets.instagram_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"> <img src={assets.twitter_logo} className='w-5 h-5' alt="" /></a>
                        <a href="#"> <img src={assets.gmail_logo} className='w-5 h-5' alt="" /></a>
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-3 mb-2">Quick Links</h3>
                            <div className="text-sm space-y-1 flex flex-col justify-center">
                                        <a href="#" className="hover:underline transition">Home</a>
                                        <a href="#" className="hover:underline transition">Browse Cars</a>
                                        <a href="#" className="hover:underline transition">List Your Cars</a>
                                        <a href="#" className="hover:underline transition">About Us</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-3 mb-2">Resources</h3>
                            <div className="text-sm space-y-1 flex flex-col justify-center">
                                        <a href="#" className="hover:underline transition">Help Center</a>
                                        <a href="#" className="hover:underline transition">Terms Of Service</a>
                                        <a href="#" className="hover:underline transition">Privacy Policy</a>
                                        <a href="#" className="hover:underline transition">Insurance</a>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-semibold text-base text-gray-900 md:mb-3 mb-2">Contact</h3>
                            <div className="text-sm space-y-1 flex flex-col justify-center">
                                <li className="list-none">1234 Luxury Drive</li>
                                <li className="list-none">San Francisco, CA 10935</li>
                                <li className="list-none">+1 89425927558</li>
                                <li className="list-none">carChalao@example.com</li>
                            </div>
                        </div>
                </div>
            </div>
            <div className='flex justify-between my-5'>
                <p>©{new Date().getFullYear()} Brand. All rights reserved.</p>
                <ul className="flex gap-2">
                    <li>    <a href="#">Privacy</a></li>
                    <li>|</li>
                    <li>    <a href="#">Terms</a></li>
                    <li>|</li>
                    <li>    <a href="#">Cookies</a> </li>
                </ul>
            </div>
        </div>
    );
}

export default Footer
