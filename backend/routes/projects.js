module.exports = function projectsRoute (app, model){

	app.get('/projects', async (_req, res) => {
		const resp = await model.projects.getProjectList()
		res.json(resp)
	})

	app.post('/projects', async(req, res) => {
		const resp = await model.projects.addProject(req.body)
		res.json(resp)
	})

	app.put('/projects/:projectId', async(req, res) => {
		const { projectId } = req.params
		const resp = await model.projects.editProject(projectId, req.body)
		res.json(resp)
	})

	app.delete('/projects/:projectId', async(req, res) => {
		const { projectId } = req.params
		const resp = await model.projects.deleteProject(projectId)
		res.json(resp)
	})

}