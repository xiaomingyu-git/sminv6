import React, { useEffect, useState } from 'react';
import type { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  maintableAsync,
  selectMaintable,
  changePage,
  changeSelectedKey,
} from './maintableSlice';
import {
    changesideSelectedKey
} from '../sidetable/sidetableSlice'
import { setformValue } from '../posttestmodel/testmodalSlice';
import {setdelayformValue} from "@/features/postDelaymodel/delaymodalSlice";
import {setsidecreateformValue} from '../createsidemodel/createsideSlice'
import {sidetableAsync} from '../sidetable/sidetableSlice'
import { Button, Table, Pagination, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import type { PaginationProps } from 'antd';
import moment from 'moment';
import {relatedPartyMaint} from '../../pages/index.less'
import _ from 'lodash'
import { selectForm } from '../form/formSlice';
const showTotal: PaginationProps['showTotal'] = total => `共 ${total} 条`;
export function Maintable() {
  const mainTablevalue = useAppSelector(selectMaintable);
  const selectedRowKeys = mainTablevalue.selectedRowKeys;
  const dispatch = useAppDispatch();
  const formvalue = useAppSelector (selectForm)
  const columns: ColumnsType<FirstTableListType>[] = [
    {
      title: '收文编号',
      ellipsis:true,
      dataIndex: 'fileCode',
      width: 80,
      sorter: {
        compare: (a, b) => a.fileCode - b.fileCode,
        multiple: 2,
      },
      render(text, record) {
        return {
            props: {
                style: { color:( record.deadlineTime||   record.deadlineTime2|| record.deadlineTime3 )&& record.status !=='1'  ? 'red' : ((record.overtimeStatus  === '1' && record.status !== '1')?'blue':'')},
              },
          children: (
            <span>
              {record.fileCode}
            </span>
          ),
        };
      },
    },
    {
      title: '收文时间',
      dataIndex: 'receiveTime',
      width: 80,
    },
    {
      title: '密级',
      dataIndex: 'secretLevel',
      width: 80,
      hideInSearch: true,
    },
    {
        title: '发文机关',
        dataIndex: 'fileSendOffice',
        ellipsis:true,
      width: 100,
        render(text, record) {
          return {
            children: (
              <Tooltip placement="topLeft" title={record.fileSendOffice}>
                {record.fileSendOffice}
              </Tooltip>
            ),
          };
        },
      },
    {
      title: '文号',
      dataIndex: 'fileNumber',
      ellipsis:true,
      width: 100,
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.fileNumber}>
              {record.fileNumber}
            </Tooltip>
          ),
        };
      },
    },
    {
      title: '文件名称',
      ellipsis:true,
      width: 100,
      dataIndex: 'fileName',
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.fileName}>
              {record.fileName}
            </Tooltip>
          ),
        };
      },
    },
    {
      title: '责任部门',
      ellipsis:true,
      width: 100,
      dataIndex: 'responsibleDepartment',
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.responsibleDepartment}>
              {record.responsibleDepartment}
            </Tooltip>
          ),
        };
      },
    },
    {
      title: '拟办意见',
      dataIndex: 'secretariatComments',
      ellipsis:true,
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.secretariatComments}>
              {record.secretariatComments}
            </Tooltip>
          ),
        };
      },
    },
    {
        title: '领导批示',
      width: 200,
        dataIndex: 'leaderComments',
        ellipsis:true,
        render(text, record) {
          return {
            children: (
              <Tooltip placement="topLeft" title={record.leaderComments}>
                {record.leaderComments}
              </Tooltip>
            ),
          };
        },
      },
    {
      title: '办理类型',
      dataIndex: 'handleType',
      width: 80,
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(text, record) {
        return {
          children: <span>{record.status ==="1"? '完成':'未完成'}</span>,
        };
      },
      width: 60,
    },
    {
        title: '附件名称',
        ellipsis:true,
        dataIndex: 'attachment',
      width: 60,
        render(text, record) {
          return {
            children: (
              <Tooltip placement="topLeft" title={record.attachment}>
                {record.attachment}
              </Tooltip>
            ),
          };
        },
      },
    {
      title: '办截',
      dataIndex: 'finishStatus',
      render(text, record) {
        return {
          children: <span>{record.finishStatus}</span>,
        };
      },
      width: 60,
    },
      {
        title: '截止时间',
        dataIndex: 'deadlineTime',
        width: 100,
        render(text, record) {
          return {
              props: {
                  style: { color:( record.deadlineTime||   record.deadlineTime2|| record.deadlineTime3 )&& record.status !=='1'  ? 'red' : ((record.overtimeStatus  === '1' && record.status !== '1')?'blue':'')},
                },
            children: <span>{record.deadlineTime}</span>,
          };
        },
      },
      {
        title: '截止时间2',
        dataIndex: 'deadlineTime2',
        width: 100,
        render(text, record) {
          return {
              props: {
                style: { color:( record.deadlineTime||   record.deadlineTime2|| record.deadlineTime3 )&& record.status !=='1'  ? 'red' : ((record.overtimeStatus  === '1' && record.status !== '1')?'blue':'')},
                },
            children: <span>{record.deadlineTime2}</span>,
          };
        },
      },
      {
        title: '截止时间3',
        dataIndex: 'deadlineTime3',
        width: 100,
        render(text, record) {
          return {
              props: {
                style: { color:( record.deadlineTime||   record.deadlineTime2|| record.deadlineTime3 )&& record.status !=='1'  ? 'red' : ((record.overtimeStatus  === '1' && record.status !== '1')?'blue':'')},
                },
            children: <span>{record.deadlineTime3}</span>,
          };
        },
      },{
      title: '延迟1',
      ellipsis:true,
      dataIndex: 'delayTime1',
      width:80,
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.delayTime1}>
              {record.delayTime1}
            </Tooltip>
          ),
        };
      },
    },{
      title: '延迟2',
      ellipsis:true,
      dataIndex: 'delayTime2',
      width:80,
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.delayTime2}>
              {record.delayTime2}
            </Tooltip>
          ),
        };
      },
    },{
      title: '延迟3',
      ellipsis:true,
      dataIndex: 'delayTime3',
      width:80,
      render(text, record) {
        return {
          children: (
            <Tooltip placement="topLeft" title={record.delayTime3}>
              {record.delayTime3}
            </Tooltip>
          ),
        };
      },
    },
  ];
  const onPageChange = async (value, pageSize) => {
    await dispatch(changePage({ current: value, pageSize }));
    const newlistvalue = Object.assign({},formvalue.listvalue,mainTablevalue.pagination )
    dispatch(maintableAsync(newlistvalue));
  };
  useEffect(() => {
    dispatch(maintableAsync(mainTablevalue.pagination));
  }, []);
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      dispatch(changeSelectedKey(selectedRowKeys));
      if (selectedRows.length > 0) {
        console.log('se')
        console.log(selectedRows)
        let newlistRow = {}
        if (selectedRows.length === 1 ) {
          newlistRow =  {...selectedRows[0]};
          if (typeof (selectedRows[0].createdTime) == 'undefined' || selectedRows[0].createdTime== null  ) {
          } else {
            newlistRow.createdTime = moment(selectedRows[0].createdTime);
          }
          if (typeof (newlistRow.deadlineTime) == 'undefined' || selectedRows[0].deadlineTime== null) {
           } else {
             newlistRow.deadlineTime = moment(selectedRows[0].deadlineTime);
           }
           if (typeof (newlistRow.deadlineTime2) == 'undefined' || selectedRows[0].deadlineTime2 == null) {
          } else {
            newlistRow.deadlineTime2 = moment(selectedRows[0].deadlineTime2);
          }
          if (typeof (newlistRow.deadlineTime3) == 'undefined' || selectedRows[0].deadlineTime3 == null) {
          } else {
            newlistRow.deadlineTime3 = moment(selectedRows[0].deadlineTime3);
          }
          if (typeof (newlistRow.receiveTime) == 'undefined' || selectedRows[0].receiveTime == null) {
          } else {
            newlistRow.receiveTime = moment(selectedRows[0].receiveTime);
          }
          if (typeof (newlistRow.delayTime1) == 'undefined' || selectedRows[0].delayTime1 == null) {
          } else {
            newlistRow.delayTime1 = moment(selectedRows[0].delayTime1);
          }
          if (typeof (newlistRow.delayTime2) == 'undefined' || selectedRows[0].delayTime2 == null) {
          } else {
            newlistRow.delayTime2 = moment(selectedRows[0].delayTime2);
          }
          if (typeof (newlistRow.delayTime3) == 'undefined' || selectedRows[0].delayTime3 == null) {
          } else {
            newlistRow.delayTime3 = moment(selectedRows[0].delayTime3);
          }
          console.log(newlistRow)
        } else {
          newlistRow = {}
        }
        dispatch(setformValue([]));
        dispatch(setdelayformValue([]))
        dispatch(setformValue(newlistRow));
        dispatch(setdelayformValue(newlistRow));
        dispatch(setsidecreateformValue(newlistRow));
        dispatch(changesideSelectedKey([]))
        dispatch(sidetableAsync({upid:selectedRowKeys}));
      } else {
        dispatch(setformValue(selectedRows));
        dispatch(setdelayformValue(selectedRows));
        console.log(selectedRows)
      }
    },
  };
  const selectRow = (record: { id: any; }) => {
    console.log(record.id)
    console.log(selectedRowKeys)
    let newrowKeys = [...selectedRowKeys]
    // if (newrowKeys.indexOf(record.id) >= 0) {
    //   newrowKeys.splice(newrowKeys.indexOf(record.id), 1);
    // } else {
    //   newrowKeys.push(record.id);
    // }
    newrowKeys = [record.id]
    dispatch(changeSelectedKey(newrowKeys));
    if (newrowKeys.length > 0) {
      console.log('se')
      console.log(newrowKeys)
      let newlistRow = {}
      if (newrowKeys.length === 1 ) {
        const emptymainform = {
          id:'',
          docNumbers:'',
          docPages:'',
          fileCode:'',
          fileName:'',
          handleType:'',
          fileSendOffice:'',
          fileNumber:'',
          responsibleDepartment:'',
          secretariatComments:'',
          leaderComments:'',
          secrecyPeriod:'',
          secretLevel:'',
          receiveTime:undefined,
          deadlineTime:undefined,
          deadlineTime2:undefined,
          deadlineTime3:undefined
      }
       newlistRow = {..._.assign(emptymainform,record)}
        if (typeof (newrowKeys[0].createdTime) == 'undefined') {
        } else {
          newlistRow.createdTime = moment(record.createdTime);
        }
        if (typeof (newlistRow.deadlineTime) == 'undefined') {
         } else {
           newlistRow.deadlineTime = moment(record.deadlineTime);
         }
         if (typeof (newlistRow.deadlineTime2) == 'undefined') {
        } else {
          newlistRow.deadlineTime2 = moment(record.deadlineTime2);
        }
        if (typeof (newlistRow.deadlineTime3) == 'undefined') {
        } else {
          newlistRow.deadlineTime3 = moment(record.deadlineTime3);
        }
        if (typeof (newlistRow.receiveTime) == 'undefined') {
        } else {
          newlistRow.receiveTime = moment(record.receiveTime);
        }
        console.log('slee')
        console.log(newlistRow)
      } else {
        newlistRow = {}
      }
      dispatch(setformValue([]));
      dispatch(setformValue(newlistRow));
      dispatch(setdelayformValue([]))
      dispatch(setdelayformValue(newlistRow));
      dispatch(setsidecreateformValue(newlistRow));
      dispatch(changesideSelectedKey([]))
      dispatch(sidetableAsync({upid:record.id}));
  }}
  return (
    <div>
      <Table className={relatedPartyMaint}
        columns={columns}
        dataSource={mainTablevalue.value.data}
        loading={mainTablevalue.status === 'loading'}
        rowKey={'id'}
        pagination={false} size="small"
        rowSelection={rowSelection}
        scroll={{ x: 1900,y:550 }}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          },
        })}
        bordered
      ></Table>
      <Pagination
      showTotal={showTotal}
        current={mainTablevalue.pagination.current}
        total={mainTablevalue.pagination.total}
        showSizeChanger
        pageSizeOptions={[10, 20, 50, 100,200]}
        pageSize={mainTablevalue.pagination.pageSize}
        onChange={onPageChange}
        style={{ float: 'right' }}
      />
    </div>
  );
}
