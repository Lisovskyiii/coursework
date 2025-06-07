import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { ILessonReport, IScheduleReports } from 'types/Report.interface';

import { useHttp } from '../../../hooks/useHttp';

const reportsAdapter = createEntityAdapter<ILessonReport>();

interface IInitialStateReports {
  ids: string[];
  entities: { [key: string]: ILessonReport };
  reportsLoadingStatus: 'idle' | 'loading' | 'error';
}

const initialState: IInitialStateReports = reportsAdapter.getInitialState({
  reportsLoadingStatus: 'idle'
});

type FetchReportsParams = {
  dateStart?: string;
  dateEnd?: string;
};

export const fetchReports = createAsyncThunk(
  'reports/fetchReports',
  async ({ dateStart, dateEnd }: FetchReportsParams = {}) => {
    const { request } = useHttp();

    const params = new URLSearchParams();

    if (dateStart) params.append('dateStart', dateStart);
    if (dateEnd) params.append('dateEnd', dateEnd);

    const url = `${process.env.REACT_APP_PUBLIC_URL}/report?${params.toString()}`;

    return request<IScheduleReports>({ url, withCredentials: true });
  }
);

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    reportAdd: (state, action) => {
      reportsAdapter.addOne(state, action.payload);
    },
    reportDelete: (state, action) => {
      reportsAdapter.removeOne(state, action.payload);
    }
  },
  extraReducers: (builder) => {
    /* eslint-disable no-param-reassign */
    builder
      .addCase(fetchReports.pending, (state) => {
        state.reportsLoadingStatus = 'loading';
      })
      .addCase(fetchReports.fulfilled, (state, action) => {
        state.reportsLoadingStatus = 'idle';
        reportsAdapter.setAll(state, action.payload.lessons);
      })
      .addCase(fetchReports.rejected, (state) => {
        state.reportsLoadingStatus = 'error';
      })
      .addDefaultCase(() => {});
    /* elsint-enable no-param-reassign */
  }
});

const { reducer, actions } = reportsSlice;

export const { selectAll, selectById } = reportsAdapter.getSelectors(
  (state: RootState) => state.reports
);

export default reducer;

export const { reportAdd, reportDelete } = actions;
