import React, { useCallback, useEffect } from "react"
import HorizontalTabs from "../../../ui/tabs/HorizontalTabs"
import OrganizerLegalData from "./OrganizerLegalData"
import OrganizerPersonalData from "./OrganizerPersonalData"
import { useDispatch } from "react-redux"
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
    value: "legalInfo",
    name: "Юридические данные",
  },
]

function OrganizerTabs() {
  const [view, setView] = React.useState("contactInfo") // contactInfo | legalInfo
  const [dataPersonal, setDataPersonal] = React.useState(null)
  const [dataLegal] = React.useState("null")
  const router = useRouter()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCountries())
  }, [])

  const onSubmit = useCallback(async (values) => {
    try {
      await formDataHttp(values, "accounts/organizer/", "post")
      toast.success("Вы успешно активировали свои учетные данные!")
      router.push("/login")
    } catch (e) {}
  }, [])

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <h3 className="auth-title">Добро пожаловать!</h3>
        <p className="auth-description">
          Создайте аккаунт, чтобы пользоваться сервисами и было проще.
        </p>
        <HorizontalTabs
          arrayTab={tabs}
          valueTab={view}
          onChangeHandler={setView}
        >
          {view === "contactInfo" && (
            <OrganizerPersonalData
              data={dataPersonal}
              setData={setDataPersonal}
              setView={setView}
            />
          )}
          {view === "legalInfo" && (
            <OrganizerLegalData
              onSubmit={onSubmit}
              dataPersonal={dataPersonal}
              data={dataLegal}
            />
          )}
        </HorizontalTabs>
      </div>
    </div>
  )
}

export default OrganizerTabs
