import { Button, Popconfirm } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  removefileAsync,
  maintableAsync,
  filestartAsync,
  filesexportallAsync,
} from '../maintable/maintableSlice';
import {
    sidetableAsync,
    selectSidetable,
    changePage,
    changesideSelectedKey,
    removesecfileAsync
  } from '../sidetable/sidetableSlice';
import { selecttestModal } from '../posttestmodel/testmodalSlice';

function RemoveSideButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const sideTablevalue = useAppSelector(selectSidetable)
  const tryremove = () => {
    console.log(sideTablevalue)
    dispatch(removesecfileAsync(sideTablevalue.selectedRowKeys[0]))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(sidetableAsync({upid:mainTablevalue.selectedRowKeys[0]}));
        dispatch(changesideSelectedKey([]));
      })
  };
  return (
    <>
                      <Popconfirm
                title="确定要删除吗?"
                onConfirm={tryremove}
              >
      <Button  size="large" >删除项目</Button></Popconfirm>
    </>
  );
}

export { RemoveSideButton };