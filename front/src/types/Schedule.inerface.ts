export interface IFaculty {
  id: string;
  title: string;
}

export interface IDepartment {
  id: string;
  title: string;
}

export interface IGroup {
  id: string;
  title: string;
  students: string;
  faculty: IFaculty;
  department: IDepartment;
  course: string;
}

export interface ILesson {
  id: string;
  timeStart: string;
  timeEnd: string;
  groups: IGroup[];
  label: string;
  type: string;
  title: string;
  address: string;
  room: string;
}

interface IScheduleDay {
  num: string;
  count: number;
  date: string;
  lessons?: ILesson[];
}

export interface IScheduleResponse {
  count: number;
  days: IScheduleDay[];
}
