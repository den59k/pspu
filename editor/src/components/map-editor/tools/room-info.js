export function saveRoomInfo (state, { index, values }){
	const elem = state.get("elements").get(index)
	return state.set("elements", state.get("elements").set(index, {
		...elem,
		info: values
	}))
}