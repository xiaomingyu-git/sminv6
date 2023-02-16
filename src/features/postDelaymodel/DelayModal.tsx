import { Button, Form, Input, Modal, Row, Col, DatePicker, Select, AutoComplete } from 'antd';
import {
  hidedelayModal,
  selectdelayModal,
  showdelayModal,
  delaymodalAsync,
  setdelayformValue
} from './delaymodalSlice';
import _, { assign } from 'lodash'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { maintableAsync, selectMaintable,changeSelectedKey } from '../maintable/maintableSlice';
import { useEffect } from 'react';
import moment from 'moment';
import axios from "axios";
function DelayModal() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const delaymodaldata = useAppSelector(selectdelayModal);
  const onModalSubmit = () => {
    form.submit();
    form.setFieldsValue({});
  };
  const mainTablevalue = useAppSelector(selectMaintable);
  const { TextArea } = Input;
  const onFinish = (values: any) => {
    console.log(values)
    values.receiveTime = moment (values.receiveTime).utcOffset(480).format('YYYY-MM-DD');
    dispatch(delaymodalAsync(values))
      .unwrap()
      .then(() => {
        dispatch(maintableAsync(mainTablevalue.pagination));
        dispatch(changeSelectedKey([]))
        dispatch(setdelayformValue({
          id:'',
          receiveTime:undefined,
          deadlineTime:undefined,
          deadlineTime2:undefined,
          deadlineTime3:undefined,
          delayTime1:undefined,
          delayTime2:undefined,
          delayTime3:undefined,
          reason1:'',
          reason2:'',
          reason3:''
      }))
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const hideModal = () => {
    dispatch(hidedelayModal());
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  useEffect(() => {
    console.log('这里是useEffect2')
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
      deadlineTime3:undefined,
      delayTime1:undefined,
      delayTime2:undefined,
      delayTime3:undefined,
      reason1:'',
      reason2:'',
      reason3:''
  }
  let newlistform = emptymainform
  if(typeof (delaymodaldata.value.id) === "undefined") {
    newlistform = emptymainform
    form.setFieldsValue(newlistform);
  } else {
     axios.get(`/fileDelayInfo/${delaymodaldata.value.id}`).then((res) =>{
       newlistform = {..._.assign(emptymainform,delaymodaldata.value,res.data)}
       if (typeof (newlistform.delayTime1) == 'undefined' || newlistform.delayTime1 == null) {
       } else {
         newlistform.delayTime1 = moment(newlistform.delayTime1);
       }
       if (typeof (newlistform.delayTime2) == 'undefined' || newlistform.delayTime2 == null) {
       } else {
         newlistform.delayTime2 = moment(newlistform.delayTime2);
       }
       if (typeof (newlistform.delayTime3) == 'undefined' || newlistform.delayTime3 == null) {
       } else {
         newlistform.delayTime3 = moment(newlistform.delayTime3);
       }
       console.log(newlistform)
       form.setFieldsValue(newlistform);
     } );
  }
  }, [delaymodaldata.value]);
  return (
    <Modal
      width={1000}
      onOk={onModalSubmit}
      visible={delaymodaldata.visible}
      title={delaymodaldata.title}
      destroyOnClose={true}
      onCancel={hideModal}
      confirmLoading={delaymodaldata.status === 'loading'}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={delaymodaldata.value}
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
            <Form.Item label="截止时间" name="deadlineTime">
              <DatePicker open={false} allowClear ={false} inputReadOnly
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="延期时间" name="delayTime1">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入延期时间1"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          name="reason1"
          label="延期理由1"
        >
          <TextArea />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item label="截止时间2" name="deadlineTime2">
              <DatePicker open={false} allowClear ={false} inputReadOnly
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="延期时间2" name="delayTime2">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入延期时间2"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          name="reason2"
          label="延期理由2"
        >
          <TextArea />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item label="截止时间3" name="deadlineTime3" >
              <DatePicker open={false} allowClear ={false} inputReadOnly
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="延期时间3" name="delayTime3">
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入延期时间3"
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          labelCol={{ span: 2 }}
          wrapperCol={{ span: 20 }}
          name="reason3"
          label="延期理由3"
        >
          <TextArea />
        </Form.Item>
      </Form>

    </Modal>
  );
}

export { DelayModal };
