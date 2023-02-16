import React, { useEffect, useState } from 'react';
import type { RootState } from '../../app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  sidetableAsync,
  selectSidetable,
  changePage,
  changesideSelectedKey,
} from './sidetableSlice';
import {relatedPartyMaint} from '../../pages/index.less'
import { setsidemodalformValue } from '../postsidemodel/sidemodalSlice';
import { Button, Table, Pagination, Tooltip } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
export function Sidetable() {
  const sidetablevalue = useAppSelector(selectSidetable);
  const selectedRowKeys = sidetablevalue.selectedRowKeys;
  const dispatch = useAppDispatch();
  const columns: ColumnsType<FirstTableListType>[] = [
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        valueType: 'date',
        width:120
      },
      {
        title: '预计结束时间',
        dataIndex: 'expectFinishTime',
        valueType: 'date',
        width:120
      },
      {
        title: '承办人',
        dataIndex: 'handledBy',
        width:100
      },
      {
        title: '承办单位',
        dataIndex: 'handledByDepartment',
      },
  ];
  const onPageChange = async (value, pageSize) => {
    await dispatch(changePage({ current: value, pageSize }));
    dispatch(sidetableAsync(sidetablevalue.pagination));
  };

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    type:'radio',
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
      dispatch(changesideSelectedKey(selectedRowKeys));
      if (selectedRows.length > 0) {
        const newlistRow = { ...selectedRows[0] };
        newlistRow.createdTime = moment(selectedRows[0].createdTime);
        newlistRow.expectFinishTime = moment(selectedRows[0].expectFinishTime);
        dispatch(setsidemodalformValue(newlistRow));
      } else {
        dispatch(setsidemodalformValue(selectedRows));
      }
    },
  };
   const selectRow = (record: { id: any; createdTime:any;expectFinishTime:any}) => {
       let newrowKeys = [...selectedRowKeys]
         newrowKeys = [record.id]
         const newlistRow = { ...record };
         newlistRow.createdTime = moment(record.createdTime);
         newlistRow.expectFinishTime = moment(record.expectFinishTime);
         dispatch(changesideSelectedKey(newrowKeys));
         dispatch(setsidemodalformValue(newlistRow));
   }
  return (
    <div>
      <Table size="small" className={relatedPartyMaint}
        columns={columns}
        dataSource={sidetablevalue.value.data}
        loading={sidetablevalue.status === 'loading'}
        rowKey={'id'}
        pagination={false}
        rowSelection={rowSelection}
        scroll={{y:150}}
        onRow={(record) => ({
          onClick: () => {
            selectRow(record);
          },
        })}
        bordered
      ></Table>
      <Pagination
        current={sidetablevalue.pagination.current}
        total={sidetablevalue.pagination.total}
        showSizeChanger
        pageSize={sidetablevalue.pagination.pageSize}
        onChange={onPageChange}
        style={{ float: 'right' ,display:'none'}}
      />
    </div>
  );
}
