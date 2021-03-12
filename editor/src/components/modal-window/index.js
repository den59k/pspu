import { createContext, useContext, useState } from 'react'
import cn from 'classnames'

import styles from './modal-window.module.sass'

const Context = createContext()

export function ModalWrapper ({children, className, style}){

	const [ windowHistory, setWindowHistory ] = useState([])
	const [ scroll, setScroll ] = useState(null)

	const open = (_modal) => {
		setScroll({left: window.pageXOffset, top: window.pageYOffset, offset: window.innerWidth-document.body.clientWidth})
		setWindowHistory(windowHistory => [ ...windowHistory, _modal ])
		window.requestAnimationFrame(() => window.scroll(0, 0))
	}

	const close = () => {
		setWindowHistory(windowHistory => windowHistory.slice(0, -1))
		window.requestAnimationFrame(() => window.scroll(scroll.left, scroll.top))
	}

	const closeAll = () => {
		setWindowHistory([])
		window.requestAnimationFrame(() => window.scroll(scroll.left, scroll.top))
	}

	const onClick = (e) => {					
		const target = e.currentTarget;
		if(target === e.target){
			document.addEventListener("mouseup", (e2) => {		//Ну а вот это неплохой код для модалки
				if(target === e2.target) close()
			}, { once: true });
		}		
	}

	const modalWindow = windowHistory.length > 0? windowHistory[windowHistory.length-1]: null
	
	return (
		<Context.Provider value={{ open, close, closeAll }}>
			<div 
				className={cn( className, windowHistory.length > 0 && styles.fixed )} 
				style={scroll?{...style, top: -scroll.top+'px', left: -scroll.left+'px', right: scroll.offset+'px'}: style}
			>
				{children}
			</div>
			
			{ windowHistory.length > 0 && (
				<div className={styles.black} onMouseDown={onClick}>
					{modalWindow}
				</div>
			) }
		</Context.Provider>
	)
}


export function useModal () {
	const context = useContext(Context)
	return context
}
