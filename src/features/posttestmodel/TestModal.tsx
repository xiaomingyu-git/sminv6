import { Button, Form, Input, Modal, Row, Col, DatePicker, Select, AutoComplete } from 'antd';
import {
  hidetestModal,
  selecttestModal,
  showtestModal,
  testmodalAsync,
  setformValue
} from './testmodalSlice';
import _, { assign } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { maintableAsync, selectMaintable,changeSelectedKey } from '../maintable/maintableSlice';
import { useEffect } from 'react';
import moment from 'moment';
function TestModal() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const testmodaldata = useAppSelector(selecttestModal);
  const onModalSubmit = () => {
    form.submit();
    form.setFieldsValue({});
  };
  const options=[
    {
      value: '集团办公室',
      label: '集团办公室',
    },    {
      value: '集团保密办',
      label: '集团保密办',
    },
    {
      value: '信访办',
      label: '信访办',
    },
    {
      value: '党政督查办公室',
      label: '党政督查办公室',
    },
    {
      value: '战略规划部',
      label: '战略规划部',
    },
    {
      value: '科技发展部',
      label: '科技发展部',
    },{
      value: '科技发展部(专项办)',
      label: '科技发展部(专项办)',
    },
    {
      value: '资本运营部',
      label: '资本运营部',
    },
    {
      value: '安全环保部',
      label: '安全环保部',
    },
    {
      value: '财务部',
      label: '财务部',
    },
    {
      value: '人力资源部',
      label: '人力资源部',
    },                 {
      value: '人力资源部（党委组织部）',
      label: '人力资源部（党委组织部）',
    },
    {
      value: '管理与信息化部',
      label: '管理与信息化部',
    },
    {
      value: '审计部',
      label: '审计部',
    },
    {
      value: '法律合规部',
      label: '法律合规部',
    },
    {
      value: '纪委',
      label: '纪委',
    },
    {
      value: '工会',
      label: '工会',
    },
    {
      value: '党委宣传部',
      label: '党委宣传部',
    },
    {
      value: '机关党委',
      label: '机关党委',
    },
    {
      value: '团委',
      label: '团委',
    },
  ]
  const mainTablevalue = useAppSelector(selectMaintable);
  const { TextArea } = Input;
  const onFinish = (values: any) => {
    console.log(nextlistform)
    console.log(values)
    values.receiveTime = moment (values.receiveTime).utcOffset(480).format('YYYY-MM-DD');

    dispatch(testmodalAsync(values))
      .unwrap()
      .then(() => {
        dispatch(maintableAsync(mainTablevalue.pagination));
        dispatch(changeSelectedKey([]))
        dispatch(setformValue({
          id:'',
          docNumbers:'',
          docPages:'',
          fileCode:'',
          fileName:'',
          handleType:'',
          fileSendOffice:'',
          fileNumber:'',
          responsibleDepartment:'',
          secretariatComments:'',
          leaderComments:'',
          secrecyPeriod:'',
          receiveTime:undefined,
          deadlineTime:undefined,
          deadlineTime2:undefined,
          deadlineTime3:undefined
      }))
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const hideModal = () => {
    dispatch(hidetestModal());
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const nextlistform = {...testmodaldata.value}
  useEffect(() => {
    console.log('这里是useEffect')
    console.log(testmodaldata.value)
    const emptymainform = {
      id:'',
      docNumbers:'',
      docPages:'',
      fileCode:'',
      fileName:'',
      handleType:'',
      fileSendOffice:'',
      fileNumber:'',
      responsibleDepartment:'',
      secretariatComments:'',
      leaderComments:'',
      secrecyPeriod:'',
      secretLevel:'',
      receiveTime:undefined,
      deadlineTime:undefined,
      deadlineTime2:undefined,
      deadlineTime3:undefined
  }
  const newlistform = {..._.assign(emptymainform,testmodaldata.value)}
    form.setFieldsValue(newlistform);
  }, [testmodaldata.value]);
  return (
    <Modal
      width={1000}
      onOk={onModalSubmit}
      visible={testmodaldata.visible}
      title={testmodaldata.title}
      destroyOnClose={true}
      onCancel={hideModal}
      confirmLoading={testmodaldata.status === 'loading'}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={testmodaldata.value}
      >
        <Row>
        <Col span={12}>
            <Form.Item
              name="id"
              label="id"
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="id"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item
              name="docNumbers"
              label="份数"
              rules={[{ required: true, message: 'docNumbers' }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="份数"
                rules={[{ required: true, message: '份数不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="docPages"
              label="页数"
              rules={[{ required: true, message: 'docPages' }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入页数"
                rules={[{ required: true, message: '页数不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="fileCode"
              label="收文编号"
              rules={[{ required: true, message: 'fileCode' }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入收文编号"
                rules={[{ required: true, message: '收文编号不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fileName"
              label="文件名称"
              rules={[{ required: true, message: 'fileCode' }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入文件名称"
                rules={[{ required: true, message: '文件名称不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="receiveTime"
              label="收文时间"
              rules={[{ required: true, message: '收文时间不能为空!' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入收文时间"
                rules={[{ required: true, message: '收文时间不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="handleType" label="办理类型">
              <Select
                defaultValue={'办理'}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                options={[
                  {
                    value: '传阅',
                    label: '传阅',
                  },
                  {
                    value: '办理',
                    label: '办理',
                  },
                  {
                    value: '留存',
                    label: '留存',
                  },
                ]}
                rules={[{ required: true, message: '办理类型不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item name="fileSendOffice" label="发文机关">
            <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入发文机关"
                rules={[{ required: true, message: '发文机关不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fileNumber" label="文号">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入文号"
                rules={[{ required: true, message: '文号不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="secretLevel" label="密级">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入密级"
                rules={[{ required: true, message: '密级不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item name="responsibleDepartment" label="责任部门">
          <AutoComplete
    style={{ width: 200 }}
    options={options}
  />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
          <Form.Item name='secrecyPeriod' label="保密期限">
          <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入保密期限"
              />
          </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="截止时间" name="deadlineTime">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
                rules={[{ required: true, message: '截止时间不能为空!' }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="截止时间2" name="deadlineTime2">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
            <Form.Item label="截止时间3" name="deadlineTime3">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          name="secretariatComments"
          label="拟办意见"
        >
          <TextArea />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          name="leaderComments"
          label="领导批示"
        >
          <TextArea />
        </Form.Item>
      </Form>

    </Modal>
  );
}

export { TestModal };
