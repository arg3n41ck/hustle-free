import { useEffect } from "react"
import { useCookies } from "react-cookie"
import { useRouter } from "next/router"

// temporary redirect
export const getServerSideProps = async (ctx) => {
  return {
    redirect: {
      destination: "/profile",
      statusCode: 302,
    },
  }
}

export default function Home() {
  const router = useRouter()
  const [cookies] = useCookies(["token", "refresh"])

  useEffect(async () => {
    if (!cookies.token) {
      await router.push("/login")
    }
  }, [cookies])

  return (
    <div>
      <h1>home</h1>
    </div>
  )
}
