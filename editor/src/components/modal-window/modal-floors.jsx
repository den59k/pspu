import { useMemo } from 'react'
import useSWR, { mutate } from 'swr'
import { useModal } from '.'
import { useModalForm } from 'components/modal-window/modal-form'
import { useLocation } from 'components/router'
import { useModalConfirm } from './modal-confirm'
import { REST } from 'libs/fetch'
import { num } from 'libs/rus'

import styles from './styles.module.sass'

import ModalBase from './modal-base'
import List from 'components/ui/list'


const modalControls = {
	title: { type: "text", label: "Название этажа", placeholder: "Этаж" },
}

const mapFloor = item => ({ ...item, sub: num(item.roomCount ?? 0, "аудитория", "аудитории", "аудиторий") }) 

export const ModalFloors = ({project}) => {

	const url = '/api/projects/'+project._id+'/'

	const { data } = useSWR(url)
	const items = useMemo(() => data? data.floors.map(mapFloor):[], [ data ])

	const { closeAll } = useModal()
	const openModalForm = useModalForm(modalControls)
	const openModalConfirm = useModalConfirm()

	const addFloor = () => openModalForm("Создание нового этажа", async (values) => {
		await REST(url, values, 'POST')
		mutate(url)
	})

	const editFloor = (item) => openModalForm("Редактирование этажа", async (values) => {
		await REST(url+item._id, values, 'PUT')
		mutate(url)
	}, item)

	const deleteFloor = (item) => openModalConfirm("Удалить этаж?", item.title, async () => {
		await REST(url+item._id, {}, 'DELETE')
		mutate(url) 
	})

	const menuItems =  [
		{ title: "Редактировать этаж", onClick: (item) => editFloor(item) },
		{ title: "Удалить этаж", onClick: (item) => deleteFloor(item) },
	]
	
	const { push } = useLocation()
	const loadFloor = async (item) => {
		push(item._id, 0)
		closeAll()
	}

	return(
		<ModalBase title={ project.title || data.project.title }>
			<List items={items} menuItems={menuItems} onClick={loadFloor}/>
			<div className={styles.buttons} style={{justifyContent: "center"}}>
				<button className="button-filled" onClick={addFloor}>Добавить этаж</button>
			</div>
		</ModalBase>
	)


}


export function useModalFloors (){
	const { open } = useModal()

	return (project) => open( <ModalFloors project={project}/> )
}

