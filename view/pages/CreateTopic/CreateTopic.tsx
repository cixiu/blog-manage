import * as React from 'react'
import { Select, Form, Input, Button } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import Editor, { UnprivilegedEditor } from '../../components/Editor/Editor'
// import * as styles from './index.scss'

const { Option } = Select
const FormItem = Form.Item

interface IProps extends FormComponentProps {} // tslint:disable-line

class CreateTopic extends React.Component<IProps, {}> {
  state = {
    contentText: '',
    contentHTML: '',
    tags: [
      'html',
      'css',
      'javascript',
      'typescript',
      'es6',
      'react',
      'vue',
      'ssr',
      'webpack',
      'node',
      'express',
      'koa'
    ]
  }

  handleChange = (content: string, editor: UnprivilegedEditor) => {
    this.setState({ contentHTML: content, contentText: editor.getText() })
  }

  handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err && this.state.contentText.trim()) {
        // 在这里进行post提交数据进数据库
        console.log('Received values of form: ', values)
      }
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
            {getFieldDecorator('select-multiple', {
              rules: [
                {
                  required: true,
                  message: '请至少选择一个文章的标签',
                  type: 'array'
                }
              ]
            })(
              <Select mode="multiple" placeholder="请至少选择一个文章的标签">
                {this.state.tags.map(item => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="文章标题" hasFeedback>
            {getFieldDecorator('topic-title', {
              rules: [
                {
                  required: true,
                  message: '文章标题不能为空！'
                }
              ]
            })(<Input placeholder="请输入文章标题" />)}
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

export default Form.create()(CreateTopic)
