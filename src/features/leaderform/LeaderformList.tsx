import React from 'react'
import { createRef, useEffect, useRef } from 'react';
import type { RootState } from '../../app/store'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {leaderformAsync,selectleaderForm } from './leaderformSlice'
import { Button, Checkbox, DatePicker, Form, Input,Space } from 'antd';
import moment from 'moment'
export function LeaderformList() {
    const [form] = Form.useForm();
    const formvalue = useAppSelector (selectleaderForm)
    const dispatch = useAppDispatch ()
    const onFinish = async(values: any) => {
        const newvalues ={ ...values};
        if ( values.receiveTimeStart !== undefined && values.receiveTimeStart !== null ) {
            newvalues.receiveTimeStart = moment (values.receiveTimeStart).utcOffset(480).format('YYYY-MM-DD');
        }
        if ( values.receiveTimeEnd !== undefined && values.receiveTimeEnd !== null ) {
            newvalues.receiveTimeEnd = moment (values.receiveTimeEnd).utcOffset(480).format('YYYY-MM-DD');
        }
       dispatch(leaderformAsync(newvalues))
       .unwrap()
       .then((originalPromiseResult) => {
         console.log(originalPromiseResult)
         window.electron.ipcRenderer.send('openfile', originalPromiseResult);
       });
      };
      const onReset = () => {
        form.resetFields();
      };
    return (
        <Form form={form}
        name="basic"
        layout='inline'
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="收文时间开始"
          name="receiveTimeStart"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="收文时间结束"
          name="receiveTimeEnd"
        >
          <DatePicker />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
            <Button  htmlType="submit">
            领导导出
          </Button>
          <Button htmlType="button" onClick={onReset}>
          重置
        </Button>
            </Space>
        </Form.Item>
      </Form>
      )
}