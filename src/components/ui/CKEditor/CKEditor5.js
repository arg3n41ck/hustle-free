import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'

const CKEditor5 = ({ defaultValue, onChange }) => {
  const editorRef = useRef()
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
  }, [])

  return (
    <>
      {!!editorRef?.current && (
        <CKWrapper>
          <CKEditor
            editor={ClassicEditor}
            data={defaultValue || ''}
            config={{
              toolbar: [
                'title',
                'heading',
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                'blockQuote',
              ],
            }}
            // onReady={(editor) => {
            //   // You can store the "editor" and use when it is needed.
            //   console.log('Editor is ready to use!', editor)
            // }}
            onChange={(event, editor) => {
              const data = editor.getData()
              onChange && onChange(data)
            }}
            // ?? https://dev.to/devzversity/how-to-add-ckeditor5-in-your-next-js-react-app-1be7
            // onBlur={(event, editor) => {
            //   console.log('Blur.', editor)
            // }}
            // onFocus={(event, editor) => {
            //   console.log('Focus.', editor)
            // }}
          />
        </CKWrapper>
      )}
    </>
  )
}

export default CKEditor5

export const CKWrapper = styled.div`
  display: flex;
  min-height: 250px;

  .ck-editor {
    width: 100% !important;

    .ck-editor__main {
      height: calc(100% - 45px);

      .ck-content {
        height: 100%;
      }
    }

    .ck-input-text {
      outline: none !important;
    }

    .ck-focused:not(.ck-editor__nested-editable) {
      border: 1px solid var(--ck-focus-ring) !important;
    }
  }
`
