import { useState } from "react"
import Map from "."

import styles from './viewer.module.sass'

import { RiZoomInLine, RiZoomOutLine } from 'react-icons/ri'
import { useRoomInfo } from "components/room-info"

import { getEvent } from 'libs/mouse-event'
import { add, subtract } from 'mathjs'

export default function MapViewer ({ data }){

	const [ mapPosition, setMapPosition ] = useState([ 0, 0 ])
	const [ mapScale, setMapScale ] = useState(1)

	const move = (currentPos, startPos) => {
		const delta = subtract(currentPos, startPos)
		setMapPosition(add(mapPosition, delta))
	}
	
	const zoomIn = () => {
		setMapScale(mapScale => mapScale * 1.2)
	}
	
	const zoomOut = () => {
		setMapScale(mapScale => mapScale * 0.8)
	}
	
	const { _selectedRoom, selectRoom, opened } = useRoomInfo()
	
	const onRoomClick = (item, index) => {
		if(!item) return
		selectRoom({ floorId: data._id, index })
	}
	

	return (
		<div className={styles.container} onTouchStart={getEvent(move)} onMouseDown={getEvent(move)}>
			<Map 
				state={data.data} 
				position={mapPosition} 
				scale={mapScale} 
				onRoomClick={onRoomClick} 
				selected={ (opened && _selectedRoom.floorId === data._id)? _selectedRoom.index: -1 }
			/>
			<div className={styles.buttons}>
				<button onMouseDown={zoomIn}><RiZoomInLine/></button>
				<button onMouseUp={zoomOut}><RiZoomOutLine/></button>
			</div>
		</div>
	)
}