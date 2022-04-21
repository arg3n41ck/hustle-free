import { useSelector } from "react-redux"
import MainPage from "../components/pages/MainPage/MainPage"
import MainPageForNotAuthUser from "../components/pages/MainPageForNotAuthUser/MainPageForNotAuthUser"

export default function Home() {
  const { user } = useSelector((state) => state.user)

  return !!user?.id ? <MainPage /> : <MainPageForNotAuthUser />
}
