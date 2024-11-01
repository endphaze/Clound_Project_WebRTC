import './App.css'
import { Navbar } from './component/navbar/navbar'
import { Buttonbar } from './component/navbar/button'
import { Content1stPage } from './component/Maincontent/indexpage'

function App() {

  return (
    <div>
      <Navbar/>
      <div className='main-box'>
        <Content1stPage/>
      </div>
      <Buttonbar/>
    </div>
    
  )
}

export default App
