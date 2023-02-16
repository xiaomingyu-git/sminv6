import { Button,message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  maintableAsync, finishtableUpdateAsync
} from "../maintable/maintableSlice";
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function FinishUpdateButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const finishtableActiontoset =async () => {
    if (mainTablevalue.selectedRowKeys[0] ) {
      dispatch(finishtableUpdateAsync(mainTablevalue.selectedRowKeys[0]))
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(maintableAsync(mainTablevalue.pagination));
          dispatch(changeSelectedKey([]))
        })
    } else {
      message.info('该项目已经是完结状态 或者 您没有选且只选中一行')
    }
  }
  const finishtableActiontounset =async () => {
    if (testmodaldata.value.status === '1' && mainTablevalue.selectedRowKeys[0]) {
      dispatch(finishtableUpdateAsync(mainTablevalue.selectedRowKeys[0]))
        .unwrap()
        .then((originalPromiseResult) => {
          dispatch(maintableAsync(mainTablevalue.pagination));
          dispatch(changeSelectedKey([]))
        })
    } else {
      message.info('该项目已经是未完结状态 或者 您没有选且只选中一行')
    }
  }
  return (
    <>
      <Button
        onClick={finishtableActiontoset}  size='large'
      >
        办截项目
      </Button>
      {/*<Button  size='large'*/}
      {/*         onClick={finishtableActiontounset}*/}

      {/*>*/}
      {/*  取消办截*/}
      {/*</Button>*/}
    </>
  );
}

export { FinishUpdateButton };
