import {Button, notification} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectcreateside, showcreateside, setsidecreateformValue} from './createsideSlice'
import { maintableAsync, selectMaintable } from '../maintable/maintableSlice';
import {selectSidetable} from '../sidetable/sidetableSlice'
import { selecttestModal } from '../posttestmodel/testmodalSlice';
function CreatesideButton () {
	const dispatch = useAppDispatch ()
    const mainTablevalue = useAppSelector(selectMaintable);
    const sideTablevalue = useAppSelector(selectSidetable)
	const testmodaldata = useAppSelector (selecttestModal)
	const createsidef = async() => {
		if( mainTablevalue.selectedRowKeys.length === 1 &&
            testmodaldata.value.status !== '1') {
				dispatch (showcreateside ())
			  } else{
				notification.info({message:'您没有选择行或者没有只选择一行或者您选择了已完结的项目'})
			  }
	}
	return (
		<Button onClick={createsidef}   size="large">
			新增项目
		</Button>
	)
}

export {CreatesideButton}


