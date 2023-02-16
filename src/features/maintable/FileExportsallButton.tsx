import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  finishtableAsync,
  maintableAsync,
  filestartAsync,
  filesexportallAsync,
} from '../maintable/maintableSlice';
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function FileExportsallButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const tryfilesexportsall = () => {
    // console.log(mainTablevalue.selectedRowKeys);
    dispatch(filesexportallAsync())
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult)
        window.electron.ipcRenderer.send('openfile', originalPromiseResult);
      });
    // window.electron.ipcRenderer.send(
    //     'opendialog',
    //     `http://localhost:8080/files/export/1`,
    //   );
  };
  return (
    <div>
      <Button onClick={tryfilesexportsall}>导出数据列表</Button>
    </div>
  );
}

export { FileExportsallButton };
