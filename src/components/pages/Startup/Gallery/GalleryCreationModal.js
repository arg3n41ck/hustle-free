import { Box, Modal } from "@mui/material"
import styled from "styled-components"
import React, { useState } from "react"
import axios from "axios"
import { getCookie } from "../../../../services/JWTService"
import { toast } from "react-toastify"

const endpoint = process.env.NEXT_PUBLIC_API_URL

const uploadImage = async (formData) => {
  try {
    const { data } = await axios.post(
      `${endpoint}startup/galleries/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
          "Content-type": "multipart/form-data;",
        },
      }
    )
    return data
  } catch (e) {
    console.log(e)
  }
}

export default function GalleryCreationModal({
  startupID,
  open,
  handleClose,
  galleryUpdated,
  updateGallery,
  deleteImage,
}) {
  const [, setSizeError] = useState(false)
  const onDeleteImage = (fileID) => {
    deleteImage(fileID).then(() => updateGallery())
  }

  const onUploadImage = (files) => {
    setSizeError(false)
    if (files.length) {
      // toast.info("Ожидайте ответа от сервера...")
      files.forEach((file) => {
        const formData = new FormData()
        formData.append("image", file, file.name)
        formData.append("startup", startupID)
        if ((file.size / 1024 / 1024).toFixed(2) >= 4) {
          setSizeError(true)
          toast.error("Размер файла должен быть – не более 4 МБ.!", {
            autoClose: 3000,
          })
        }
        uploadImage(formData).then(() => {
          updateGallery()
          setSizeError(false)
        })
      })
      // toast.success("Загрузка изображений успешно завершено!")
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <ModalContentWrapper>
        <ModalContent>
          <h2>Добавить фотографии</h2>
          <FileUploadLabel>
            <CustomInput
              type={"file"}
              multiple
              onChange={(e) => {
                const files = [...e.target.files]
                onUploadImage(files)
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gridGap: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              <svg
                width="73"
                height="72"
                viewBox="0 0 73 72"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M68.5 60.8889V11.1111C68.5 7.2 65.3 4 61.3889 4H11.6111C7.7 4 4.5 7.2 4.5 11.1111V60.8889C4.5 64.8 7.7 68 11.6111 68H61.3889C65.3 68 68.5 64.8 68.5 60.8889ZM24.0556 41.3333L32.9444 52.0356L45.3889 36L61.3889 57.3333H11.6111L24.0556 41.3333Z"
                  fill="#BDBDBD"
                />
              </svg>
              <UploadText>
                Перетащите изображения или <span>загрузите</span>
              </UploadText>
              <UploadDescription>
                Поддерживаемые форматы: PNG, TIFF, JPG
              </UploadDescription>
              <ErrorMessage>
                Размер файла должен быть – не более 4 МБ.
              </ErrorMessage>
            </Box>
          </FileUploadLabel>

          {!!galleryUpdated?.length && (
            <ImagesList>
              {galleryUpdated.map((image) => (
                <WrapperImage
                  key={`galleryUpdated_${image.id}`}
                  src={image.image}
                >
                  <DeleteImageWrapper onClick={() => onDeleteImage(image.id)}>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 28 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="14"
                        cy="14"
                        r="11.1"
                        fill="black"
                        fillOpacity="0.5"
                        stroke="#FBFBFB"
                        strokeWidth="1.2"
                      />
                      <path
                        d="M18.6673 9.33325L9.33398 18.6666"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.33268 9.33325L18.666 18.6666"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </DeleteImageWrapper>
                </WrapperImage>
              ))}
            </ImagesList>
          )}
        </ModalContent>
      </ModalContentWrapper>
    </Modal>
  )
}

const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 832px;
  max-height: 688px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 5px;
  }
`

const ErrorMessage = styled.p`
  color: #eb5757;
  font-family: Inter, sans-serif;
  font-size: 14px;
`

const ModalContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  grid-template-rows: 32px 170px auto;
  grid-gap: 24px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 32px;

  @media (max-width: 768px) {
    padding: 8px;
  }

  h2 {
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #333333;
  }
`

const FileUploadLabel = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  border: 2px dashed #bdbdbd;
  border-radius: 8px;
  width: 100%;
  padding: 22px 0;

  font-family: Inter, sans-serif;
  font-size: 14px;

  input[type="file"] {
    opacity: 0;
    position: absolute;
    z-index: 4;
    height: 100%;
    width: 100%;
  }
  span {
    color: #27ae60;
  }
`

const CustomInput = styled.input`
  border: ${(p) => (p.error ? "1px solid #EB5757" : "1px solid #000")};
`

const UploadText = styled.p`
  text-align: center;
  color: #828282;
  max-width: 306px;
  pointer-events: none;
`

const UploadDescription = styled.p`
  color: #bdbdbd;
`

const ImagesList = styled.div`
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  grid-gap: 16px;
  overflow: auto;

  @media (max-width: 542px) {
    justify-content: space-around;
  }
`

const WrapperImage = styled.div`
  position: relative;
  width: 148px;
  height: 148px;
  background: no-repeat url(${(p) => p.src}?tr=w-148h-148) center / cover;
  border-radius: 8px;
  overflow: hidden;
`

const DeleteImageWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  img {
    background-color: #fff;
    border-radius: 50%;
  }
  span {
    border: 3px solid #fff;
  }
`
