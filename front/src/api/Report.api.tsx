import { apiClient } from 'api';

type IReportBody = {
  lesson_id: string;
  group_id: string;
  formData: FormData;
  date: string;
};

export const createReport = async (body: IReportBody) => {
  try {
    const response = await apiClient.post(
      `/report/create?group_id=${body.group_id}&lesson_id=${body.lesson_id}&date=${body.date}`,
      body.formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );

    return response.data;
  } catch (error) {
    console.log(error);

    throw error;
  }
};
