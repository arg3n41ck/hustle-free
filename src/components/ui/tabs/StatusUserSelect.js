import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Box, Popper } from "@mui/material"

const StatusUserSelect = ({
  id,
  state,
  setState,
  onDelete,
  minWidth = false,
}) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const resultsRef = useRef()
  const optionsRef = useRef([
    { enum: "A", fullValue: "Администратор" },
    { enum: "E", fullValue: "Сотрудник" },
  ])

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  const deleteHandler = () => {
    if (id) {
      onDelete(id)
    }
  }

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setAnchorEl(null)
      }
    })

    return window.removeEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setAnchorEl(null)
      }
    })
  }, [])

  return (
    <Wrapper
      aria-describedby={open ? "simple-popper" : undefined}
      minWidth={minWidth}
      onClick={handleClick}
      ref={resultsRef}
    >
      <Text>
        <p style={{ marginRight: 16 }}>
          {state === "A" ? "Администратор" : "Сотрудник"}
        </p>
        <Box sx={{ minWidth: 20 }}>
          <svg
            width="18"
            height="11"
            viewBox="0 0 18 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9L9.70711 9.70711L9 10.4142L8.29289 9.70711L9 9ZM17.7071 1.70711L9.70711 9.70711L8.29289 8.29289L16.2929 0.292892L17.7071 1.70711ZM8.29289 9.70711L0.292892 1.70711L1.70711 0.292893L9.70711 8.29289L8.29289 9.70711Z"
              fill="#828282"
            />
          </svg>
        </Box>
      </Text>
      <Popper
        id={open ? "simple-popper" : undefined}
        open={!!anchorEl}
        anchorEl={anchorEl}
        style={{ zIndex: 999999 }}
        sx={{
          border: "1px solid #e5e5e5",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gridGap: "24px",
            background: "#fff",
            minWidth: 200,
            borderRadius: 3,
            border: "1px solid #e5e5e5",
            padding: "24px",
          }}
        >
          {optionsRef.current.map((option) => (
            <Item
              active={option.enum === state}
              onClick={() => setState(option.enum)}
            >
              <Box sx={{ width: 20, height: 20, marginRight: 1 }}>
                {option.enum === state && (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 14L9 17L18 6"
                      stroke="#27AE60"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </Box>
              {option.fullValue}
            </Item>
          ))}
          {!!id && (
            <>
              <Line />
              <Item style={{ color: "#EB5757" }} onClick={deleteHandler}>
                <span style={{ marginRight: 10 }}>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 15L10 12"
                      stroke="#EB5757"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M14 15L14 12"
                      stroke="#EB5757"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M3 7H21V7C20.0681 7 19.6022 7 19.2346 7.15224C18.7446 7.35523 18.3552 7.74458 18.1522 8.23463C18 8.60218 18 9.06812 18 10V16C18 17.8856 18 18.8284 17.4142 19.4142C16.8284 20 15.8856 20 14 20H10C8.11438 20 7.17157 20 6.58579 19.4142C6 18.8284 6 17.8856 6 16V10C6 9.06812 6 8.60218 5.84776 8.23463C5.64477 7.74458 5.25542 7.35523 4.76537 7.15224C4.39782 7 3.93188 7 3 7V7Z"
                      stroke="#EB5757"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M10.0681 3.37059C10.1821 3.26427 10.4332 3.17033 10.7825 3.10332C11.1318 3.03632 11.5597 3 12 3C12.4403 3 12.8682 3.03632 13.2175 3.10332C13.5668 3.17033 13.8179 3.26427 13.9319 3.37059"
                      stroke="#EB5757"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Удалить
              </Item>
            </>
          )}
        </Box>
      </Popper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: ${({ minWidth }) => (minWidth ? "min-content" : "200px")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`
const Text = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Item = styled.p`
  height: 24px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  display: flex;
  color: #${(p) => (p.active ? "27AE60" : "333333")};
`
const Line = styled.div`
  height: 1px;
  width: 100%;
  background: #e0e0e0;
`

export default StatusUserSelect
