import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react';
import { React, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap';
import { Draggable } from "gsap/Draggable"

function WindowWrapper(Component, windowKey) {
    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);


        useGSAP(() => {
            const elem = ref.current
            if (!elem) return () => { }

            elem.style.display = "block";

            gsap.fromTo(elem,
                {
                    scale: 0.8, opacity: 0, y: -40
                },
                {
                    scale: 1, opacity: 1, y: 0, duration: 0.2, ease: "power3.out"
                }
            )
        }, [isOpen])

        useGSAP(() => {
            const elem = ref.current;
            if (!elem) return;

            const [draggable] = Draggable.create(elem, {
                onPress: () => focusWindow(windowKey),
            });

            return () => draggable.kill();
        }, []);


        useLayoutEffect(() => {
            const elem = ref.current;
            if (!elem) return () => { }

            elem.style.display = isOpen ? "block" : "none";
        }, [isOpen])
        return (
            <section className='absolute' ref={ref} id={windowKey} style={{ zIndex }}>
                <Component {...props} />
            </section>
        )
    }
    Wrapped.dispalyName = `WindowWrapper(${Component.dispalyName || Component.name || "Component"})`

    return Wrapped
}

export default WindowWrapper