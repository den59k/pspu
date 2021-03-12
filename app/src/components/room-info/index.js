import { createContext, useContext, useState, useMemo } from 'react'
import cn from 'classnames'
import Gallery from './gallery'

import styles from './bottom-info.module.sass'
import { useData } from 'components/data'

const Context = createContext()

export function RoomInfoProvider ({ children }){

	const [ opened, setOpened ] = useState(false)
	const [ _selectedRoom, _setSelectedRoom ] = useState({})
	
	const selectRoom = (roomInfo) => {
		
		_setSelectedRoom(roomInfo)
		setOpened(true)
	}
	const close = () => setOpened(false)
	
	const data = useData()
	const { floorId, index } = _selectedRoom
	const selectedFloor = useMemo(() => floorId? data.floors.find(item => item._id === floorId): null, [ data, floorId ])
	const selectedRoom = useMemo(() => (selectedFloor && selectedFloor.data)? selectedFloor.data.elements[index].info: null, [selectedFloor, index])
	
	return (
		<Context.Provider value={{ selectRoom, selectedRoom, _selectedRoom, close, opened }}>
			{children}
			<div className={cn(styles.container, !opened && styles.close )}>
				{getRoomInfo(selectedFloor, selectedRoom)}
			</div>
		</Context.Provider>
	)
}

function getRoomInfo(selectedFloor, selectedRoom){
	if(!selectedRoom) return null
	
	const title = selectedRoom.number? (selectedRoom.number+" аудитория"): selectedRoom.name
	const sub = selectedRoom.number? selectedRoom.name: null

	const floor = selectedFloor.title

	console.log(selectedRoom)

	return (
		<>
			<div className={styles.content}>
				<div className={styles.lineMore}></div>

				<h3>{title}</h3>
				<h4>{sub}</h4>
				<div className={styles.floor}>{floor}</div>
			</div>
			<Gallery images={selectedRoom.images}/>
		</>
	)
}

export function useRoomInfo () {
	const context = useContext(Context)
	return context
}