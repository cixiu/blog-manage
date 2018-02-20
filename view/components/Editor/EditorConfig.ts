import axios from 'axios'
// import Delta from 'quill-delta'
// import * as Quill from 'quill'

export const modules = (ref: any) => {
  return {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: () => {
          const This: any = ref.getEditor()
          let fileInput = This.container.previousElementSibling.querySelector(
            'input.ql-image[type=file]'
          )
          if (fileInput === null) {
            fileInput = document.createElement('input')
            fileInput.setAttribute('type', 'file')
            fileInput.setAttribute(
              'accept',
              'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
            )
            fileInput.classList.add('ql-image')
            fileInput.addEventListener('change', () => {
              if (fileInput.files !== null && fileInput.files[0] !== null) {
                const formData = new FormData()
                formData.append('image', fileInput.files[0])
                axios
                  .post('/api/admin/upload', formData)
                  .then((res: any) => {
                    if (res.data.code === 0) {
                      const range = This.getSelection(true)
                      This.insertEmbed(
                        range.index,
                        'image',
                        res.data.image.url
                      )
                      This.setSelection(range.index + 1, 'silent')
                    } else {
                      console.error(res.data)
                    }
                  })
                  .catch(err => {
                    console.error(err)
                  })
              }
            })
            This.container.previousElementSibling.appendChild(fileInput)
          }
          fileInput.click()
        }
      }
    }
  }
}

export const formats = [
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'header',
  'list',
  'script',
  'indent',
  'direction',
  'size',
  'color',
  'background',
  'font',
  'align',
  'link',
  'image',
  'video'
]

export type modules = typeof modules
export type formats = typeof formats
