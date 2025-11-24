import { locations } from '#constants'
import React from 'react'
import clsx from 'clsx';
import { useGSAP } from '@gsap/react';
import { Draggable } from 'gsap/Draggable';
import useWindowStore from '#store/window';
import useLocationStore from '#store/location';

const projects = locations.work?.children ??  [];

function Home() {
    const {setActiveLocation} = useLocationStore();
    const { openWindow } = useWindowStore();

    const handleOpenProjectWindow = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }
    useGSAP(()=>{
        Draggable.create(".folder")
    },[])
  return (
    <section id="home">
        <ul>
            {projects.map((project) => (
                <li key={project.id}
                className={clsx("group folder",project.windowPosition)}
                onDoubleClick = {() => handleOpenProjectWindow(project)}>
                    <img src="/images/folder.png" alt="" />
                    <p>{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home