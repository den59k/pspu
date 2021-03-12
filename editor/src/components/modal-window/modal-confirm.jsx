import React from 'react'
import cn from 'classnames'

import styles from './styles.module.sass'

import { useModal } from './index'
import ModalBase from './modal-base'

export function ModalConfirm({title, text, action, onSubmit}){

	const { close } = useModal()

	const _onSubmit = () => {
		const submitResponse = onSubmit()
		if(submitResponse.then){ 
			submitResponse.then((submitResponse) => {
				if(submitResponse && submitResponse.error) return
				close()
			})
		}else{
			if(submitResponse && submitResponse.error) return
			close()
		}
	}

	return (
		<ModalBase title={title} className={styles.confirm}>
			<div className={styles.content}>
				{text}
			</div>
			<div className="buttons">
				<button className="button" onClick={close}>Отмена</button>
				<button className={cn("button-filled")} onClick={_onSubmit}>{action || "Удалить"}</button>
			</div>
		</ModalBase>
	)
}

export function useModalConfirm(){
	const { open } = useModal()

	return ( title, text, onSubmit ) => open( <ModalConfirm title={title} text={text} onSubmit={onSubmit}/> )
}