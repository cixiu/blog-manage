import axios from 'axios'
import { message } from 'antd'
// import Delta from 'quill-delta'
// import * as Quill from 'quill'

export const modules = (ref: any) => {
  return {
    syntax: true,
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', 'code'], // toggled buttons
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
          ) as HTMLInputElement
          if (fileInput === null) {
            fileInput = document.createElement('input')
            fileInput.setAttribute('type', 'file')
            fileInput.setAttribute(
              'accept',
              'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
            )
            fileInput.classList.add('ql-image')
            fileInput.addEventListener('change', async () => {
              if (fileInput.files !== null && fileInput.files[0] !== null) {
                const imageType = fileInput.files[0].type.split('/')[1]
                const formData = new FormData()
                formData.append('image', fileInput.files[0])
                const hide = message.loading('图片正在上传···', 0)
                const res = await axios.post('/api/admin/upload', formData)
                // 图片上传失败的反馈
                if (res.data.code === 1) {
                  message.error(res.data.message)
                }
                if (res.data.code === 0) {
                  let url = res.data.image.url
                  // 如果上传的时gif图片 则返回图片瘦身的url
                  if (imageType.toUpperCase() === 'GIF') {
                    // gif图片采用图片瘦身imageslim样式
                    const imageslim = '?imageslim'
                    url += imageslim
                  } else {
                    // 否则返回的限定缩略图的长边最多为1280，短边最多为960，进行等比缩放，不裁剪的url
                    const imageViewUncut =
                      '?imageView2/0/w/1280/h/960/format/webp/ignore-error/1'
                    url += imageViewUncut
                  }
                  const range = This.getSelection(true)
                  This.insertEmbed(range.index, 'image', url)
                  This.setSelection(range.index + 1, 'silent')
                }
                // 无论最后上传是否成功 都要将提示信息隐藏
                hide()
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
  'code',
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
