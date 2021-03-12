import cn from 'classnames'

import styles from './list.module.sass'

import { IoMdMore } from 'react-icons/io'
import { useEffect, useRef, useState } from 'react'

export default function List ({items, menuItems, onClick}){

	const [ menuState, setMenuState ] = useState({ position: {} })
	const listRef = useRef()

	const onMoreClick = (e, item) => {
		const rect = e.currentTarget.getBoundingClientRect()
		const offsetRect = listRef.current.getBoundingClientRect()
		setMenuState({ position: { top: rect.top-offsetRect.top, right: rect.right-offsetRect.right }, item })
	}

	const selectedItem = menuState.item
	useEffect(() => {
		if(selectedItem){
			const close = () => setMenuState(newState => newState === menuState? { ...newState, item: null }: newState )
			document.addEventListener('click', close)
			return () => document.removeEventListener('click', close)
		}
	}, [ selectedItem ])

	return (
		<div className={styles.list} ref={listRef}>
			{menuItems && (
				<div style={menuState.position} className={cn(styles.dropDownMenu, !menuState.item && styles.closed)}>
					{menuItems.map((menuItem, index) => (
						<button key={index} onClick={() => menuItem.onClick(menuState.item)}>
							{menuItem.title}
						</button>
					))}
				</div>
			)}
			{items.map(item => (
				<div key={ item._id } className={cn(styles.item, selectedItem && selectedItem._id === item._id && styles.selected)}>
					<button className={styles.info} onClick={onClick?(() => onClick(item)): null}>
						<div className={styles.title}>{ item.title }</div>
						<div className={styles.sub}>{ item.sub }</div>
					</button>
					<button className={styles.more} onClick={(e) => onMoreClick(e, item)}>
						<IoMdMore/>
					</button>
				</div>
			))}
		</div>
	)
}