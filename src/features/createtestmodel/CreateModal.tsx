import { AutoComplete, Col, DatePicker, Form, Input, Modal, Row, Select } from "antd";
import { createmodalAsync, hidecreateModal, selectcreateModal } from "./createmodalSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { maintableAsync, selectMaintable } from "../maintable/maintableSlice";
import { useEffect } from "react";
import moment from "moment";

function CreateModal() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const createmodaldata = useAppSelector(selectcreateModal);
  const onModalSubmit = () => {
    form.submit();
  };
  const options = [
    {
      value: "集团办公室",
      label: "集团办公室"
    },
    {
      value: "集团保密办",
      label: "集团保密办"
    },
    {
      value: "信访办",
      label: "信访办"
    },
    {
      value: "党政督查办公室",
      label: "党政督查办公室"
    },
    {
      value: "战略规划部",
      label: "战略规划部"
    },
    {
      value: "科技发展部",
      label: "科技发展部"
    }, {
      value: "科技发展部(专项办)",
      label: "科技发展部(专项办)"
    },
    {
      value: "资本运营部",
      label: "资本运营部"
    },
    {
      value: "安全环保部",
      label: "安全环保部"
    },
    {
      value: "财务部",
      label: "财务部"
    },
    {
      value: "人力资源部",
      label: "人力资源部"
    }, {
      value: "人力资源部（党委组织部）",
      label: "人力资源部（党委组织部）"
    },
    {
      value: "管理与信息化部",
      label: "管理与信息化部"
    },
    {
      value: "审计部",
      label: "审计部"
    },
    {
      value: "法律合规部",
      label: "法律合规部"
    },
    {
      value: "纪委",
      label: "纪委"
    },
    {
      value: "工会",
      label: "工会"
    },
    {
      value: "党委宣传部",
      label: "党委宣传部"
    },
    {
      value: "机关党委",
      label: "机关党委"
    },
    {
      value: "团委",
      label: "团委"
    }
  ];
  const mainTablevalue = useAppSelector(selectMaintable);
  const { TextArea } = Input;
  const onFinish = (values) => {
    if (typeof values.street === "undefined") {
      values.street = "";
    }
    if (typeof values.province === "undefined") {
      values.province = "";
    }
    values.secretLevel = values.province + values.street;
    values.receiveTime = moment(values.receiveTime).utcOffset(480).format("YYYY-MM-DD");
    if (typeof values.deadlineTime === "object") {
      values.deadlineTime = moment(values.deadlineTime).utcOffset(480).format("YYYY-MM-DD");
      if (values.deadlineTime === "Invalid date") {
        values.deadlineTime = "";
      }
    } else {
      values.deadlineTime = "";
    }
    if (typeof values.deadlineTime2 === "object") {
      values.deadlineTime2 = moment(values.deadlineTime2).utcOffset(480).format("YYYY-MM-DD");
      if (values.deadlineTime2 === "Invalid date") {
        values.deadlineTime2 = "";
      }
    } else {
      values.deadlineTime2 = "";
    }
    if (typeof values.deadlineTime3 === "object") {
      values.deadlineTime3 = moment(values.deadlineTime3).utcOffset(480).format("YYYY-MM-DD");
      if (values.deadlineTime3 === "Invalid date") {
        values.deadlineTime3 = "";
      }
    } else {
      values.deadlineTime3 = "";
    }
    dispatch(createmodalAsync(values))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(maintableAsync(mainTablevalue.pagination));
      })
      .catch((rejectedValueOrSerializedError) => {
        // handle error here
      });
  };
  const hideModal = () => {
    dispatch(hidecreateModal());
  };
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };
  useEffect(() => {
    form.setFieldsValue(createmodaldata.value);
  }, [createmodaldata.value]);
  return (
    <Modal
      width={1000}
      onOk={onModalSubmit}
      visible={createmodaldata.visible}
      title={createmodaldata.title}
      destroyOnClose={true}
      onCancel={hideModal}
      confirmLoading={createmodaldata.status === "loading"}
    >
      <Form
        form={form}
        onFinish={onFinish}
        preserve={false}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        initialValues={createmodaldata.value ? createmodaldata.value : ""}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="docNumbers"
              label="份数"
            >
              <Input
                placeholder="份数"
                rules={[{ required: true, message: "份数不能为空!" }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="docPages"
              label="页数"
              rules={[{ required: true, message: "页数不能为空!" }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入页数"
                rules={[{ required: true, message: "页数不能为空!" }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="fileCode"
              label="收文编号"
              rules={[{ required: true, message: "收文编号不能为空!" }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入收文编号"
                rules={[{ required: true, message: "收文编号不能为空!" }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fileName"
              label="文件名称"
              rules={[{ required: true, message: "文件名称不能为空!" }]}
            >
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入文件名称"
                rules={[{ required: true, message: "文件名称不能为空!" }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="receiveTime"
              label="收文时间"
              rules={[{ required: true, message: "截止时间不能为空!" }]}
            >
              <DatePicker
                format="YYYY-MM-DD"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入截止时间"
                rules={[{ required: true, message: "截止时间不能为空!" }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="handleType" label="办理类型">
              <Select
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                options={[
                  {
                    value: "传阅",
                    label: "传阅"
                  },
                  {
                    value: "办理",
                    label: "办理"
                  },
                  {
                    value: "留存",
                    label: "留存"
                  }
                ]}
                rules={[{ required: true, message: "办理类型不能为空!" }]}
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
                rules={[{ required: true, message: "发文机关不能为空!" }]}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fileNumber" label="文号">
              <Input
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                placeholder="请输入文号"
                rules={[{ required: true, message: "文号不能为空!" }]}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item label="密级">
              <Input.Group compact style={{ width: "max-content" }}>
                <Form.Item
                  name={["province"]} noStyle
                >
                  <Select style={{ width: 100 }}
                          options={[
                            {
                              value: "秘密",
                              label: "秘密"
                            }, {
                              value: "机密",
                              label: "机密"
                            },
                            {
                              value: "绝密",
                              label: "绝密"
                            },
                            {
                              value: "秘密★",
                              label: "秘密★"
                            },
                            {
                              value: "机密★",
                              label: "机密★"
                            },
                            {
                              value: "绝密★",
                              label: "绝密★"
                            }, {
                              value: "内部",
                              label: "内部"
                            }, {
                              value: "内部▲",
                              label: "内部▲"
                            }, {
                              value: " ",
                              label: " "
                            }
                          ]}>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["street"]}
                  noStyle
                >
                  <Input style={{ width: "auto" }} defaultValue="" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="responsibleDepartment" label="责任部门">
              {/* <Select
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                options={[
                  {
                    value: '集团办公室',
                    label: '集团办公室',
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
                ]}
                rules={[{ required: true, message: '责任部门不能为空!' }]}
              /> */}
              <AutoComplete
                style={{ width: 200 }}
                options={options}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="secrecyPeriod" label="保密期限">
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
                rules={[{ required: true, message: "截止时间不能为空!" }]}
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

export { CreateModal };
