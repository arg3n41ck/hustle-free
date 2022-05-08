import React, { useCallback, useRef, useState } from "react"
import { Checkbox, TextField } from "@mui/material"
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material"
import styled from "styled-components"
import useClickOutside from "../../../../../../hooks/useClickOutside"

function EventParticipantAutocomplete({ onSelectManual, manualEventPC }) {
  const [selectedItems, setSelectedItems] = useState([])
  const [searchResult, setSearchResult] = useState("")
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  useClickOutside(wrapperRef, () => {
    setOpen(false)
  })

  const selectAll = useCallback(
    ({ target: { checked } }) => {
      checked
        ? setSelectedItems(manualEventPC.map(({ id }) => id))
        : setSelectedItems([])
    },
    [manualEventPC]
  )
  const selectOne = useCallback(
    (checked, id) => {
      checked
        ? setSelectedItems((s) => [...s, id])
        : setSelectedItems((s) => s.filter((_id) => _id !== id))
    },
    [manualEventPC]
  )

  const handleOnSubmit = useCallback(() => {
    const selectedValues = manualEventPC.filter(({ id }) =>
      selectedItems.includes(id)
    )
    onSelectManual(selectedValues)
    setSelectedItems([])
    setOpen(false)
  }, [selectedItems, manualEventPC])

  return (
    <>
      <MainWrapper ref={wrapperRef}>
        <p className="auth-title__input">Выберите категории</p>
        <TextField
          fullWidth
          onChange={({ target: { value } }) =>
            setSearchResult(value.replace(" ", ""))
          }
          onClick={() => setOpen(true)}
          placeholder="Категории"
        />
        {!!open && (
          <ResultWrapper>
            <ContentHead>
              <SelectAllWrapper>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  checked={
                    selectedItems.length &&
                    selectedItems.length === manualEventPC?.length
                  }
                  onChange={selectAll}
                />
                <span>Выбрать все</span>
              </SelectAllWrapper>
              <CancelSelect type="button">Сбросить</CancelSelect>
            </ContentHead>
            <Items>
              {manualEventPC
                .filter(
                  ({ name }) =>
                    name.replace(" ", "").toLowerCase().indexOf(searchResult) >=
                    0
                )
                .map(({ name, id }, i) => (
                  <Item key={`${id}-selectedItems_${i}`}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      checked={selectedItems.includes(id)}
                      onChange={({ target: { checked } }) =>
                        selectOne(checked, id)
                      }
                    />
                    <span>{name}</span>
                  </Item>
                ))}
            </Items>
            <Footer>
              <CloseModal type="button" onClick={() => setOpen(false)}>
                Отмена
              </CloseModal>
              <Submit type="button" onClick={handleOnSubmit}>
                Применить
              </Submit>
            </Footer>
          </ResultWrapper>
        )}
      </MainWrapper>
    </>
  )
}

export default EventParticipantAutocomplete

export const icon = <CheckBoxOutlineBlank />
export const checkedIcon = <CheckBox />

const MainWrapper = styled.div`
  position: relative;
`

const ResultWrapper = styled.div`
  position: absolute;
  top: 116px;
  background: #1b1c22;
  border: 1px solid #333;
  display: grid;
  grid-template: 80px auto 80px / minmax(100%, 560px);
  z-index: 4;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
`

const ContentHead = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  border-bottom: 1px solid #333333;
`

const SelectAllWrapper = styled.div`
  grid-column-gap: 16px;
  display: flex;
  align-items: center;

  span {
    font-size: 18px;
    line-height: 32px;
    color: #f2f2f2;
  }
`

const CancelSelect = styled.button`
  font-size: 18px;
  line-height: 32px;
  color: #6d4eea; ;
`

const Items = styled.div`
  display: flex;
  flex-direction: column;
  grid-row-gap: 16px;
  padding: 24px;
`

const Item = styled.div`
  display: flex;
  align-items: center;
  grid-column-gap: 16px;
`

const Footer = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr;
  grid-column-gap: 16px;
  align-items: center;
  padding: 16px 0;
`

const CloseModal = styled.button`
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
`

const Submit = styled.button`
  width: 100%;
  height: 100%;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
`
