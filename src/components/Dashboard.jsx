import { useContext } from "react"
import NavBar from "./NavBar_Menu"
import Sidebar  from "./Sidebar"
import { AppContext } from "../context/AppContext"

const Dashboard = ({children, activeMenu}) => {
  const {user} = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <NavBar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <Sidebar activeMenu={activeMenu}/>
          </div>

          <div className="grow mx-5">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard;