import React, { useState } from "react"
import Authorization from "../components/pages/Authorization/Authorization"
import Recover from "../components/pages/Authorization/Recover"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { selectIsUserAuth } from "../redux/components/user"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

const Login = () => {
  const [view, setView] = useState("login")
  const router = useRouter()
  const [userAuthenticated] = useSelector(selectIsUserAuth)

  if (userAuthenticated) {
    router.push("/")
  }

  const viewHandler = (value) => {
    setView(value)
  }

  return (
    <>
      {(view === "login" && <Authorization onView={viewHandler} />) ||
        (view === "recover" && <Recover onView={viewHandler} />)}
    </>
  )
}

export default Login

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "common", "footer"])),
  },
})
