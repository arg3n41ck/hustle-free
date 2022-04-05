import React, { useState } from "react"
import Authorization from "../components/pages/Authorization/Authorization"
import Recover from "../components/pages/Authorization/Recover"
import NewPassword from "../components/pages/Authorization/NewPassword"
import { useCookies } from "react-cookie"
import { useRouter } from "next/router"
import { Head } from "next/document"

const Login = () => {
  const [view, setView] = useState("login") // login | recover | newPassword
  // const router = useRouter()
  // const [cookies] = useCookies(["token"])
  //
  // React.useEffect(() => {
  //   if (!cookies.token) router.push("/")
  // }, [cookies.token])

  const viewHandler = (value) => {
    setView(value)
  }

  return (
    <>
      {(view === "login" && <Authorization onView={viewHandler}/>) ||
      (view === "recover" && <Recover onView={viewHandler}/>)}
      {/* || (view === "newPassword" && <NewPassword />)}*/}
    </>
  )
}

export default Login
