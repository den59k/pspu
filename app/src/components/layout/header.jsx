import styles from './layout.module.sass'

import Search from './search'
import { BsGrid } from 'react-icons/bs'
import { RiMenu2Fill } from 'react-icons/ri'
import { useSideMenu } from 'components/side-menu'

export default function Header (){

	const { open } = useSideMenu()

	return (
		<header className={styles.header}>
			<button className={styles.button} onClick={open}><RiMenu2Fill/></button>
			<Search/>
			<button className={styles.button}><BsGrid/></button>
		</header>
	)
}