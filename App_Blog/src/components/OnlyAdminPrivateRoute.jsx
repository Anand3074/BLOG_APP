import { useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom'

function OnlyAdminPrivateRoute() {
    const {currentUser} = useSelector((state) => state.user)
    console.log(currentUser && currentUser.isAdmin ?  'hello' : 'soorry'    )
return (
currentUser && currentUser.isAdmin ?  (<Outlet/>) : (<Navigate to='/sign-in'/>)   )
}
export default OnlyAdminPrivateRoute