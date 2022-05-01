import React, { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  selectSportTypes,
  fetchSportTypes,
} from "../../../../redux/components/sportTypes"
import HorizontalTabs from "../../../ui/tabs/HorizontalTabs"
import TeamContactInfo from "./TeamContactInfo"
import TeamInfo from "./TeamInfo"
import { fetchCountries } from "../../../../redux/components/countriesAndCities"
import { toast } from "react-toastify"
import { formDataHttp } from "../../../../helpers/formDataHttp"
import { useRouter } from "next/router"

const tabs = [
  {
    value: "contactInfo",
    name: "Контактные данные",
  },
  {
    value: "info",
    name: "Информация",
  },
]

function TeamTabs() {
  const [view, setView] = React.useState("contactInfo") // contactInfo | info
  const dispatch = useDispatch()
  const [dataContactInfo, setDataContactInfo] = React.useState(null)
  const [dataInfo, setDataInfo] = React.useState(null)
  const [sportTypes] = useSelector(selectSportTypes)
  const router = useRouter()
  React.useEffect(() => {
    dispatch(fetchSportTypes())
  }, [])

  const onSubmit = useCallback(async (data) => {
    try {
      await formDataHttp(data, "accounts/team/", "post")
      toast.success("Вы успешно активировали свои учетные данные!")
      router.push("/login")
    } catch (e) {
      console.log(e.response)
      toast.error("Что-то пошло не так!")
    }
  }, [])

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h3 className="auth-title">Регистрация</h3>
        <p className="auth-description">
          Заполните данные, чтобы создать профиль команды.
        </p>
        <HorizontalTabs
          arrayTab={tabs}
          valueTab={view}
          onChangeHandler={setView}
        >
          {view === "contactInfo" && (
            <TeamContactInfo
              data={dataContactInfo}
              setData={setDataContactInfo}
              setView={setView}
            />
          )}
          {view === "info" && (
            <TeamInfo
              dataPersonal={dataContactInfo}
              data={dataInfo}
              sportTypes={sportTypes}
              setDataInfo={setDataInfo}
              onSubmit={onSubmit}
            />
          )}
        </HorizontalTabs>
      </div>
    </div>
  )
}

export default TeamTabs
