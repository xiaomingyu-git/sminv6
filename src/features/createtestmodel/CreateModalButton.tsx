import {Button} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {selectcreateModal, showcreateModal,createmodalnumberAsync, setformValue} from './createmodalSlice'
import moment from 'moment';
function CreateModalButton () {
	const dispatch = useAppDispatch ()
	const createmodaldata = useAppSelector (selectcreateModal)

	const createModal = async() => {
        dispatch(createmodalnumberAsync())
        .unwrap()
        .then((originalPromiseResult) => {
            console.log(originalPromiseResult)
            dispatch(setformValue({fileCode:originalPromiseResult,handleType:'办理',receiveTime:moment()}))
            dispatch (showcreateModal ())
        })
	}
	return (
		<Button onClick={createModal}  size="large">
			新增项目
		</Button>
	)
}

export {CreateModalButton}


