import { Avatar, Box, Modal, TextField } from "@mui/material"
import StatusUserSelect from "../../../ui/tabs/StatusUserSelect"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import $api from "../../../../services/axios"
import { toast } from "react-toastify"

const variants = {
  open: { display: "flex" },
  closed: { display: "none" },
}

const addTeamMembers = async (_data) => {
  try {
    const { data } = await $api.post("/startup/team_members/", _data)
    toast.success("Вы успешно добавили сотрудника")
    return data
  } catch (e) {
    console.log(e)
  }
}

export default function TeamMemberAddModal({
  open,
  handleClose,
  startupID,
  updateAllMembers,
  allTeamMembersId,
  startupTeamMembers,
  currentUserId,
  startupOwner,
}) {
  const [addUserStatus, setAddUserStatus] = useState("A")
  const [searchUser, setSearchUser] = useState("")
  const [currentUsers, setCurrentUsers] = useState([])
  const [isOpenUsersPopper, setIsOpenUsersPopper] = useState(false)
  const resultsRef = useRef()

  const addUserToTeamMembers = () => {
    toast.info("Ожидайте ответа от сервера", { autoClose: 6000 })
    if (!!currentUsers.length) {
      currentUsers.forEach(({ id }) => {
        addTeamMembers({
          startup: startupID,
          user: id,
          statusInTeam: addUserStatus,
          accept: true,
        }).then(() => {
          updateAllMembers()
          setIsOpenUsersPopper(false)
          handleClose()
        })
      })
    } else {
      toast.warning("Вы не выбрали сотрудника")
    }
  }

  const currentUsersHandler = (newUser) => {
    const filteredUsersState = currentUsers?.length
      ? [...currentUsers.filter(({ id }) => id !== newUser.id), newUser]
      : [newUser]
    setCurrentUsers(filteredUsersState)
  }

  const toggleUsersPopperHandler = (valueBoolean) => {
    setIsOpenUsersPopper(valueBoolean)
  }

  useEffect(() => {
    window.addEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setIsOpenUsersPopper(false)
      }
    })

    return window.removeEventListener("click", (event) => {
      const { current: wrap } = resultsRef
      if (wrap && !wrap.contains(event.target)) {
        setIsOpenUsersPopper(false)
      }
    })
  }, [])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <ModalContentWrapper>
        <div style={{ width: "100%" }}>
          <Title style={{ fontWeight: 600, marginBottom: 16 }}>
            Участники{" "}
            <Box component={"span"} sx={{ color: "#27AE60" }}>
              JAS
            </Box>
          </Title>
          <Label>Добавление участника</Label>
          <TeamMembersAdd ref={resultsRef}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexGrow: 1,
              }}
            >
              <UsersSearchWrapper
                animate={isOpenUsersPopper ? "open" : "closed"}
                variants={variants}
                acitve={!!isOpenUsersPopper}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleUsersPopperHandler(false)
                }}
              >
                <UsersSearch
                  searchValue={searchUser}
                  allTeamMembersId={[
                    currentUserId,
                    startupOwner,
                    ...allTeamMembersId,
                  ]}
                  onCurrentUser={currentUsersHandler}
                />
              </UsersSearchWrapper>
              <TextField
                autoComplete={"off"}
                onFocus={() => toggleUsersPopperHandler(true)}
                placeholder={!currentUsers?.length ? "ФИО" : null}
                onChange={(e) => setSearchUser(e.target.value)}
                value={searchUser}
                fullWidth
                sx={{
                  border: "1.5px solid rgba(0,0,0,0.23)",
                  borderRadius: "8px 0 0 8px",
                  "& .MuiOutlinedInput-root": {
                    width: "100%",
                    overflow: "auto",
                    borderTopRightRadius: 0,
                    gridGap: "5px",
                    borderBottomRightRadius: 0,

                    "& > fieldset": {
                      borderWidth: 0,
                      display: "none",
                    },
                  },
                }}
                InputProps={{
                  startAdornment: !!currentUsers?.length ? (
                    <>
                      {currentUsers.map((user) => {
                        return (
                          <CurrentUserInfo>
                            <p>{`${user?.firstName} ${user?.lastName}`}</p>
                            <Box
                              onClick={() => {
                                setCurrentUsers((s) =>
                                  s.filter(({ id }) => id !== user.id)
                                )
                              }}
                              sx={{
                                width: 20,
                                height: 20,
                                margin: "0 5px",
                                cursor: "pointer",
                              }}
                            >
                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M18 6L6 18"
                                  stroke="#333333"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 6L18 18"
                                  stroke="#333333"
                                  strokeLinecap="square"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </Box>
                          </CurrentUserInfo>
                        )
                      })}
                    </>
                  ) : null,
                }}
              />
              <StatusUserSelectWrapper>
                <StatusUserSelect
                  state={addUserStatus}
                  setState={setAddUserStatus}
                  type={"base"}
                />
              </StatusUserSelectWrapper>
            </Box>
            <AddUserButton
              onClick={addUserToTeamMembers}
              active={currentUsers?.length}
              type={"button"}
            >
              Добавить
            </AddUserButton>
          </TeamMembersAdd>
        </div>
      </ModalContentWrapper>
    </Modal>
  )
}

