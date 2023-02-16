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
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function RemoveButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const tryremove = () => {
    dispatch(removefileAsync(mainTablevalue.selectedRowKeys))
      .unwrap()
      .then((originalPromiseResult) => {
        dispatch(maintableAsync(mainTablevalue.pagination));
        dispatch(changeSelectedKey([]));
      })
  };
  return (
    <>
                  <Popconfirm
                title="确定要删除吗?"
                onConfirm={tryremove}
              ><Button  size='large'>删除项目</Button></Popconfirm>
    </>
  );
}

export { RemoveButton };