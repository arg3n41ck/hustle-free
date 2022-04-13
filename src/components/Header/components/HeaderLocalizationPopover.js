import React from "react"
import { FormControl, MenuItem, Select } from "@mui/material"
import styled from "styled-components"

function HeaderLocalizationPopover() {
  const [localization, setLocalization] = React.useState("ru")
  return (
    <Localization>
      <LocalizationSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={localization}
        label="Age"
        onChange={setLocalization}
      >
        <MenuItem value={"ru"}>RU</MenuItem>
        <MenuItem value={"en"}>EN</MenuItem>
        <MenuItem value={"kz"}>KZ</MenuItem>
      </LocalizationSelect>
    </Localization>
  )
}

const Localization = styled(FormControl)`
  min-width: 72px;
`

const LocalizationSelect = styled(Select)`
  border: 1px solid #333333;
  border-radius: 8px;
  color: #828282;
  height: 44px;
`

export default HeaderLocalizationPopover
