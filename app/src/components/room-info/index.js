import { createContext, useContext, useState, useMemo, useRef, useEffect } from 'react'
import cn from 'classnames'
import Gallery from './gallery'

import styles from './bottom-info.module.sass'
import { useData } from 'components/data'

import { RiUser3Line, RiSlideshow2Line } from 'react-icons/ri'
import { getEvent } from 'libs/mouse-event'

const Context = createContext()

function getContentOffset (content){
	const rect = content.offsetHeight
	const parent = content.parentElement.offsetHeight
	const offset = content.offsetTop

	return parent-rect-offset
}

export function RoomInfoProvider ({ children }){

	const [ opened, setOpened ] = useState(0)
	const [ _selectedRoom, _setSelectedRoom ] = useState({})
	const contentRef = useRef()

	const [ Y, setY ] = useState(0)
	const [ moving, setMoving ] = useState(false)
	
	useEffect(() => {
		if(!contentRef.current) return
		const offsetY = getContentOffset(contentRef.current)
		setY(offsetY)
		setOpened(1)
	}, [ _selectedRoom ])

	const selectRoom = (roomInfo) => {
		if(opened){ 
			setMoving(true)
			setY(800)
		}
			
		_setSelectedRoom(roomInfo)
	}
	const close = () => setOpened(0)
	
	const data = useData()
	const { floorId, index } = _selectedRoom
	const selectedFloor = useMemo(() => floorId? data.floors.find(item => item._id === floorId): null, [ data, floorId ])
	const selectedRoom = useMemo(() => (selectedFloor && selectedFloor.data)? selectedFloor.data.elements[index].info: null, [selectedFloor, index])
	
	const move = (currentPos, startPos) => {
		const y = Y + currentPos[1]-startPos[1]
		setY(y < 0? 0: y)
		setMoving(true)
	}

	const onMoveEnd = (currentPos, startPos) => {
		setMoving(false)
		const offsetY = getContentOffset(contentRef.current)
		const height = contentRef.current.parentElement.offsetHeight
		
		const y = Y + currentPos[1]-startPos[1]

		if(y < offsetY-y)
			return setY(0)
		
		if(Math.abs(offsetY-y) < Math.abs(height-y))
			return setY(offsetY)

		setY(0)
		setOpened(0)
	}

	return (
		<Context.Provider value={{ selectRoom, selectedRoom, _selectedRoom, close, opened }}>
			{children}
			<div 
				className={cn(styles.container, opened === 0 && styles.close, moving && styles.moving)} 
				onMouseDown={getEvent(move, onMoveEnd)} onTouchStart={getEvent(move, onMoveEnd)}
				style={Y === 0? {}: {transform: `translateY(${Y}px)`}}
			>
				{getRoomInfo(selectedFloor, selectedRoom, contentRef)}
			</div>
		</Context.Provider>
	)
}

function getRoomInfo(selectedFloor, selectedRoom, contentRef){
	if(!selectedRoom) return null
	
	const title = selectedRoom.number? (selectedRoom.number+" аудитория"): selectedRoom.name
	const sub = selectedRoom.number? selectedRoom.name: null

	const floor = selectedFloor.title

	return (
		<>
			<div className={styles.content} ref={contentRef}>
				{(selectedRoom.places || selectedFloor.devices || selectedRoom.images) && <div className={styles.lineMore}></div>}

				<h3>{title}</h3>
				<h4>{sub}</h4>
				<div className={styles.floor}>{floor}</div>
			</div>
			<Gallery images={selectedRoom.images}/>
			{selectedRoom.places && <div className={styles.info}><RiUser3Line/>{selectedRoom.places}</div>}
			{selectedRoom.devices && <div className={styles.info}><RiSlideshow2Line/>{selectedRoom.devices}</div>}
		</>
	)
}

export function useRoomInfo () {
	const context = useContext(Context)
	return context
}