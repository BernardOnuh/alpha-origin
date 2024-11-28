import React, { useState } from 'react';
import Header from './Header'
import Hero from './Hero'
import About from './About';



export default function index() {
    
    return (
        <div className=' relative' >
        <Header />
        <Hero/>
        <About/>
        </div>
    )
}