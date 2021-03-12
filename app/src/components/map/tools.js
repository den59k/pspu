
export function getCenter (tag, attributes){
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