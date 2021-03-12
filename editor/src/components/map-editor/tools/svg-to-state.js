import { List } from 'immutable'

const reactAttributes = {
	"stroke-width": "strokeWidth"
}
const getReactAttribute = (attr) => {
	if(attr in reactAttributes) 
		return reactAttributes[attr]
	return attr
}

const moveEntriesToForward = (elements) => {
	const entries = [];
	const elems = [];

	for(let i = 0; i < elements.length; i++)
		if(elements[i].tag === 'rect' && !elements[i].attributes.strokeWidth)
			entries.push(elements[i])
		else
			elems.push(elements[i])

	return elems.concat(entries)
} 

export default function svgToState (state, svgText){
	const parser = new DOMParser();
	const doc = parser.parseFromString(svgText, "image/svg+xml")
	const svg = doc.firstElementChild

	const shape = { width: svg.getAttribute("width"), height: svg.getAttribute("height") }

	const _elements = []
	for(let item of svg.children){

		const attributes = {}
		for (let i = 0; i < item.attributes.length; i++) {
			attributes[getReactAttribute(item.attributes[i].name)] = item.attributes[i].value;
		}

		_elements.push({
			tag: item.tagName,
			attributes
		})
	}

	const elements = new List(moveEntriesToForward(_elements))

	return state.merge({ shape, elements })
}