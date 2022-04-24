import React from "react"
import { FormControl, MenuItem, Select } from "@mui/material"
import styled from "styled-components"

function HeaderLocalizationPopover() {
  const [localization, setLocalization] = React.useState("ru")
  return (
    <Localization>
      <LocalizationSelect
        value={localization}
        onChange={setLocalization}
        className="HeaderLocalization"
      >
        <MenuItem value={"ru"}>RU</MenuItem>
      </LocalizationSelect>
    </Localization>
  )
}

const Localization = styled(FormControl)`
  min-width: 72px;
`

const LocalizationSelect = styled(Select)`
  border-radius: 8px !important;
  color: #828282;
  height: 44px;
`

export default HeaderLocalizationPopover
