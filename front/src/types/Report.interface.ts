import { IDepartment, IFaculty } from './Schedule.inerface';

interface IReport {
  id: number;
  image_url: string;
}

interface IGroupReport {
  title: string;
  id: string;
  students: number;
  faculty: IFaculty;
  departament: IDepartment;
  report: IReport;
}

export interface ILessonReport {
  id: string;
  title: string;
  type: string;
  date: string;
  time_start: string;
  time_end: string;
  address: string;
  room: string;
  groups: IGroupReport[];
}

export interface IScheduleReports {
  count: number;
  lessons: ILessonReport[];
}

// students report

export interface IStudent {
  id: string;
  name: string;
  detected: boolean;
}

export interface IStudentsReport {
  report_id: number;
  image_url: string;
  students: IStudent[];
}
