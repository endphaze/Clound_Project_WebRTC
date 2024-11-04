import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './component/navbar/navbar';
import { Buttonbar } from './component/navbar/button';
import { Content1stPage } from './component/Maincontent/indexpage';
import { Meeting } from './component/Page/meeting';
import { Login } from './component/Page/login';
import { SignUp } from './component/Page/signup';
import { MeetingPage } from './component/Maincontent/meetingpage';
import Menubar from './component/navbar/menubar';
import ScheduleMeeting from './component/Maincontent/schedulecontent';
import { Home } from './component/Page/Home';
import { Chat } from './component/Maincontent/chat';
import ProtectedRoute from './component/ProtectedRoute'; // นำเข้า ProtectedRoute

function App() {
  return (
    <div>
      <Routes>
        {/* หน้าแรก */}
        <Route 
          path="/" 
          element={
            <div>
              <Navbar />
              <div className='main-box'>
                <Content1stPage />
              </div>
              <Buttonbar />
            </div>
          } 
        />

        {/* หน้าเข้าร่วมการประชุม */}
        <Route 
          path="/join" 
          element={<Meeting />} 
        />

        {/* หน้า Login */}
        <Route 
          path="/login" 
          element={<Login />} 
        />

        {/* หน้า Sign Up */}
        <Route 
          path="/signup" 
          element={<SignUp />} 
        />

        {/* หน้า Home (ใช้ ProtectedRoute) */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <div>
                <Menubar />
                <Home />
              </div>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/Home/join" 
          element={
                  <ProtectedRoute>
                  <div>
                  <Meeting />
                  </div>
                  </ProtectedRoute>} 
        />

        {/* หน้า Meeting ใน Home (ใช้ ProtectedRoute) */}
        <Route 
          path="/home/meeting" 
          element={
            <ProtectedRoute>
              <div>
                <Menubar />
                <MeetingPage />
              </div>
            </ProtectedRoute>
          } 
        />

        {/* หน้า Schedule ใน Home (ใช้ ProtectedRoute) */}
        <Route 
          path="/home/schedule" 
          element={
            <ProtectedRoute>
              <div>
                <Menubar />
                <ScheduleMeeting />
              </div>
            </ProtectedRoute>
          } 
        />

        {/* หน้า Chat ใน Home (ใช้ ProtectedRoute) */}
        <Route 
          path="/home/chat" 
          element={
            <ProtectedRoute>
              <div>
                <Menubar />
                <Chat />
              </div>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </div>
  );
}

export default App;
