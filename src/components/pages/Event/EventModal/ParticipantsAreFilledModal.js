import * as React from "react"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import styled from "styled-components"
import ApplicationSuccessfullySent from "./ApplicationSuccessfullySent"

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
  padding: "24px",
}

export default function ParticipantsAreFilledModal({ open, setOpen }) {
  const [openApplicationSentModal, setOpenApplicationSentModal] =
    React.useState(false)

  return (
    <div>
      <Modal
        open={open}
        sx={{ margin: "0 24px" }}
        onClose={() => setOpen(false)}
      >
        <Box sx={style}>
          <ParticipantAreFilledModalHeadingText>
            Оставить заявку
          </ParticipantAreFilledModalHeadingText>
          <ParticipantAreFilledModalText>
            Лимит участников исчерпан, вы можете оставить заявку для включения в
            резерв участников
          </ParticipantAreFilledModalText>
          <ParticipantAreFilledModalBottomButtons>
            <ParticipantAreFilledModalBottomButton
              onClick={() => setOpen(false)}
            >
              Отмена
            </ParticipantAreFilledModalBottomButton>
            <ParticipantAreFilledModalBottomButtonSend
              onClick={() => [
                setOpenApplicationSentModal(true),
                setOpen(false),
              ]}
            >
              Отправить
            </ParticipantAreFilledModalBottomButtonSend>
          </ParticipantAreFilledModalBottomButtons>
        </Box>
      </Modal>
      <ApplicationSuccessfullySent
        open={openApplicationSentModal}
        setOpen={setOpenApplicationSentModal}
      />
    </div>
  )
}

const ParticipantAreFilledModal = styled(Modal)`
  background-color: #1b1c22;
  border: 1px solid #333333;
  box-shadow: 0px 0px 60px rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  padding: 24px;
  max-width: 688px;
  width: 100%;
  height: 324px;
`

const ParticipantAreFilledModalHeadingText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 32px;
  color: #f2f2f2;
`

const ParticipantAreFilledModalText = styled.p`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  color: #bdbdbd;
  margin-top: 10px;
`

const ParticipantAreFilledModalBottomButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
  margin-top: 50px;
`

const ParticipantAreFilledModalBottomButton = styled.button`
  border-radius: 16px;
  max-width: 312px;
  width: 100%;
  height: 48px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #828282;
`

const ParticipantAreFilledModalBottomButtonSend = styled.button`
  background: linear-gradient(90deg, #3f82e1 0%, #7a3fed 100%);
  border-radius: 16px;
  max-width: 312px;
  width: 100%;
  height: 48px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 32px;
  color: #ffffff;
`
