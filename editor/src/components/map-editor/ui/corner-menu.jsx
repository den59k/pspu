import { useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './corner-menu.module.sass'

import { IoIosMenu } from 'react-icons/io'
import { useKeyDown } from 'libs/key-events'

export default function CornerMenu ({buttons, title}){

	const [ opened, setOpened ] = useState(false)

	useKeyDown({
		'Escape': () => setOpened(false)
	}, [])

	useEffect(() => {

		if(opened){
			const callback = () => setOpened(false)
			document.addEventListener('click', callback)
			return  () => document.removeEventListener('click', callback)
		}

	}, [opened])

	return (
		<div className={cn(styles.container)}>
			<button onClick={() => setOpened(true)}><IoIosMenu/></button>
			<div className={cn(styles.menu, opened === false && styles.closed)}>
				{buttons.map((button, index) => (
					<button key={index} onClick={button.onClick}>{button.title}</button>
				))}
			</div>
			<div className={styles.title}>{title}</div>
		</div>
	)
}