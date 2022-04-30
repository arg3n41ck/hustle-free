import React from "react"
import { useDispatch } from "react-redux"
import $api from "../../services/axios"
import { fetchCountries } from "../../redux/components/countriesAndCities"
import { useRouter } from "next/router"
import { useCookies } from "react-cookie"

const InputData = ({ query }) => {
  const [cookies, setCookie] = useCookies(["token", "refresh", "email"])
  const dispatch = useDispatch()
  const router = useRouter()

  const activationUser = async (uid, token) => {
    const { data } = await $api.post("/accounts/auth/users/activation/", {
      uid,
      token,
    })
    setCookie("token", data.access, { path: "/" })
    setCookie("refresh", data.refresh, { path: "/" })
    setCookie("email", data.email, { path: "/" })
    router.push(data.role)
  }

  React.useEffect(async () => {
    await activationUser(query?.uid, query?.token)
    dispatch(fetchCountries())
  }, [])

  return <div></div>
}

export default InputData

export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  }
}
