const ObjectID = require('mongodb').ObjectID

module.exports = function clientModel (db) {

	const floorCollection = db.collection('floors')
	const projectCollection = db.collection('projects')

	const methods = {}
	
	methods.getFloorData = async (project) => {
		const floors = await floorCollection.find({ projectId: project._id }).toArray()
		return floors
	}

	methods.getFirstProject = async () => {
		const project = await projectCollection.findOne({})
		return project
	}

	return methods

}