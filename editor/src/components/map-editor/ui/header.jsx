import { useModelProjects } from 'components/modal-window/modal-projects'
import CornerMenu from './corner-menu'

import styles from './styles.module.sass'

export default function MapEditorHeader ({ onLoadSVG, onSave, title }){

	const openModalProjects = useModelProjects()
	
	const buttons = [
		{ title: "Открыть проект", onClick: openModalProjects },
		{ title: "Сохранить изменения", onClick: onSave },
		{ title: "Загрузить SVG", onClick: onLoadSVG }
	]

	return (
		<div className={styles.header}>
			<CornerMenu buttons={buttons} title={title}/>
		</div>
	)
}