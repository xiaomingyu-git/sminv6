import axios from 'axios';
import type { SortOrder } from 'antd/es/table/interface';
import { toSort, paramsSerializer } from '../utils/PageUtils';

const url = '/files';
const urlsec = '/fileHandle'
// 上面的table
export async function readFirstTable(
  page: PageRequest,
  sort: Record<string, SortOrder>,
) {
  const res = await axios.get<Page<FirstTableListType>>(url, {
    params: {
      ...page,
      sort: toSort(sort),
    },
    paramsSerializer,
  });
  return res.data;
}
//新建表单之前 获取新表单应该有的收文编号
export async function readFirstTablenextFileCode() {
  const res = await axios.get(url + '/nextFileCode');
  return res.data;
}
// 新建表单调用的接口
export async function createFirstTablelist(item: Partial<FirstTableListType>) {
  const res = await axios.post(url, item);
  return res.data;
}
//第二个新建表单调用
export async function createSecTablelist(item: Partial<EditableTableListType>) {
  const res = await axios.post(urlsec, item);
  return res.data;
}

//修改表单调用接口
export async function modifyFirstTablelist(item: Partial<FirstTableListType>) {
  const res = await axios.put(url, item);
  return res.data;
}

//修改延期表单调用接口
export async function modifyDelayFirstTablelist(item: Partial<FirstTableListType>) {
  const res = await axios.put('/fileDelayInfo', item);
  return res.data;
}
export async function modifySecTablelist(item: Partial<EditableTableListType>) {
    console.log('item')
    console.log(item)
  const res = await axios.put(urlsec, item);
  return res.data;
}
// 删除表单一项
export async function removeFirstTablelist(ids: number) {
  console.log(ids)
  const res = await axios.delete(url+ `?idList=${ids}`);
  return res.data;
}
export async function removeSecTablelist(record:EditableTableListType) {
  const id = record.id
  const res = await axios.delete(urlsec, {
    params: {
      id
    }
  });
  return res.data;
}
//根据id获取延期表单

export async function getFirstTableDelaybyid(id: number) {
  const res = await axios.get(`/fileDelayInfo/${id}`);
  return res.data;
}
// 修改状态到完结
export async function changeFirstTablelist(id: number) {
  const res = await axios.post(`/files/${id}`);
  return res.data;
}


//修改办截状态
export async function changeNextTablelist(id: number) {
  const res = await axios.post(`/files/handleFinish/${id}`);
  return res.data;
}
//打印功能
export async function filePrinting(id: number) {
    const res = await axios.get(`/files/${id}/printing`);
    return res.data;
}
export async function fileRecord(value: any) {
    const res = await axios.get(`/files/exports/3?exportsId=${value}`);
    return res.data;
}
export async function fileTime(firstvalue: any,secvalue:any) {
    const res = await axios.get(`/files/exports/2?receiveTimeStart=${firstvalue}&&receiveTimeEnd=${secvalue}`);
    return res.data;
}
export async function fileStatus(firstvalue: any,secvalue:any) {
    const res = await axios.get(`/files/exports/4?receiveTimeStart=${firstvalue}&&receiveTimeEnd=${secvalue}`);
    return res.data;
}


export async function fileExportall() {
    const res = await axios.get(`/files/exports/1`);
    return res.data;
}
//第二个可编辑的table
export async function readeditableTable(
  page: PageRequest,
  sort: Record<string, SortOrder>,
) {
  const res = await axios.get<Page<EditableTableListType>>(urlsec, {
    params: {
      ...page,
      sort: toSort(sort),
    },
    paramsSerializer,
  });
  console.log(res)
  return res.data;
}

export async function postFilebyidList(id: number, params: any) {
  const configs = { headers: { 'Content-Type': 'multipart/form-data' } };
  const res = await axios.post(`/files/${id}/attachment`, params, configs);
  return res;
}
