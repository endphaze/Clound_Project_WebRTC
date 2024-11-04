import { Navbar } from "../navbar/navbar"
import { MeetingWithus } from "../Maincontent/meetingwithus"
import Menubar from "../navbar/menubar"

export const Meeting=()=>{
    return(
        <div>
            <Menubar/>
            <div>
            <MeetingWithus></MeetingWithus>
            </div>
        </div>
        
        
        
    )
}