import SVGElement from './svg-element.jsx'
import { getCenter } from './tools.js'

import styles from './style.module.sass'

export default function Map ({ state, onRoomClick, position, scale, selected }){

	if(!state) return null

	const elements = state.elements
	const shape = state.shape 
	if(!elements || !shape) return <svg></svg>

	const selectedElement = elements[selected]
	const center = selectedElement? getCenter(selectedElement.tag, selectedElement.attributes): null

	return (
		<div className={styles.container} style={{transform: `translate(${position[0]}px, ${position[1]}px) scale(${scale})`}}>
			<svg {...shape} fill="none" >
				{elements.map((data, index) => <SVGElement {...data} index={index} key={index} onClick={onRoomClick}/> )}
			</svg>
			{center && <img src="/images/geo.svg" alt="Выбранная аудитория" className={styles.geo} style={{top: center.y, left: center.x}}/>}
		</div>
	)
}
