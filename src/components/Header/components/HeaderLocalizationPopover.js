import React  from "react"
import { FormControl, MenuItem, Select } from "@mui/material"
import styled from "styled-components"
import { useRouter } from "next/router"

function HeaderLocalizationPopover() {
  const { pathname, push, asPath, locale } = useRouter()

  const onChangeLang = async (value) => {
    typeof window !== "undefined" &&
      window.localStorage.setItem("locale", value)
    const url = pathname === asPath ? pathname : asPath
    await push(url, url, { locale: value })
  }

  return (
    <Localization>
      <LocalizationSelect
        value={locale}
        onChange={(e) => onChangeLang(e.target.value)}
        className="HeaderLocalization"
      >
        <MenuItem value={"ru"}>RU</MenuItem>
        <MenuItem value={"kz"}>KZ</MenuItem>
        <MenuItem value={"en"}>EN</MenuItem>
      </LocalizationSelect>
    </Localization>
  )
}

const Localization = styled(FormControl)`
  min-width: 72px;
`

const LocalizationSelect = styled(Select)`
  border-radius: 8px !important;
  color: #828282 !important;
  height: 44px;

  & .MuiSelect-outlined {
    padding: 0 35px 0 20px !important;
  }
`

export default HeaderLocalizationPopover
