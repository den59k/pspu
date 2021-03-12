import styles from './style.module.sass'

export default function SVGElement ({tag, attributes, info, index, onClick}){

	const _attributes = {...attributes}
	

	if(parseInt(_attributes.strokeWidth) < 6){
		_attributes.className = styles.selecting
		_attributes.fill = null
		attributes.onClick = () => onClick(info, index)
	}else{
		_attributes.className = styles.contour
	}
	
	const title = info && (info.number || info.name)

	if(title){
		const center = getCenter(tag, attributes)
		return (
			<>
				{ getComponent(tag, _attributes) }
				<text {...center} className={styles.text}>{title}</text>
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

function getCenter (tag, attributes){
	if(tag === 'rect')
		return { x: parseInt(attributes.x)+parseInt(attributes.width)/2, y: parseInt(attributes.y)+parseInt(attributes.height)/2 }
	
	if(tag === 'path'){
		const { d } = attributes
		const points = []
		let lastPoint = [0, 0]
		let command = ""
		let str = ""
		for(let i = 0; i < d.length; i++){
			if(d[i].toLowerCase() !== d[i]){		//Сорри за этот костыль
				let point = str.trim().split(' ').map(i => parseInt(i))
				
				if(command === 'M' || command === 'L')	lastPoint = [ 0, 0 ]
				if(command === 'V')	lastPoint = [ lastPoint[0], 0 ]
				if(command === 'H')	lastPoint = [ 0, lastPoint[1] ]

				const cmd = command.toLowerCase()
				if(cmd === 'm' || cmd === 'l')
					point = ([ lastPoint[0]+point[0], lastPoint[1]+point[1] ])

				if(cmd === 'h')
					point = ([ lastPoint[0]+point[0], lastPoint[1] ])

				if(cmd === 'v')
					point = ([ lastPoint[0], lastPoint[1]+point[0] ])

				if(cmd && cmd !== 'z')
					points.push(point)
				
				lastPoint = point
				command = d[i]
				str = ""
			}else{
				str += d[i]
			}
		}

		const left = points.reduce((sum, current) => sum > current[0]? sum: current[0], 0)
		const top = points.reduce((sum, current) => sum > current[1]? sum: current[1], 0)
		const right = points.reduce((sum, current) => sum < current[0]? sum: current[0], 9999)
		const bottom = points.reduce((sum, current) => sum < current[1]? sum: current[1], 9999)

		return { x: (left+right) / 2, y: (top+bottom)/2 }
		//return { x: center[0]/points.length, y: center[1]/points.length }
	}
}