const safe = require('../libs/safe')

module.exports = function floorRoute (app, model){

	app.get('/floors/:floorId', safe(async (req, res) => {
		const { floorId } = req.params
		const floor = await model.floors.getFloor(floorId)
		const project = await model.projects.getProject(floor.projectId)

		res.json({ project, floor })
	}))

	
	app.put('/floors/:floorId', async (req, res) => {
		const { floorId } = req.params
		const resp = await model.floors.saveFloorData(floorId, req.body)
		res.json(resp)
	})

	app.get('/projects/:projectId', async (req, res) => {
		const { projectId } = req.params
		const project = await model.projects.getProject(projectId)
		const floors = await model.floors.getFloorList(projectId)
		res.json({ project, floors })
	})

	app.post('/projects/:projectId', async(req, res) => {
		const { projectId } = req.params
		const resp = await model.floors.addFloor({ projectId, ...req.body })
		res.json(resp)
	})

	app.put('/projects/:projectId/:floorId', async(req, res) => {
		const { projectId, floorId } = req.params
		const resp = await model.floors.editFloor(floorId, req.body)
		res.json(resp)
	})

	app.delete('/projects/:projectId/:floorId', async(req, res) => {
		const { projectId, floorId } = req.params
		const resp = await model.floors.deleteFloor(floorId)
		res.json(resp)
	})

}