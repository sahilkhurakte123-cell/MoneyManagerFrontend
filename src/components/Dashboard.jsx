import { useContext } from "react"
import NavBar from "./NavBar_Menu"
import Sidebar  from "./Sidebar"
import { AppContext } from "../context/AppContext"

const Dashboard = ({children, activeMenu}) => {
  const {user} = useContext(AppContext);

  return (
    <div>
      <NavBar activeMenu={activeMenu} />
      {user && (
        <div className="flex ">
          <div className="max-[1080px]:hidden">
            {/* sidebar content  */}
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