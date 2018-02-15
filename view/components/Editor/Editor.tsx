import * as React from 'react'
import ReactQuill, {
  ComponentProps as ReactQuillProps,
  UnprivilegedEditor
} from 'react-quill'
import { modules, formats } from './EditorConfig'

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
    console.log(this.reactQuillRef.getEditor())
  }

  handleChange: ReactQuillProps['onChange'] = (
    content,
    deleta,
    source,
    editor
  ) => {
    this.props.onChange(content, editor)
  }

  imageHander = (image: any, cb: any) => {
    console.log(image)
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        placeholder="请输入内容"
        value={this.props.value}
        onChange={this.handleChange}
        modules={modules}
        formats={formats}
        // imageHander={this.imageHander}
        ref={el => (this.reactQuillRef = el as ReactQuill)}
      />
    )
  }
}

export default Editor
