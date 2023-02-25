import React from 'react'
import {Navigate, useLocation} from "react-router-dom"

const Protected = ({children}) => {
    // const user = useSelector((state) => state.user);
    const token = localStorage.getItem("token")
    let location = useLocation();

    if(!token) {
        return <Navigate to="/" state={{ from: location}} replace />
    }
 return children
}
export default Protected