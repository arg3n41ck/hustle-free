import React from "react"
import styled from "styled-components"
import { Box } from "@mui/material"

function FileUploaderBig({
                           startupID,
                           open,
                           handleClose,
                           galleryUpdated,
                           updateGallery,
                           deleteImage,
                         }) {
  //TODO доработать СГЕЙН
  return (
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
  )
}

export default FileUploaderBig

const ErrorMessage = styled.p`
  color: #eb5757;
  font-family: Inter, sans-serif;
  font-size: 14px;
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
