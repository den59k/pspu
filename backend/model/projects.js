const ObjectID = require('mongodb').ObjectID

module.exports = function projectModel (db) {

	const projectCollection = db.collection('projects')
	const floorCollection = db.collection('floors')

	const methods = {}

	methods.getProject = async (projectID) => {
		const _id = new ObjectID(projectID)
		const resp = await projectCollection.findOne({_id})
		return resp
	}

	methods.getProjectList = async () => {
		
		const list = await projectCollection.find({}).toArray()

		const resp = []
		for(let project of list){
			const floorCount = await floorCollection.find({ projectId: project._id }).count()
			resp.push({ ...project, floorCount })
		}

		return resp
	}
	
	methods.addProject = async ({ title }) => {
		const resp = await projectCollection.insertOne({ title })
		return { count: resp.insertedCount }
	}

	methods.editProject = async (id, {title}) => {
		const _id = new ObjectID(id)
		const resp = await projectCollection.updateOne({_id}, { $set: { title }})
		return { count: resp.modifiedCount }
	}

	methods.deleteProject = async (id) => {
		const _id = new ObjectID(id)
		const resp = await projectCollection.deleteOne({_id})
		return { count: resp.deletedCount }
	}

	return methods
}