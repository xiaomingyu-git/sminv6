import {Button, message, notification} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectdelayModal, showdelayModal} from './delaymodalSlice'
import {changeSelectedKey,selectMaintable } from '../maintable/maintableSlice'
function DelayModalButton () {
	const dispatch = useAppDispatch ()
	const delaymodaldata = useAppSelector (selectdelayModal)
    const mainTablevalue = useAppSelector (selectMaintable)
	const delayModal = () => {
		if(mainTablevalue.selectedRowKeys.length === 1 &&
      delaymodaldata.value.status !== '1') {
				dispatch (showdelayModal())
			  } else{
				notification.info({message:'您没有选择行或者没有只选择一行或者您选择了已完结的项目'})
			  }
	}
	return (
        <Button onClick={delayModal}   size='large'   >
			查看延期
		</Button>
	)
}

export {DelayModalButton}


