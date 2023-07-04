import { Outlet } from "react-router-dom"
import { UserPageSideBar } from "./UserPageSideBar/UserPageSideBar"

export const UserPageLayout : React.FC = () =>{
    return(
        <div>
            <UserPageSideBar></UserPageSideBar>
            <Outlet></Outlet>
        </div>
    )
}