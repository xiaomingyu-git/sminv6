import { Button, notification } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  finishtableAsync,
  maintableAsync,
  filestartAsync,
  filesexportallAsync,
  filesrecordlistAsync
} from '../maintable/maintableSlice';
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function FileChangeButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const tryfilesexportsall = () => {
    console.log(mainTablevalue.selectedRowKeys)
    let realliststring =''
    if (mainTablevalue.selectedRowKeys.length ===1 ) {
        realliststring = mainTablevalue.selectedRowKeys[0]
    }
    if (mainTablevalue.selectedRowKeys.length ===2) {
        realliststring = mainTablevalue.selectedRowKeys[0] +','+ mainTablevalue.selectedRowKeys[1]
    }
    if (mainTablevalue.selectedRowKeys.length !==1 && mainTablevalue.selectedRowKeys.length !==2) {
      notification.info({message:'您没有选择行或者没有只选择一行或者没有只选择了二行'})
    } else {
      dispatch(filesrecordlistAsync(realliststring))
      .unwrap()
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult)
        window.electron.ipcRenderer.send('openfile', originalPromiseResult);
      });
    }
  };
  return (
    <>
      <Button onClick={tryfilesexportsall}    size='large'>文件流转单</Button>
    </>
  );
}

export { FileChangeButton };