import {Button, message, notification} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selecttestModal, showtestModal} from './testmodalSlice'
import {changeSelectedKey,selectMaintable } from '../maintable/maintableSlice'
function TestModalButton () {
	const dispatch = useAppDispatch ()
	const testmodaldata = useAppSelector (selecttestModal)
    const mainTablevalue = useAppSelector (selectMaintable)
	const testModal = () => {
		if(            mainTablevalue.selectedRowKeys.length === 1 &&
            testmodaldata.value.status !== '1') {
				dispatch (showtestModal ())
			  } else{
				notification.info({message:'您没有选择行或者没有只选择一行或者您选择了已完结的项目'})
			  }
	}
	return (
        <Button onClick={testModal}   size='large'   >
			编辑项目
		</Button>
	)
}

export {TestModalButton}


