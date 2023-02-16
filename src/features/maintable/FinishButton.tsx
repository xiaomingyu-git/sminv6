import { Button,message } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  changeSelectedKey,
  selectMaintable,
  finishtableAsync,
  maintableAsync,
} from '../maintable/maintableSlice';
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function FinishButton() {
  const dispatch = useAppDispatch();
  const mainTablevalue = useAppSelector(selectMaintable);
  const testmodaldata = useAppSelector(selecttestModal);
  const finishtableAction = async () => {
    console.log(testmodaldata.value.status)
    console.log(testmodaldata.value.status === '1');
    console.log(testmodaldata.value.status === '0'); //未完成
    // dispatch(finishtableAsync(mainTablevalue.selectedRowKeys[0]))
    //   .unwrap()
    //   .then((originalPromiseResult) => {
    //     dispatch(maintableAsync(mainTablevalue.pagination));
    //     dispatch(changeSelectedKey([]));
    //   })
    //   .catch((rejectedValueOrSerializedError) => {
    //     // handle error here
    //   });
  };
  const finishtableActiontoset =async () => {
    if (testmodaldata.value.status === '0' && mainTablevalue.selectedRowKeys[0] ) {
          dispatch(finishtableAsync(mainTablevalue.selectedRowKeys[0]))
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
          dispatch(finishtableAsync(mainTablevalue.selectedRowKeys[0]))
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
        完结项目
      </Button>
      <Button  size='large' 
        onClick={finishtableActiontounset}

      >
        取消完结
      </Button>
    </>
  );
}

export { FinishButton };
