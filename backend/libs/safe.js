module.exports = function safe (callback) {
	const safeCallback = async (req, res) => {
		try{
			await callback(req, res)
		}catch(e){
			//Обработка ошибок происходит вот здесь
			console.log(e)
			res.json({ error: "error" })
		}
	}

	return safeCallback
}