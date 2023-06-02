import React from 'react'
import Movies from './Movies'
import Navbar from './Navbar'

function Home() {
  return (
    <main>
        <Navbar />
        <section>
            <Movies />
        </section>
    </main>
  )
}

export default Home