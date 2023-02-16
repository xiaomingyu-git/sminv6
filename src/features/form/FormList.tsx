import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {maintableAsync,selectMaintable,changePage,changeSelectedKey } from '../maintable/maintableSlice'
import {selectForm,changeForm } from './formSlice'
import { AutoComplete, Button, Checkbox, DatePicker, Form, Input,Space } from 'antd';
import moment from 'moment'
import {lgbutton} from '../../pages/index.less'
export function FormList() {
    const [form] = Form.useForm();
    const mainTablevalue = useAppSelector (selectMaintable)
    const formvalue = useAppSelector (selectForm)
    const dispatch = useAppDispatch ()
    const onFinish = async(values: any) => {
        const newvalues ={ ...values};
        if ( values.receiveTimeStart !== undefined && values.receiveTimeStart !== null ) {
            newvalues.receiveTimeStart = moment (values.receiveTimeStart).utcOffset(480).format('YYYY-MM-DD');
        }
        if ( values.receiveTimeEnd !== undefined && values.receiveTimeEnd !== null ) {
            newvalues.receiveTimeEnd = moment (values.receiveTimeEnd).utcOffset(480).format('YYYY-MM-DD');
        }
        await dispatch (changePage ({current:1, pageSize:mainTablevalue.pagination.pageSize}))
        dispatch (maintableAsync (newvalues))
        dispatch(changeForm(newvalues))
        dispatch(changeSelectedKey([]));
      };
      const onReset = () => {
        form.resetFields();
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
    return (
        <Form form={form}
        name="basic"
        layout='inline'
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label={<label><b>收文</b></label>}
          name="receiveTimeStart"
        >
          <DatePicker style={{ width: 130 }} />
        </Form.Item>
        <Form.Item
          name="receiveTimeEnd"
        >
          <DatePicker style={{ width: 130 }} />
        </Form.Item>
        <Form.Item
          label={<label><b>收文编号</b></label>}
          name="fileCode"
    
        >
          <Input style={{ width: 100 }}/>
        </Form.Item>
        <Form.Item>
        <Button  htmlType="submit" size='large' className={lgbutton}>
            查询
          </Button>
        </Form.Item>
        <Form.Item
         label={<label><b>发文机关</b></label>}
          name="fileSendOffice"
      
        >
          <Input     style={{ width: 100 }}/>
        </Form.Item>
        <Form.Item
          label={<label><b>文件名称</b></label>}
          name="fileName"
          
        >
          <Input  style={{ width: 100 }}/>
        </Form.Item>
        <Form.Item
          label={<label><b>文号</b></label>}
          name="fileNumber"
    
        >
          <Input style={{ width: 100 }} />
        </Form.Item>
        <Form.Item
          label={<label><b>责任部门</b></label>}
          name="responsibleDepartment"
        >
                 <AutoComplete
    style={{ width: 200 }}
    options={options}
  />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Space>
            <Button  htmlType="submit" size='large' className={lgbutton}>
            查询
          </Button>
          <Button htmlType="button" onClick={onReset} size='large' className={lgbutton}>
          重置
        </Button>
            </Space>
        </Form.Item>
      </Form>
      )

}