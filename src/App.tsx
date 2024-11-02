import './App.css'

import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'

import { Navbar } from './component/navbar/navbar'
import { Buttonbar } from './component/navbar/button'
import { Content1stPage } from './component/Maincontent/indexpage'
import { Meeting } from './component/Page/meeting'
import { Login } from './component/Page/login'
import { SignUp } from './component/Page/signup'


function App() {

  return (
    <div>
      <Routes>

      <Route path="/" 
                  element={
                    <div>
                      <Navbar/>
                        <div className='main-box'>
                            <Content1stPage />
                        </div>
                        <Buttonbar/>
                    </div>
                    } 
                />


      <Route path='/join'
              element={
                <div>
                    <Meeting />
                </div>
              }
            />

      <Route path='/login'
            element={
              <div>
                <Login/>
              </div>
            }/>

      <Route path='/signup'
            element={
              <div>
                <SignUp/>
              </div>
            }/>
      
      </Routes>
    </div>
    
  )
}

export default App
