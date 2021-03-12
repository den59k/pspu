import SVGElement from './svg-element.jsx'

export default function Map ({ state, onRoomClick, position, scale }){

	if(!state) return null

	const elements = state.elements
	const shape = state.shape 
	if(!elements || !shape) return <svg></svg>

	return (
		<svg {...shape} fill="none" style={{transform: `translate(${position[0]}px, ${position[1]}px) scale(${scale})`}}>
			{elements.map((data, index) => <SVGElement {...data} index={index} key={index} onClick={onRoomClick}/> )}
		</svg>
	)
}
