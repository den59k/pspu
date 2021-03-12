import { useEffect, useState } from 'react'
import { useData } from 'components/data'
import { useRoomInfo } from 'components/room-info'

import Layout from 'components/layout'
import TabBar from 'components/ui/tab-bar'
import MapViewer from 'components/map/viewer'

function App() {

  const data = useData()
  const [ activeFloor, setActiveFloor ] = useState(0)

  const floorTitles = data.floors.map(floor => floor.title)
  const activeFloorData = data.floors[activeFloor]
  
  const { _selectedRoom } = useRoomInfo()
  const floorId = _selectedRoom.floorId
  useEffect(() => {
    if(floorId)
      setActiveFloor(data.floors.findIndex(item => item._id === floorId))
  }, [floorId])

  return (
    <div className="App">
      <Layout data={data}>
        <TabBar tabs={floorTitles} value={activeFloor} onChange={index => setActiveFloor(index)}/>
        <MapViewer data={activeFloorData}/>
      </Layout>
    </div>
  );
}

export default App;
