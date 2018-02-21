import * as React from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { UploadFile, UploadChangeParam, UploadFileStatus } from 'antd/lib/upload/interface'

interface IState {
  previewVisible: boolean
  previewImage: string | undefined
  fileList: UploadFile[]
}
interface IProps {
  getScreenShot: (url: string) => void
  backfill?: boolean
  url?: string
}

class PicturesWall extends React.Component<IProps, IState> {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: []
  }

  componentWillReceiveProps() {
    const { backfill, url } = this.props
    if (backfill && url) {
      const file = {
        uid: 1,
        name: '',
        status: 'done' as UploadFileStatus,
        size: 0,
        type: '',
        url
      }
      this.setState({
        fileList: [file]
      })
    }
  }

  handleCancel = () => {
    this.setState({ previewVisible: false })
  }

  handlePreview = (file: UploadFile) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    })
  }

  handleChange = ({ file, fileList }: UploadChangeParam) => {
    if (file.status === 'done' && file.response && file.response.code === 0) {
      fileList[0].url = file.response.image.url
      fileList[0].thumbUrl = file.response.image.url
      this.props.getScreenShot(file.response.image.url)
      message.success('图片上传成功')
    } else if (file.status === 'done' && file.response && file.response.code !== 0) {
      fileList = []
      message.error('图片上传失败，请重新上传!!')
    }
    this.setState({ fileList })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div>上传封面</div>
      </div>
    )
    return (
      <div className="clearfix">
        <Upload
          action="/api/admin/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}

export default PicturesWall
