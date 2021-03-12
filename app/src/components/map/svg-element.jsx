import styles from './style.module.sass'
import { getCenter } from './tools'

export default function SVGElement ({tag, attributes, info, index, onClick}){

	const _attributes = {...attributes}
	

	if(parseInt(_attributes.strokeWidth) < 6){
		_attributes.className = styles.selecting
		_attributes.fill = null
		attributes.onClick = () => onClick(info, index)
	}else{
		_attributes.className = styles.contour
	}

	if(info && info.number){
		const center = getCenter(tag, attributes)
		return (
			<>
				{ getComponent(tag, _attributes) }
				<text {...center} className={styles.text}>{info.number}</text>
				
			</>
		)
	}
	
	return getComponent(tag, _attributes)
}


function getComponent (tag, attributes, key) {
	switch(tag){
		case 'rect': return <rect {...attributes}/>
		case 'path': return <path {...attributes}/>
		case 'line': return <line {...attributes}/>
		default: return <line {...attributes}/>
	}
}