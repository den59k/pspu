import { List, Map } from 'immutable'

export function stateToJson(editorState){
	const shape = editorState.get('shape')
	const elements = editorState.get('elements').toArray()
	const json = { shape, elements }

	return json
}

export function jsonToState(json){
	const elements = new List(json.elements)
	const shape = json.shape
	const editorState = new Map ({ elements, shape })

	return editorState
}