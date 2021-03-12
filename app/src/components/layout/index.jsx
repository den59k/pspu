import styles from './layout.module.sass'

import Header from './header'


export default function Layout ({ children }){

	return (
		<div className={styles.layout}>
			<Header/>
			{children}
		</div>
	)
}