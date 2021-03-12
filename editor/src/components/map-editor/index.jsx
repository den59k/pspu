import SVGElement from './svg-element.jsx'

export default function MapEditor ({state, onRoomClick}){

	if(!state) return null

	const elements = state.get('elements')
	const shape = state.get('shape')

	if(!elements || !shape) return <svg></svg>

	return (
		<svg {...shape} fill="none">
			{elements.map((data, index) => <SVGElement {...data} index={index} key={index} onClick={onRoomClick}/> )}
		</svg>
	)
}
