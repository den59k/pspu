const express = require('express')
const fs = require('fs')
const nanoid = require('nanoid').nanoid
const mime = require('mime')
const { base } = require('../libs/path')

module.exports = function(app){

	app.use('/upload', express.raw({ limit: '5mb', type: '*/*' }))

	app.post('/upload', async(req, res) => {
		
		if(!Buffer.isBuffer(req.body)) return res.json({error: "wrong body"})
	
		const extension = '.'+mime.getExtension(req.headers['content-type'])

		const path = '/db/temp/'+nanoid(20)+extension
		await fs.promises.writeFile(base(path), req.body)

		res.json({src: path})
	})

}