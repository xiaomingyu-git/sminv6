// 权限
type FirstTableListType =   {
    attachment?: string; // 附件
    createdTime?: Date; // 时间
    deadlineTime?: Date; // 截止时间
    deleted?: number; // 0
    fileCode?: string; // 收文编号
    fileCounts?: string; // 份数
    fileName?: string; // 文件名称
    fileNumber?: string  // 文号
    fileSendOffice?: string //发文机关
    handleType?: string // 办理类型
    id?: string  // id  //
    modifyTime?: Date // 更新时间 //
    receiveTime?: Date // 收文时间 //
    receiveTimeEnd?: Date // 收文时间截止 //
    responsibleDepartment?: string // 责任部门 //
    secrecyPeriod?: string // 保密期限 //
    secretLevel?: string // 密级  //
    secretariatComments?: string // 秘书处意见 //
    status?: string //     //
    sort?: string // 排序  //
    realname?:string
  };
  type EditableTableListType ={
    createdTime?: Date; // 时间
    handledBy?:string;
    handledByDepartment?:string;
    expectFinishTime?:Date;
    id:React.Key;
    upid?:number;
    realname?:string
  }