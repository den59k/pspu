module.exports = function floorRoute (app, model){
	
	app.get('/', async (req, res) => {
		const project = await model.data.getFirstProject()
		const floors = await model.data.getFloorData(project)

		res.json({ title: project.title, floors })
	})

}