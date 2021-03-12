import useSWR, { mutate } from 'swr'
import { useModal } from '.'
import { useModalForm } from 'components/modal-window/modal-form'
import { useModalFloors } from 'components/modal-window/modal-floors'
import { useModalConfirm } from './modal-confirm'
import ModalBase from './modal-base'
import { num } from 'libs/rus'

import styles from './styles.module.sass'

import List from 'components/ui/list'
import { REST } from 'libs/fetch'
import { useMemo } from 'react'

const modalControls = {
	title: { type: "text", label: "Название проекта", placeholder: "Проект" },
}

const mapProject = item => ({ ...item, sub: num(item.floorCount, "этаж", "этажа", "этажей") }) 

export const ModalProjects = () => {

	const { data } = useSWR('/api/projects')
	const projects = useMemo(() => data? data.map(mapProject):[], [ data ])

	const openModalForm = useModalForm(modalControls)
	const openModalConfirm = useModalConfirm()

	const openModalFloors = useModalFloors()

	const addProject = () => openModalForm("Создание нового проекта", async (values) => {
		await REST('/api/projects', values, 'POST')
		mutate('/api/projects')
	})

	const editProject = (item) => openModalForm("Редактирование проекта", async (values) => {
		await REST('/api/projects/'+item._id, values, 'PUT')
		mutate('/api/projects')
	}, item)

	const deleteProject = (item) => openModalConfirm("Удалить проект?", item.title, async () => {
		await REST('/api/projects/'+item._id, {}, 'DELETE')
		mutate('/api/projects') 
	})

	const menuItems =  [
		{ title: "Редактировать проект", onClick: (item) => editProject(item) },
		{ title: "Удалить проект", onClick: (item) => deleteProject(item) },
	]

	return(
		<ModalBase title="Доступные проекты">
			{<List items={projects} menuItems={menuItems} onClick={openModalFloors}/> }
			<div className={styles.buttons} style={{justifyContent: "center"}}>
				<button className="button-filled" onClick={addProject}>Создать проект</button>
			</div>
		</ModalBase>
	)


}


export function useModelProjects (){
	const { open } = useModal()

	return () => open( <ModalProjects/> )
}

