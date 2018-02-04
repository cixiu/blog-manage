import * as React from 'react'
import ReactQuill, {
  ComponentProps as ReactQuillProps,
  UnprivilegedEditor
} from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './editor.scss'

export { UnprivilegedEditor }
interface IProps {
  // 是否回填数据
  backfill?: boolean
  value: string
  onChange(content: string, editor: UnprivilegedEditor): void
}

class Editor extends React.Component<IProps, {}> {
  reactQuillRef: ReactQuill

  modules = {
    toolbar: [
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
    ]
  }

  formats = [
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

  componentDidMount() {
    if (this.props.backfill) {
      this.setState(
        {
          text: '<h1>数据回填</h1>'
        },
        () => {
          this.reactQuillRef.blur()
        }
      )
    }
  }
  componentDidUpdate() {
    console.log(this.reactQuillRef.getEditor().getText())
  }

  handleChange: ReactQuillProps['onChange'] = (
    content,
    deleta,
    source,
    editor
  ) => {
    this.props.onChange(content, editor)
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        placeholder="请输入内容"
        value={this.props.value}
        onChange={this.handleChange}
        modules={this.modules}
        formats={this.formats}
        ref={el => (this.reactQuillRef = el as ReactQuill)}
      />
    )
  }
}

export default Editor
