import { Button, Form, Input, Modal, Row, Col, DatePicker, Select } from 'antd';
import {
  hidecreateside,
  selectcreateside,
  showcreateside,
  createsideAsync,
  setdeadlineTime,
} from './createsideSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { maintableAsync, selectMaintable } from '../maintable/maintableSlice';
import { useEffect } from 'react';
import moment from 'moment';
import {sidetableAsync} from '../sidetable/sidetableSlice'
function CreateSide() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const createsidedata = useAppSelector(selectcreateside);
  const onModalSubmit = () => {
    form.submit();
  };

  const mainTablevalue = useAppSelector(selectMaintable);
  const { TextArea } = Input;
  const onFinish = (values) => {
    console.log(values);
    values.createdTime = moment(values.createdTime).utcOffset(480).format('YYYY-MM-DD');
    values.expectFinishTime = moment (values.expectFinishTime).utcOffset(480).format('YYYY-MM-DD');
    dispatch(createsideAsync(values))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(mainTablevalue.selectedRowKeys)
        dispatch(maintableAsync(mainTablevalue.pagination))
        dispatch(sidetableAsync({upid:mainTablevalue.selectedRowKeys[0]}));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const hideModal = () => {
    dispatch(hidecreateside());
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  useEffect(() => {
   console.log(mainTablevalue.selectedRowKeys[0])
    form.setFieldsValue({upid:mainTablevalue.selectedRowKeys[0],createdTime:moment(),expectFinishTime:moment().add(3,'d')});
  }, [createsidedata.visible]);

  return (
    <>
    <Modal
      width={1000}
      onOk={onModalSubmit}
      visible={createsidedata.visible}
      title={createsidedata.title}
      destroyOnClose={true}
      onCancel={hideModal}
      confirmLoading={createsidedata.status === 'loading'}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={createsidedata.value ? createsidedata.value : ''}
      >
        <Row>
          <Col span={12} >
            <Form.Item
              name="createdTime"
              label="开始时间"
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

        <Row hidden>
        <Col span={12}>
          <Form.Item name="id" label="id">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="id"
                rules={[{ required: true, message: 'id不能为空!' }]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
    </>
  );
}

export { CreateSide };
