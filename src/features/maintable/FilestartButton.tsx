import { Button } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  finishtableAsync,
  maintableAsync,
  filestartAsync
} from '../maintable/maintableSlice';
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function FileStartButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const tryfilestart = () => {
    dispatch(filestartAsync(mainTablevalue.selectedRowKeys[0]))
    .unwrap()
    .then((originalPromiseResult) => {
      console.log(originalPromiseResult)
      window.electron.ipcRenderer.send('openfile', originalPromiseResult);
    });
  };
  return (
    <>
      <Button
        onClick={tryfilestart}

          size='large'
      >
        文件办理单
      </Button>
    </>
  );
}

export { FileStartButton };