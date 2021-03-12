import { useKeyDown } from 'libs/key-events.js'
import { useModal } from './index'
import cn from 'classnames'

import styles from './modal-window.module.sass'

import { IoIosClose } from 'react-icons/io'

export default function ModalBase ({ children, title, className }){

	const { close } = useModal()

	useKeyDown({
		'Escape': close
	})

	return (
		<div className={cn(styles.modal, className)}>
			<div className={styles.header}>
				<h3>{ title }</h3>
				<button className={styles.closeButton} onClick={close}> <IoIosClose/> </button>
			</div>
			<div className={styles.content}>
				{children}
			</div>
		</div>
	)
}