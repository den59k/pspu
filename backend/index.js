require('dotenv').config()
const express = require('express')
const initModel = require('./model')
const apiRoute = require('./routes')

async function init (){

	//Инициализируем модель
	const model = await initModel()
	
	//Подключаем наш роут
	const app = express()
	
  const router = express.Router()
  apiRoute(router, model)
  app.use('/api', router)

  //Мы должны выводить файлы из папки public, чтобы отдавать их
  app.use(express.static('public'))

  //Обработка ошибок
  app.use(function(_err, _req, res, _next) {
		console.log("ERROR")
		res.json({error: "error"})
	})

	const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Success app listening at http://localhost:${port}`))
}

init()
