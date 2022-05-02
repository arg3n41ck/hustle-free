import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import styled from "styled-components"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "#1b1c22",
  border: "1px solid #333333",
  boxShadow: "0px 0px 60px rgba(0, 0, 0, 0.5)",
  borderRadius: "16px",
  maxWidth: 688,
}

export default function ApplicationSuccessfullySent({ open, setOpen }) {
  return (
    <div>
      <Modal
        sx={{ margin: "0 24px" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <ApplicationSuccessfullySentHeadingText>
            Оставить заявку
          </ApplicationSuccessfullySentHeadingText>
          <Line />
          <ApplicationSuccessfullySentHero>
            <ApplicationSuccessfullySentHeadingText>
              Ваша заявка успешно отправлена
            </ApplicationSuccessfullySentHeadingText>
          </ApplicationSuccessfullySentHero>
        </Box>
      </Modal>
    </div>
  )
}

const ApplicationSuccessfullySentHeadingText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
  padding: 24px;
`

const Line = styled.div`
  border: 1px solid #333333;
`

const ApplicationSuccessfullySentHero = styled.div`
  height: 284px;
  display: flex;
  align-items: center;
  justify-content: center;
`