const ModalContentWrapper = styled.div`
  height: min-content;
  position: absolute;
  max-width: 832px;
  width: 100%;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  background: #fff;
  padding: 32px;
`

const Title = styled.h3`
  font-family: Inter, sans-serif;
  font-style: normal;
  font-weight: bold;
  font-size: 24px;
  line-height: 20px;
  color: #333333;
`

const Label = styled.p`
  font-size: 18px;
  color: #333333;
  margin: 0 0 12px;
`

const UsersSearchWrapper = styled(motion.div)`
  width: 100%;
  height: 300px;
  position: absolute;
  bottom: -310px;
  overflow-y: scroll;
  background: #fff;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  grid-gap: 8px;
  flex-direction: column;
  pointer-events: ${(p) => (!p.active ? "all" : "none")};
  z-index: 999;
`
const TeamMembersAdd = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc(100% - 214px) 190px;
  grid-gap: 24px;
`
const AddUserButton = styled.button`
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  border-radius: 12px;
  padding: 15px 32px;
  color: #${(p) => (p.active ? "fff" : "828282")};
  background: #${(p) => (p.active ? "27AE60" : "F2F2F2")};
`
const StatusUserSelectWrapper = styled.div`
  border: 1.5px solid #e5e5e5;
  border-left: none;
  display: flex;
  border-radius: 0 8px 8px 0;
`
const CurrentUserInfo = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #333333;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
`

const UsersSearch = ({ searchValue, onCurrentUser, allTeamMembersId }) => {
  const [users, setUsers] = useState([])
  useEffect(async () => {
    const { data } = await $api.get("/accounts/team_users/")
    setUsers(data.results)
  }, [])

  if (!users.length) return null

  return (
    <>
      {users
        .filter((user) => {
          return !allTeamMembersId.includes(user.id)
        })
        .filter((user) => {
          if (!searchValue.length) return user
          return (
            `${user.firstName?.toLowerCase()} ${user.lastName?.toLowerCase()}`.indexOf(
              searchValue.toLowerCase()
            ) > -1
          )
        })
        .map((user) => (
          <div onClick={() => onCurrentUser(user)}>
            <UsersItemSearch user={user} key={user.id} />
          </div>
        ))}
    </>
  )
}

const UsersItemSearch = ({ user }) => {
  return (
    <UserItem>
      <Avatar
        sx={{ width: 44, height: 44, marginRight: 2 }}
        alt={user.title}
        src={user.avatar}
        placeholder={"blur"}
      />
      <UserItemTexts>
        <UserItemInfo>
          {user.firstName} {user.lastName}
        </UserItemInfo>
        <UserItemProfession>{user.careers[0]?.position}</UserItemProfession>
      </UserItemTexts>
    </UserItem>
  )
}
const UserItem = styled.div`
  width: 100%;
  padding: 2px;
  margin: 2px 0;
  cursor: pointer;
  border: 1.5px solid #fff;
  border-radius: 6px;
  display: flex;
  &:hover {
    border: 1.5px solid #27ae60;
  }
`
const UserItemTexts = styled.div``
const UserItemInfo = styled.h4`
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: #333333;
`
const UserItemProfession = styled.p`
  font-size: 14px;
  line-height: 24px;
  color: #333333;
`
