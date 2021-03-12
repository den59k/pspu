const mv = require('./path').mv

module.exports.saveImage = async (src) => {
	const newSrc = mv(src, '/db/images')

	return newSrc
}