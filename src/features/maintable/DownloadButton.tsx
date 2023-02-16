import {Button,message} from 'antd'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {changeSelectedKey,selectMaintable,finishtableAsync,maintableAsync } from '../maintable/maintableSlice'
import { createRef, useEffect, useRef } from 'react';
import {readFirstTable,changeFirstTablelist,postFilebyidList} from '../../serivces/api'
function DownloadButton () {
	const dispatch = useAppDispatch ()
    const mainTablevalue = useAppSelector (selectMaintable)
    const trydownload = () => {
        console.log(mainTablevalue.selectedRowKeys)
        if (window.electron) {
          console.log(`http://localhost:8080/files/${mainTablevalue.selectedRowKeys}/attachment`);

          window.electron.ipcRenderer.send(
            'opendialog',
            `http://localhost:8080/files/${mainTablevalue.selectedRowKeys}/attachment`,
          );
        }
      };
	return (
        <>
        <Button onClick={trydownload}  size='large'>
			下载文件
		</Button>
        </>
	)
}

export {DownloadButton}