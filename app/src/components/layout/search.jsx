import { useState, useMemo, useRef } from 'react'
import cn from 'classnames'

import styles from './search.module.sass'

import { BsGeoAlt, BsArrowLeft } from 'react-icons/bs'
import { useData } from 'components/data'

function getFloorList (floors){
	const list = []
	for(let floor of floors){
		if(!floor.data || !floor.data.elements) continue

		for(let i = 0; i < floor.data.elements.length; i++){
			const room = floor.data.elements[i].info
			if(!room || !room.number && !room.name) continue
			
			list.push({ number: room.number, name: room.name, index: i, floor })
		}	
	}
	return list
}

function getFilteredList (list, searchValue){
	return list.filter(item => {

		return item.number?.startsWith(searchValue) || item.name?.startsWith(searchValue)
	})
}

export default function Search (){

	const searchRef = useRef()
	const [ searchValue, setSearchValue ] = useState("")
	const [ showList, setShowList ] = useState(false)

	const data = useData()

	const list = useMemo(() => getFloorList(data.floors), [ data ])
	const filteredList = useMemo(() => searchValue.length > 0? getFilteredList(list, searchValue): [], [ list, searchValue ])

	const onFocus = () => {
		if(!showList)	searchRef.current.select()
		setShowList(true)
	}

	return (
		<>
			<div className={styles.search}>
				<input type="search" name="search" onFocus={onFocus} ref={searchRef} 
					placeholder="Найти аудиторию" value={searchValue} onChange={e => setSearchValue(e.target.value)}/>
				<BsGeoAlt/>
				<button className={cn(styles.backButton, !showList && styles.closed)} onClick={() => setShowList(false)}>
					<BsArrowLeft/>
				</button>
			</div>
			<div className={cn(styles.searchFill, !showList && styles.closed)}>
				<List items={filteredList}/>
			</div>
		</>
	)
}


function List ({items}){

	return (
		<div className={styles.searchList}>
			{items.map(item => (
				<button key={item.floor._id + ' ' + item.index}>
					<div className={styles.title}>{item.number + ' аудитория'}</div>
					<div className={styles.sub}>{item.floor.title}</div>
				</button>	
			))}
		</div>
	)
}