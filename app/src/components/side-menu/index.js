import { createContext, useContext, useState } from 'react'
import cn from 'classnames'

import styles from './side-menu.module.sass'

const Context = createContext()

export function SideMenuProvider ({ children }){

	const [ opened, setOpened ] = useState(false)

	const open = () => setOpened(true)
	const close = () => setOpened(false)

	const onBlackClick = (e) => {
		if(e.target === e.currentTarget) close()
	}

	return (
		<Context.Provider value={{ open, close, opened }}>
			{children}
			<div className={cn(styles.black, !opened && styles.close )} onClick={onBlackClick}>
				<div className={styles.menu}>
					<img src="/pspu-logo.png" className={styles.logo}/>
				</div>
			</div>
		</Context.Provider>
	)
}

export function useSideMenu () {
	const context = useContext(Context)
	return context
}