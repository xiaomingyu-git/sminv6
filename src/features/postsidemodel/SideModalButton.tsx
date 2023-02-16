import {Button, notification} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectsideModal, showsideModal} from './sidemodalSlice'
import {changeSelectedKey,selectMaintable } from '../maintable/maintableSlice'
import {selectSidetable} from '../sidetable/sidetableSlice'
function SideModalButton () {
	const dispatch = useAppDispatch ()
	const sidemodaldata = useAppSelector (selectsideModal)
    const mainTablevalue = useAppSelector (selectMaintable)
    const sideTablevalue = useAppSelector(selectSidetable)
	const sideModal = () => {
		if( sideTablevalue.selectedRowKeys.length ===1) {
			dispatch (showsideModal ())
		  } else{
			notification.info({message:'您没有选择行或者没有只选择一行或者您选择了已完结的项目'})
		  }
	}
	return (
        <Button onClick={sideModal}  size="large">
			编辑项目
		</Button>
	)
}

export {SideModalButton}


