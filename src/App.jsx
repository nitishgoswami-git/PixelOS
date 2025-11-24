import { Dock, Home, Navbar, Welcome} from '#components'
import { Chrome, Finder, Resume, Terminal, TextViewer,ImageViewer, Contact } from '#windows'


import React from 'react'


import { Draggable } from 'gsap/Draggable'
import gsap from 'gsap'

gsap.registerPlugin(Draggable)

function App() {
  return (
    <main className='bg-amber-900'>
      <Navbar />
      <Welcome />
      <Dock />
      <Terminal/>
      <Chrome/>
      <Resume/>
      <Finder/>
      <TextViewer/>
      <ImageViewer/>
      <Contact/>
      <Home/>
    </main>
  )
}

export default App