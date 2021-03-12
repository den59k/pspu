const saveImage = require('../libs/process-image').saveImage
const ObjectID = require('mongodb').ObjectID

module.exports = function floorModel (db) {

	const floorCollection = db.collection('floors')

	const methods = {}
	
	methods.getFloor = async (floorId) => {
		const _id = new ObjectID(floorId)
		const resp = await floorCollection.findOne({ _id })
		return resp
	}

	methods.getFloorList = async (_projectId) => {
		const projectId = new ObjectID(_projectId)
		const resp = await floorCollection.find({ projectId }, { projection: { title: 1, roomCount: 1 }}).toArray()
		return resp
	}
	
	methods.addFloor = async ({ projectId, title }) => {
		const _projectId = new ObjectID(projectId)
		const resp = await floorCollection.insertOne({ projectId: _projectId, title })
		return { count: resp.insertedCount }
	}

	methods.editFloor = async (id, { title }) => {
		const _id = new ObjectID(id)
		const resp = await floorCollection.updateOne({_id}, { $set: { title }})
		return { count: resp.modifiedCount }
	}

	methods.saveFloorData = async (id, data) => {
		const _id = new ObjectID(id)
		let roomCount = 0
		for(let item of data.elements){
			if(item.info && item.info.number) roomCount++
			if(item.info && item.info.images)
				for(let i = 0; i < item.info.images.length; i++){
					if(item.info.images[i].src.startsWith('/db/temp/'))
						item.info.images[i].src = await saveImage(item.info.images[i].src)
				}
		}
		const resp = await floorCollection.updateOne({_id}, { $set: { data, roomCount }})
		return { count: resp.modifiedCount } 
	}

	methods.deleteFloor = async (id) => {
		const _id = new ObjectID(id)
		const resp = await floorCollection.deleteOne({_id})
		return { count: resp.deletedCount }
	}

	return methods
}