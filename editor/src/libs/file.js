export const loadFile = (attr) => new Promise(res => {
	const fileObject = document.createElement("input")
	fileObject.setAttribute('type', 'file')

	for(let key in attr)
		fileObject.setAttribute(key, attr[key])

	fileObject.addEventListener('change', (e) => {
		const file = e.target.files[0]
		fileObject.remove()
		if(!file) return
		res(file)
	})

	fileObject.click()
})

export const fileToText = (file) => new Promise(res => {
	const reader = new FileReader();				//Мы еще должны превратить наше изображение в массив и сразу отправить на сервер
	reader.onload = async () => {
		const text = reader.result;
		res(text)
	}

	reader.readAsText(file)
})