import React, { useCallback, useMemo, useState } from "react"
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

const emptyInitialValues = {
  level: [],
}

function EventParticipantCategories() {
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

  const removeSelectedInTableRows = useCallback(() => {
    setSelectedRows((state) =>
      state.filter(({ id }) => !selectedInTableRows.includes(id))
    )
    setSelectedInTableRows([])
  }, [selectedInTableRows, selectedRows])

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Field>
          <p className="auth-title__input">Выберите категории</p>
          <Autocomplete
            multiple
            options={mock}
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
            onChange={(_, value) => setSelectedRows(value)}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
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
            <TableCollapseHead>
              <THCell>
                <ThText>
                  Выбрано {selectedInTableRows?.length} категории.{" "}
                  <span
                    onClick={() =>
                      setSelectedInTableRows(selectedRows.map(({ id }) => id))
                    }
                  >
                    Выбрать все
                  </span>
                </ThText>
              </THCell>
              <THCell>
                <Select
                  sx={{
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "none",
                    },

                    "& .MuiSelect-select": {
                      padding: "0 37px 0 20px !important",
                    },
                  }}
                  value={"none"}
                  onChange={onClickChangeSomeRows}
                >
                  <MenuItem value={"none"}>Изменить</MenuItem>
                  <MenuItem value={"levels"}>Уровни</MenuItem>
                  <MenuItem value={"gender"}>Пол</MenuItem>
                  <MenuItem value={"age"}>Возраст</MenuItem>
                  <MenuItem value={"weight"}>Вес</MenuItem>
                  <MenuItem value={"price"}>Цена</MenuItem>
                </Select>
              </THCell>

              <THCell onClick={removeSelectedInTableRows}>
                <Delete>Удалить</Delete>
              </THCell>

              <THCell>
                <THCancel onClick={() => setSelectedInTableRows([])}>
                  <XIcon /> Сбросить
                </THCancel>
              </THCell>
            </TableCollapseHead>
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
        onCloseModals={() => setOpenPCM(false)}
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

const TableCollapseHead = styled.div`
  height: 80px;
  display: grid;
  grid-template: 1fr / max-content 145px auto 150px;
  background: #0f0f10;
  padding: 0 8px;
`

const THCell = styled.div`
  height: 100%;
  width: 100%;
  padding: 0 24px;
  display: flex;
  align-items: center;
`

const ThText = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #f2f2f2;

  & span {
    color: #6d4eea;
    cursor: pointer;
  }
`

const Delete = styled.button`
  width: 100%;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #eb5757;
  padding: 5px;
  text-align: end;
`

const THCancel = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  grid-gap: 4px;

  color: #f2f2f2;
`

const XIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 5L5 15"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 5L15 15"
      stroke="#F2F2F2"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const mock = [
  {
    id: "1994_1",
    name: "The Shawshank Redemption",
    level: 5,
    gender: "M",
    age: "30-40",
    weight: "80 кг - 90 кг",
    price: "15 000 KZT",
  },
  {
    id: "1972_2",
    name: "The Godfather",
    level: 5,
    gender: "M",
    age: "30-40",
    weight: "80 кг - 90 кг",
    price: "15 000 KZT",
  },
  {
    id: "1974_3",
    name: "The Godfather: Part II",
    level: 5,
    gender: "M",
    age: "30-40",
    weight: "80 кг - 90 кг",
    price: "15 000 KZT",
  },
  {
    id: "2008_4",
    name: "The Dark Knight",
    level: 5,
    gender: "M",
    age: "30-40",
    weight: "80 кг - 90 кг",
    price: "15 000 KZT",
  },
  {
    id: "1957_5",
    name: "12 Angry Men",
    level: 5,
    gender: "M",
    age: "30-40",
    weight: "80 кг - 90 кг",
    price: "15 000 KZT",
  },
]
