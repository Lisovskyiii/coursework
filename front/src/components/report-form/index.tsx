import { useEffect, useMemo, useState } from 'react';
import { createReport } from 'api/Report.api';
import { isAxiosError } from 'axios';
import { FormField } from 'components/form-field';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useWebSocket } from 'hooks/useWebsoket';
import { IScheduleResponse } from 'types/Schedule.inerface';
import { Button } from 'ui/button';
import { Modal } from 'ui/modal';
import Spinner from 'ui/spinner';
import { formatDateToDMY, toFormatDateForInput } from 'utils/Time.utils';
import { ValidateSchemaReportType } from 'utils/ValidateForm';

import close from '../../assets/icons/close.svg';

import styles from './style.module.scss';

interface IReportFormProps {
  className?: string;
  date: Date;
  onCloseModal: () => void;
  handleChangeDate: (date: string) => void;
  schedule: IScheduleResponse | null;
  validateSchema: ValidateSchemaReportType;
  isLoading: boolean;
  onChangeStartDate: (date: string) => void;
}

const generateOptions = (schedule: IScheduleResponse) =>
  schedule.days[0].lessons?.map((lesson, i) => ({
    title: `${i + 1}. ${lesson.timeStart}-${lesson.timeEnd} ${lesson.title}
 (${lesson.type}), ${lesson.address}, ${lesson.room} `,
    lesson_id: lesson.id
  }));

const generateGroupsOptions = (schedule: IScheduleResponse, lessonId: string) => {
  const lesson = schedule.days[0]?.lessons?.find((lesson: any) => lesson.id === lessonId);

  return lesson?.groups;
};

export const ReportForm = ({
  className,
  validateSchema,
  handleChangeDate,
  schedule,
  onCloseModal,
  isLoading,
  date,
  onChangeStartDate
}: IReportFormProps): JSX.Element => {
  const [taskId, setTaskId] = useState<string | null>(null);
  const [startDate, setStartDate] = useState('');
  const [isWsEnabled, setIsWsEnabled] = useState(true); // Управление подключением

  const { status, messages } = useWebSocket({
    url: taskId ? `${process.env.REACT_APP_WS_URL_BASE}/report/ws/progress/${taskId}` : '',
    enabled: isWsEnabled
  });

  const lastMessage = messages.pop()?.progress;

  const dataOptions = useMemo(() => {
    if (!schedule?.days?.length) {
      return [];
    }

    return generateOptions(schedule);
  }, [schedule]);

  useEffect(() => () => setIsWsEnabled(false), []);

  useEffect(() => {
    if (lastMessage === 100) {
      onCloseModal();
      onChangeStartDate(startDate);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [lastMessage, status]);

  return (
    <Modal className={className} type="addForm">
      {isWsEnabled && status !== 'disconnected' ? (
        <div className={styles.loading}>
          <Spinner size={140} />
          <span>{lastMessage ? `Идентификация: ${lastMessage}%` : 'Ожидание...'}</span>
        </div>
      ) : (
        <Formik
          initialValues={{
            dateStart: toFormatDateForInput(date),
            subject: '',
            file: null as File | null,
            group: ''
          }}
          validationSchema={validateSchema}
          onSubmit={async (values) => {
            if (values.file) {
              const formData = new FormData();

              formData.append('file', values.file);

              try {
                const response = await createReport({
                  group_id: values.group,
                  lesson_id: values.subject,
                  formData,
                  date: formatDateToDMY(values.dateStart)
                });

                // Устанавливаем taskId для WebSocket
                setStartDate(values.dateStart);
                setTaskId(response.task);
                setIsWsEnabled(true); // Разрешаем подключение
                // onCloseModal();
              } catch (error) {
                if (isAxiosError(error)) {
                  console.log(error.message);
                  alert(error.message);
                }
              }

              // onCloseModal();
            }
          }}
        >
          {({ isSubmitting, resetForm, values, setFieldValue }) => (
            <Form className={styles.reportForm}>
              <h2 className={styles.title}>Заполните форму</h2>
              <button
                type="button"
                className={styles.close}
                onClick={() => {
                  onCloseModal();
                  resetForm();
                }}
                onKeyDown={() => {
                  onCloseModal();
                  resetForm();
                }}
              >
                <img src={close} alt="close" />
              </button>

              <FormField
                onChangeInput={handleChangeDate}
                classInput={styles.input}
                name="dateStart"
                type="date"
              />
              {isLoading ? (
                <Spinner size={100} margin="20 auto" />
              ) : (
                schedule && (
                  <>
                    {' '}
                    {dataOptions && dataOptions.length > 0 ? (
                      <>
                        <Field
                          className={styles.classes}
                          placeholder="Email"
                          name="subject"
                          as="select"
                        >
                          <option value="" disabled={true} hidden={true}>
                            Выберите предмет
                          </option>
                          {dataOptions?.map((option) => (
                            <option key={option.lesson_id} value={option.lesson_id}>
                              {option.title}
                            </option>
                          ))}
                        </Field>

                        <ErrorMessage name="subject" className={styles.error} component="div" />
                      </>
                    ) : (
                      <div className={styles.empty}>В данный день нету занятий</div>
                    )}
                    {values.subject && (
                      <Field
                        className={styles.classes}
                        placeholder="Группа"
                        name="group"
                        as="select"
                      >
                        <option value="" disabled={true} hidden={true}>
                          Выберите группу
                        </option>
                        {generateGroupsOptions(schedule, values.subject)?.map((option: any) => (
                          <option key={option.id} value={option.id}>
                            {option.title}
                          </option>
                        ))}
                      </Field>
                    )}
                    {values.group && (
                      <input
                        id="file-upload"
                        name="file"
                        type="file"
                        accept="image/*"
                        className={styles.file}
                        onChange={(event) => {
                          setFieldValue('file', event.currentTarget.files?.[0] || null);
                        }}
                      />
                    )}
                    <Button className={styles.button} type="submit" disabled={isSubmitting}>
                      Отправить
                    </Button>
                  </>
                )
              )}
            </Form>
          )}
        </Formik>
      )}
    </Modal>
  );
};
