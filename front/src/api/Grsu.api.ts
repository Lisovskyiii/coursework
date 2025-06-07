import { apiClient } from 'api';

type IScheduleBody = {
  dateStart: string;
  dateEnd: string;
};

export const getSchedule = async (body: IScheduleBody) => {
  try {
    const response = await apiClient.get(
      `/grsu/schedule?dateStart=${body.dateStart}&dateEnd=${body.dateEnd}`
    );

    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};

export const getGroups = async () => {
  try {
    const response = await apiClient.get('/auth/me');

    return response.data;
  } catch (error) {
    console.log(error);

    return error;
  }
};
