import { Button, Form, Input, Modal, Row, Col, DatePicker, Select } from 'antd';
import {
  hidesideModal,
  selectsideModal,
  showsideModal,
  sidemodalAsync,
  setdeadlineTime,
  setsidemodalformValue
} from './sidemodalSlice';
import {
    hidetestModal,
    selecttestModal,
    showtestModal,
    testmodalAsync,
    setformValue
  } from '../posttestmodel/testmodalSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { maintableAsync, selectMaintable,changeSelectedKey } from '../maintable/maintableSlice';
import { sidetableAsync,changesideSelectedKey } from '../sidetable/sidetableSlice';
import { useEffect } from 'react';
import moment from 'moment';
function SideModal() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const sidemodaldata = useAppSelector(selectsideModal);
  const testmodaldata = useAppSelector(selecttestModal);
  const onModalSubmit = () => {
    form.submit();
  };
  const mainTablevalue = useAppSelector(selectMaintable);
  const onFinish = (values) => {
    values.createdTime = moment (values.createdTime).utcOffset(480).format('YYYY-MM-DD');
    values.expectFinishTime = moment (values.expectFinishTime).utcOffset(480).format('YYYY-MM-DD');
    dispatch(sidemodalAsync(values))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(sidetableAsync({upid:mainTablevalue.selectedRowKeys[0]}));
        dispatch(changesideSelectedKey([]));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const hideModal = () => {
    dispatch(hidesideModal());
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    console.log(sidemodaldata.value)
    form.setFieldsValue(sidemodaldata.value);
  }, [sidemodaldata,testmodaldata.value]);
  return (
    <Modal
      width={1000}
      onOk={onModalSubmit}
      visible={sidemodaldata.visible}
      title={sidemodaldata.title}
      destroyOnClose={true}
      onCancel={hideModal}
      confirmLoading={sidemodaldata.status === 'loading'}
      destroyOnClose={true}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}

      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="createdTime"
              label="开始时间"
              rules={[{ required: true, message: '开始时间不能为空' }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入开始时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="expectFinishTime"
              label="结束时间"
              rules={[{ required: true, message: '结束时间不能为空' }]}
            >
              <DatePicker
                name="expectFinishTime"
                placeholder="请输入结束时间"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
          <Form.Item name="handledBy" label="承办人">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入承办人"
                rules={[{ required: true, message: '承办人不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
          <Form.Item name="handledByDepartment" label="承办单位">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入承办单位"
                rules={[{ required: true, message: '承办单位不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
        <Col span={12}>
          <Form.Item name="upid" label="upid" >
              <Input readOnly
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="upid"
                rules={[{ required: true, message: '承办单位不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row >
        <Col span={12}>
          <Form.Item name="id" label="id">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="id"

              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
}

export { SideModal };
