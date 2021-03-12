const sharp = require('sharp') 
const path = require('path')

//Функция получения корневой папки
function base (pathStr){
	return path.join(process.cwd(), '/public/', pathStr)
}

module.exports.saveImage = async (src) => {

	const target = path.join('/db/images', path.basename(src))
	//await fs.promises.rename(base(oldPath), )

	await sharp(base(src)).resize(800, 600, { fit: "contain" }).jpeg({quality: 80}).toFile(base(target))

	return target
}