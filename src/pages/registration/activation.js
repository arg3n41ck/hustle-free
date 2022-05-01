import React from "react"
import { useDispatch } from "react-redux"
import $api from "../../services/axios"
import { fetchCountries } from "../../redux/components/countriesAndCities"
import { useRouter } from "next/router"
import { setCookie } from "../../services/JWTService"

const InputData = ({ query }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const activationUser = async (uid, token) => {
    const { data } = await $api.post("/accounts/auth/users/activation/", {
      uid,
      token,
    })
    setCookie("token", data.access, 999)
    setCookie("refresh", data.refresh, 99999)
    setCookie("email", data.email, 99999)
    await router.push(data.role)
  }

  React.useEffect(async () => {
    await activationUser(query?.uid, query?.token)
    dispatch(fetchCountries())
  }, [])

  return <></>
}

export default InputData

export async function getServerSideProps(context) {
  return {
    props: { query: context.query }, // will be passed to the page component as props
  }
}
