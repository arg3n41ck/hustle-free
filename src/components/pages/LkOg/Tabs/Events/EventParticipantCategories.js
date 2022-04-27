import React, { useCallback, useEffect, useMemo, useState } from "react"
import { useFormik } from "formik"
import * as yup from "yup"
import { useRouter } from "next/router"
import { Cancel, EventFormFooter, Field, Form, Submit } from "./EventDefaults"
import styled from "styled-components"
import ParticipantCategoriesCreate from "./ParticipantCategories/ParticipantCategoriesCreate"
import Table from "../../../../ui/Table/Table"
import {
  Autocomplete,
  Checkbox,
  Collapse,
  MenuItem,
  Select,
  TextField,
} from "@mui/material"
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import ParticipantCategoriesEdit from "./ParticipantCategories/ParticipantCategoriesEdit"
import EventParticipantCategoriesTableCollapseHead from "./EventParticipantCategoriesTableCollapseHead"

const emptyInitialValues = {
  level: [],
}

const getGender = (gender) => (gender === "male" ? "М" : "Ж")

const createDataForTable = (defaultData = []) => {
  return defaultData.map((currentValue) => {
    const {
      fromAge,
      fromWeight,
      gender,
      id,
      levels,
      name,
      price,
      toAge,
      toWeight,
    } = currentValue
    return {
      id,
      name,
      level: levels?.length || 0,
      gender: getGender(gender),
      age: `${fromAge} - ${toAge}`,
      weight: `${fromWeight} кг - ${toWeight} кг`,
      price,
    }
  })
}

function EventParticipantCategories({ refreshPC, manualEventPC, eventId }) {
  const [participantCategories, setParticipantCategories] = useState([])
  const [openPCM, setOpenPCM] = useState(false)
  const [openPCME, setOpenPCME] = useState({ id: "", step: "" })
  const [selectedRows, setSelectedRows] = useState([])
  const [selectedInTableRows, setSelectedInTableRows] = useState([])
  const { handleSubmit, isValid } = useFormik({
    initialValues: emptyInitialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
    },
  })
  const { push: routerPush } = useRouter()

  useEffect(() => {
    manualEventPC.length &&
      setParticipantCategories(createDataForTable(manualEventPC))
  }, [manualEventPC])

  const columns = useMemo(() => {
    return [
      {
        column: "Категории",
        accessor: "name",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "name" }),
      },
      {
        column: "Уровни",
        accessor: "level",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "levels" }),
      },
      {
        column: "Пол",
        accessor: "gender",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "gender" }),
      },
      {
        column: "Возраст",
        accessor: "age",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "age" }),
      },
      {
        column: "Вес",
        accessor: "weight",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "weight" }),
      },
      {
        column: "Цена",
        accessor: "price",
        onClick: (rowId) => setOpenPCME({ id: rowId, step: "price" }),
      },
    ]
  }, [])

  const onClickChangeSomeRows = (value) => {
    console.log(value)
  }
  const onCreateNewPC = useCallback(() => {
    refreshPC()
  }, [manualEventPC])

  const onSelectManual = useCallback((values) => {

  }, [])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field>
          <p className="auth-title__input">Выберите категории</p>
          <Autocomplete
            multiple
            options={participantCategories}
            sx={{
              "& .MuiOutlinedInput-root": {
                padding: 0,

                "& input": {
                  padding: "0 20px !important",
                },
              },
            }}
            disableCloseOnSelect
            fullWidth
            getOptionLabel={(option) => option.name}
            value={selectedRows}
            onChange={(_, value) => onSelectManual(value)}
            renderOption={(props, option, { selected }) => (
              <li
                key={`EventParticipantCategories_autocomplete_list_${option.id}`}
                {...props}
              >
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.name}
              </li>
            )}
            renderInput={(params) => {
              const {
                InputProps: { startAdornment, ...inputRest },
                ...rest
              } = params
              return (
                <TextField
                  {...rest}
                  InputProps={inputRest}
                  placeholder="Категории"
                />
              )
            }}
          />
        </Field>

        <TableWrapper>
          <Collapse in={!!selectedInTableRows?.length}>
            <EventParticipantCategoriesTableCollapseHead
              onClickChangeSomeRows={onClickChangeSomeRows}
              selectedInTableRows={selectedInTableRows}
              selectedRows={selectedRows}
              setSelectedInTableRows={setSelectedInTableRows}
              setSelectedRows={setSelectedRows}
            />
          </Collapse>
          <Table
            columns={columns}
            select
            onSelect={(values) => setSelectedInTableRows(values)}
            selectedRows={selectedInTableRows}
            data={selectedRows}
          />
        </TableWrapper>

        <EventFormFooter>
          <OpenPCM onClick={() => setOpenPCM(true)}>
            + Добавить новую категорию
          </OpenPCM>
          <Cancel onClick={() => routerPush("/lk-og/profile/events")}>
            Отмена
          </Cancel>
          <Submit disabled={!isValid} type="submit">
            Далее
          </Submit>
        </EventFormFooter>
      </Form>
      <ParticipantCategoriesCreate
        open={openPCM}
        eventId={eventId}
        onCloseModals={() => setOpenPCM(false)}
        onCreatePC={(newPC) => onCreateNewPC(newPC)}
      />
      <ParticipantCategoriesEdit
        id={openPCME.id}
        open={!!(openPCME.id && openPCME.step)}
        step={openPCME.step}
        onCloseModals={() => setOpenPCME({ id: "", step: "" })}
      />
    </>
  )
}

export default EventParticipantCategories

export const icon = <CheckBoxOutlineBlank fontSize="small" />
export const checkedIcon = <CheckBox fontSize="small" />

const validationSchema = yup.object({})

const TableWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  margin: 0 -32px;
  border-top: 1px solid #333;
  border-bottom: 1px solid #333;
`

const OpenPCM = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #6d4eea;
  margin: 0 auto 0 0;
  cursor: pointer;
`
