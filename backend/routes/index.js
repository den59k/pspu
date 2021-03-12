const express = require('express')
const cookieParser = require('cookie-parser')

const clientRoutes = require('./client')

const floorRoutes = require('./floors')
const projectsRoute = require('./projects')
const uploadRoute = require('./upload')

module.exports = function apiRoute (app, model){

	app.use(express.json())
	app.use(cookieParser())
	
	clientRoutes(app, model)

	floorRoutes(app, model)
	projectsRoute(app, model)
	uploadRoute(app)
}