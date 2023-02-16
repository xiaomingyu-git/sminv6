import {Button,message} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {changeSelectedKey,selectMaintable,finishtableAsync,maintableAsync } from '../maintable/maintableSlice'
import { createRef, useEffect, useRef } from 'react';
import {readFirstTable,changeFirstTablelist,postFilebyidList} from '../../serivces/api'
function UploadButton () {
	const dispatch = useAppDispatch ()
    const mainTablevalue = useAppSelector (selectMaintable)
    const refupload = createRef<HTMLInputElement>();
    const handleUpload = () => {
        refupload.current?.click();
      };
    const handleChange = async () => {
        if (refupload.current?.files) {
          const formFile = new FormData();
          formFile.append('file', refupload.current?.files[0]);
          const retrunlist = await postFilebyidList(mainTablevalue.selectedRowKeys[0], formFile);
          if (retrunlist.status === 200) {
            dispatch(maintableAsync(mainTablevalue.pagination));
            message.info('上传状态：完成');
            refupload.current.value = '';
          }
        }
    };
	return (
        <>
        <input
        type="file"
        name="file"
        ref={refupload}
        onChange={handleChange}
        hidden
      />
        <Button onClick={handleUpload}  size='large'>
			上传文件
		</Button>
        </>
	)
}

export {UploadButton}