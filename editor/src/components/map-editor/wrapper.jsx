import { useEffect, useState } from 'react'
import { useModalMap } from 'components/modal-window/modal-map'
import { useLocation } from 'components/router'
import svgToState from './tools/svg-to-state'
import { saveRoomInfo } from './tools/room-info'

import MapEditor from './index'
import MapEditorHeader from './ui/header'
import createState from './tools/create-state'
import { GET, REST } from 'libs/fetch'
import { fileToText, loadFile } from 'libs/file'
import { jsonToState, stateToJson } from './tools/exports'

export default function MapEditorWrapper (){

	const [ editorState, setEditorState ] = useState(() => createState())
	const [ data, setData ] = useState(null)
	const openModalMap = useModalMap()

	const { get } = useLocation()
	const floorId = get(0)

	useEffect(() => {
		if(floorId)
			GET('/api/floors/'+floorId)
			.then((data) => {
				if(data.error) return
				setData({ _id: data.floor._id, title: data.project.title+' - '+data.floor.title })
				if(data.floor.data)
					setEditorState(jsonToState(data.floor.data))
				else
					setEditorState(createState())
			})
	}, [ floorId ])

	const onRoomClick = (info, index) => {
		console.log(info, index)
		openModalMap (info, values => {
			setEditorState(state => saveRoomInfo(state, { index, values }))
		})
	}
	
	const onLoadSVG = async () => {
		const file = await loadFile({ accept: ".svg" })
		const text = await fileToText(file)
		setEditorState(svgToState(editorState, text))
	}

	const onSaveFloor = () => {
		if(!data) return
		const jsonObj = stateToJson(editorState)

		REST('/api/floors/'+floorId, jsonObj, 'PUT')
		.then(() => {
			console.log('saved')
		})
	}

	return (
		<div>
			<MapEditorHeader 
				onSave={onSaveFloor}
				onLoadSVG={onLoadSVG} 
				title={data && data.title }
			/>
			<MapEditor state={editorState} onRoomClick={onRoomClick}/>
		</div>
	)
}