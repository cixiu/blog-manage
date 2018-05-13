import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Select, Form, Input, Button, message } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Editor, { UnprivilegedEditor } from '../../components/Editor/Editor'
import PicturesWall from '../../components/PicturesWall/PicturesWall'
// import * as styles from './index.scss'
import { createArticle } from '../../api/article'

const { Option } = Select
const FormItem = Form.Item

interface IProps extends FormComponentProps, RouteComponentProps<any> {} // tslint:disable-line

class CreateArticle extends React.Component<IProps, {}> {
  state = {
    contentText: '',
    contentHTML: '',
    screenshot: '',
    tags: [
      { tag: 'html', text: 'HTML' },
      { tag: 'css', text: 'CSS' },
      { tag: 'javascript', text: 'JavaScript' },
      { tag: 'typescript', text: 'TypeScript' },
      { tag: 'es6', text: 'ES6' },
      { tag: 'react', text: 'React' },
      { tag: 'vue', text: 'Vue' },
      { tag: 'angular', text: 'Angular' },
      { tag: 'webpack', text: 'Webpack' },
      { tag: 'node', text: 'Node' },
      { tag: 'zhuanzai', text: '转载' },
      { tag: 'others', text: '其他' },
      { tag: 'test', text: '测试' }
    ]
  }

  handleChange = (content: string, editor: UnprivilegedEditor) => {
    this.setState({ contentHTML: content, contentText: editor.getText() })
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err && this.state.contentText.trim()) {
        const description = this.state.contentText.substring(0, 100) + '...'
        // 在这里进行post提交数据进数据库
        const data = {
          categorys: values.categorys,
          title: values.title,
          screenshot: this.state.screenshot,
          content: this.state.contentHTML,
          description
        }
        const res = await createArticle(data)
        if (res.code === 0 ) {
          message.success(res.message)
          this.props.history.push('/article_list')
        }
        if (res.code === 1) {
          message.info(res.message)
        }
      }
    })
  }

  getScreenShot = (url: string) => {
    this.setState({
      screenshot: url
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { contentText, contentHTML } = this.state
    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 17 }
    }
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="文章标签" hasFeedback>
            {getFieldDecorator('categorys', {
              rules: [
                {
                  required: true,
                  message: '请至少选择一个文章的标签',
                  type: 'array',
                }
              ]
            })(
              <Select mode="multiple" placeholder="请至少选择一个文章的标签">
                {this.state.tags.map(item => (
                  <Option key={item.tag} value={item.tag}>
                    {item.text}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="文章标题" hasFeedback>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: '文章标题不能为空！'
                }
              ]
            })(<Input placeholder="请输入文章标题" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="文章封面">
            <PicturesWall getScreenShot={this.getScreenShot}/>
          </FormItem>
          <FormItem
            className="has-error"
            {...formItemLayout}
            label="文章内容"
            required
            help={!contentText.trim() && '文章内容不能为空'}
          >
            <Editor value={contentHTML} onChange={this.handleChange} />
          </FormItem>
          <FormItem wrapperCol={{ span: 12, offset: 12 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(CreateArticle)
