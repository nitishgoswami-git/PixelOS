import { WindowControls } from '#components'
import { techStack } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import useWindowStore from '#store/window'
import { useGSAP } from '@gsap/react'
import { Check, Flag } from 'lucide-react'
import React from 'react'
import gsap from 'gsap'

function Terminal() {
    // const {windows} = useWindowStore();

    useGSAP(() => {
        gsap.from('#blinker', {
            opacity: 0,
            duration:1,
            repeat: -1,
            ease:"bounce.out"
           
        });
    });
    return (
        <>
            <div id="window-header">
                <p>windowname</p>
                <h2>Skills</h2>
                <p><WindowControls target="terminal" /></p>
            </div>
            <div className="techstack">
                <p>
                    <span className='font-bold'>@nitish : ~/techStack {`>>>`} </span>
                    ls -all
                </p>
                <div className='label'>
                    <p className="w-32">Category</p>
                    <p>Technologies</p>
                </div>
                <ul className="content">
                    {techStack.map(({ category, items, i }) => (
                        <li key={i} className='flex items-center'>
                            <Check className='check' size={20} />
                            <h3>{category}</h3>
                            <ul key={i}>
                                {items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                    <p className='flex items-center gap-2 mt-3 text-green-600'><Flag size={10} fill="green" />Render time : 6ms</p>
                </ul>
                <p>
                    <span className='font-bold'>@nitish : ~/techStack {`>>>`} </span>
                    <span id="blinker" className='font-bold'>|</span>
                </p>
            </div>
        </>
    )
}

//hoc
const TerminalWindow = WindowWrapper(Terminal, 'terminal')

export default TerminalWindow