const MongoClient = require('mongodb').MongoClient;

module.exports = async function initModel(){

	const url = process.env.MONGO_URL
	const dbName = process.env.db_NAME

	const mongoClient = new MongoClient(url, { useUnifiedTopology: true })
	const client = await mongoClient.connect()

	const db = client.db(dbName)
	console.log(`Success connected to ${dbName}`)

	const floors = require('./floors')(db)
	const projects = require('./projects')(db)
	const data = require('./client')(db)

	return {
		floors,
		projects,
		data
	}
	
}