import { createContext, useContext, useState, useEffect } from 'react'

const Context = createContext()

//Здесь мы получаем данные с сервера и можем обращаться за ними через хук useData
export function DataProvider ({children}){

	const [ data, setData ] = useState(null)

	useEffect(() => {
    fetch('/api')
    .then(res => res.json())
    .then(data => {
      setData(data)
    })
  }, [])
	
	if(!data) return <div></div>

	return (
		<Context.Provider value={data}>
			{children}
		</Context.Provider>
	)
}

export function useData () {
	const context = useContext(Context)
	return context
}