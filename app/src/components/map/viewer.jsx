import { useState } from "react"
import Map from "."

import { add, subtract } from 'mathjs'

import styles from './viewer.module.sass'

import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri'

function getPos(e){
	if(e.touches)
		e = e.touches[0]
	return [ e.clientX, e.clientY ]
}


export default function MapViewer ({ data }){

	const [ mapPosition, setMapPosition ] = useState([ 0, 0 ])
	const [ mapScale, setMapScale ] = useState(1)

	const onTouchStart = (e) => {
		const pos = getPos(e)
		
		const move = (e) => {
			const targetPos = getPos(e)

			const delta = subtract(targetPos, pos)
			setMapPosition(add(mapPosition, delta))
		}

		document.addEventListener('touchmove', move, { passive: true })
		document.addEventListener('touchend', () => document.removeEventListener('touchmove', move), { once: true })
	}

	const zoomIn = () => {
		setMapScale(mapScale => mapScale * 1.2)
	}

	const zoomOut = () => {
		setMapScale(mapScale => mapScale * 0.8)
	}

	const onRoomClick = (item) => {
		console.log(item)
	}

	return (
		<div className={styles.container} onTouchStart={onTouchStart}>
			<Map state={data} position={mapPosition} scale={mapScale} onRoomClick={onRoomClick}/>
			<div className={styles.buttons}>
				<button onMouseDown={zoomIn}><RiZoomInLine/></button>
				<button onMouseUp={zoomOut}><RiZoomOutLine/></button>
			</div>
		</div>
	)
}