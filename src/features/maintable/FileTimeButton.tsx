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
import {selectForm } from './../form/formSlice'
function FileTimeButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const formvalue = useAppSelector (selectForm)
  const tryfiletime = () => {
    console.log(formvalue)
    // dispatch(filestartAsync(mainTablevalue.selectedRowKeys[0]))
    // .unwrap()
    // .then((originalPromiseResult) => {
    //   console.log(originalPromiseResult)
    //   window.electron.ipcRenderer.send('openfile', originalPromiseResult);
    // });
  };
  return (
    <>
      <Button
        onClick={tryfiletime}
      >
        领导批注导出
      </Button>
    </>
  );
}

export { FileTimeButton };