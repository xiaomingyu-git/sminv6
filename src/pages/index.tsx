import styles from './index.less';
import { useEffect } from 'react';
import { FormList } from '../features/form/FormList';
import { Maintable } from '../features/maintable/Maintable';
import { TestModal } from '@/features/posttestmodel/TestModal';
import { CreateModal } from '../features/createtestmodel/CreateModal';
import { TestModalButton } from '@/features/posttestmodel/TestModalButton';
import { CreateModalButton } from '@/features/createtestmodel/CreateModalButton';
import { FinishButton } from '@/features/maintable/FinishButton';
import { UploadButton } from '@/features/maintable/UploadButton';
import { DownloadButton } from '@/features/maintable/DownloadButton';
import { PrevButton } from '@/features/maintable/PrevButton';
import { CreatesideButton } from '@/features/createsidemodel/CreateSideButton';
import {FileStartButton} from '@/features/maintable/FilestartButton'
import {FileExportsallButton} from '@/features/maintable/FileExportsallButton'
import {FileChangeButton} from '@/features/maintable/FileChangeButton'
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import { useState } from 'react';
import 'moment/locale/zh-cn';
import {
  Button,
  Form,
  Input,
  Modal,
  Row,
  Col,
  DatePicker,
  Select,
  Space,
  message,
  Divider,
} from 'antd';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { ConfigProvider } from 'antd';
import { Sidetable } from '@/features/sidetable/Sidetable';
import { CreateSide } from '@/features/createsidemodel/CreateSide';
import { SideModalButton } from '@/features/postsidemodel/SideModalButton';
import { SideModal } from '@/features/postsidemodel/SideModal';
import {RemoveButton}from '@/features/maintable/RemoveButton'
import {FileTimeButton} from  '@/features/maintable/FileTimeButton'
import { LeaderformList } from '@/features/leaderform/LeaderformList';
import {RemoveSideButton} from '@/features/sidetable/RemoveSideButton'
import { Statusform } from '@/features/statusform/Statusform';
import { FinishUpdateButton } from "@/features/maintable/FinishUpdateButton";
import { DelayModal } from "@/features/postDelaymodel/DelayModal";
import { DelayModalButton } from "@/features/postDelaymodel/DelayModalButton";
export default function IndexPage() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };

    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };
  useEffect(() => {
    if (window.electron) {
      window.electron.ipcRenderer.on('downstate', (event: any, arg: string) => {
        console.log(event);
        console.log(arg);
        message.info(arg);
      });
    }
  }, []);
  return (
    <ConfigProvider locale={zhCN}>
      <br />
      <FormList></FormList>
      <br />
      <Col >
        <CreateModalButton></CreateModalButton>
        <TestModalButton></TestModalButton>
        <FinishButton></FinishButton>
        <RemoveButton></RemoveButton>
        <Divider type="vertical" />
        <UploadButton></UploadButton>
        <DownloadButton></DownloadButton>
        <PrevButton></PrevButton>
        <Divider type="vertical" />
        <FileStartButton></FileStartButton>
        <FileChangeButton></FileChangeButton>
      <Button  onClick={showModal} size='large'>
        其他导出选项
      </Button><Divider type="vertical" />
      <Modal title="其他导出列表" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        全部导出
        <FileExportsallButton></FileExportsallButton>
        <Divider></Divider>
        领导批示意见
        <LeaderformList></LeaderformList>
        <Divider></Divider>
        涉密文件办理跟踪情况
        <Statusform></Statusform>
      </Modal>
        <Divider type="vertical" />
        <FinishUpdateButton ></FinishUpdateButton>
        <DelayModalButton ></DelayModalButton>
      </Col><br />
      <Maintable></Maintable>
      <CreateModal></CreateModal>
      <TestModal></TestModal>
      <SideModal ></SideModal>
      <DelayModal ></DelayModal>
      <Divider style={{margin:0}}></Divider>
      <Col >
        <CreatesideButton></CreatesideButton>
        <SideModalButton></SideModalButton>
        <RemoveSideButton></RemoveSideButton>
      </Col>
      <Sidetable></Sidetable>
      <CreateSide></CreateSide>
    </ConfigProvider>
  );
}
