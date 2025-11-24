import { WindowControls } from '#components'
import { locations } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper'
import useLocationStore from '#store/location';
import { ArrowLeft, ArrowRight, ArrowUpCircle, Blocks, BookMarked, ChevronDown, ChevronLeft, ChevronRight, CircleArrowOutUpRightIcon, CircleUser, EllipsisVertical, Folder, GlobeLock, PanelLeft, Puzzle, RefreshCcwDotIcon, RefreshCcwIcon, RotateCw, Search, ShieldHalf, Star, X } from 'lucide-react';
import clsx from 'clsx';
import React from 'react'
import useWindowStore from '#store/window';

function Finder() {
    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation, resetActiveLocation } = useLocationStore();

    const openItem = (item) => {
        if (item.fileType === 'pdf') return openWindow('resume')
        if (item.kind === 'folder') return setActiveLocation(item)
        if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, '_blank')
        if (item.fileType === "txt")
            return openWindow("txtfile", item);
        if (item.fileType === "img")
            return openWindow("imgfile", item);
    }
    const renderList = (name, items) => (<div>
        <h3>{name}</h3>
        <ul>{
            items.map((item) => (
                <li
                    key={item.id}
                    onClick={() =>
                        setActiveLocation(item)}
                    className={clsx(
                        item.id === activeLocation?.id ? "active" : "not-active",)}>
                    <img src={item.icon} alt={item.name} className='w-4' />
                    <p className='text-sm font-light text-white truncate'>{item.name}</p>
                </li>
            ))}
        </ul>
    </div>
    )

    return (
        <>
            <div id='window-header'>
                <div className='flex gap-1 opacity-40'>
                    <ChevronLeft className='bg-gray-700 rounded-sm' />
                    <ChevronRight className='bg-gray-700 rounded-sm' />
                </div>
                <div className='flex'>
                    <div className="bg-gray-800 w-80 flex items-center  rounded-l-lg truncate">

                        <img src={activeLocation.icon} className='icon size-6' />

                        <h6 className='pl-3'> Home/ Public / {activeLocation.name}</h6>
                    </div>
                    <EllipsisVertical className='bg-gray-700 size-7 rounded-r-md p-2' />
                    <Search className='icon ml-1 bg-gray-700 size-7 rounded-md p-2' />
                </div>


                <WindowControls target='finder' />
            </div>
            <div className="bg-[#2e3436] flex h-full">
                <div className="sidebar">
                    {renderList("Favorites", Object.values(locations))}
                    <div className="overflow-y-auto">
                        {renderList("Work", Object.values(locations.work.children))}
                    </div>
                </div>
                <ul className='content'>
                    {activeLocation?.children.map((item) => (
                        <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                            <img src={item.icon} alt={item.name} />
                            <p>{item.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const finderWindow = WindowWrapper(Finder, 'finder')

export default finderWindow