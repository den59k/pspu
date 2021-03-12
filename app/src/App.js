import { useEffect, useState } from 'react'

import Layout from 'components/layout'
import TabBar from 'components/ui/tab-bar'
import MapViewer from 'components/map/viewer'
import { useData } from 'components/data'

function App() {

  const data = useData()
  const [ activeFloor, setActiveFloor ] = useState(0)

  const floorTitles = data.floors.map(floor => floor.title)
  const activeFloorData = data.floors[activeFloor].data
  
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
