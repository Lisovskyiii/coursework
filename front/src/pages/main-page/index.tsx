import { useState } from 'react';
import cn from 'classnames';
import { toFormatRangeInput } from 'utils/Time.utils';

import { AddReport } from '../../components/add-report';
import { CardList } from '../../modules/card-list';
import { ModalMain } from '../../modules/modal-main';

import styles from './style.module.scss';

export const MainPage = (): JSX.Element => {
  const [activeModal, setActiveModal] = useState(false);
  const [startDate, setStartDate] = useState<string>(toFormatRangeInput().monday);
  const [endDate, setEndDate] = useState<string>(toFormatRangeInput().sunday);

  const onChangeStartDate = (date: string) => {
    setStartDate(date);
  };

  const onChangeEndDate = (date: string) => {
    setEndDate(date);
  };

  const onAddReport = (): void => {
    setActiveModal(true);
  };

  const onCloseModal = (): void => {
    setActiveModal(false);
  };

  return (
    <>
      <ModalMain
        onChangeStartDate={onChangeStartDate}
        className={cn(styles.modalMain, { [styles.active]: activeModal })}
        onCloseModal={onCloseModal}
        activeModal={activeModal}
      />
      <AddReport className={styles.addReport} onAddReport={onAddReport} />
      <CardList
        startDate={startDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
        onChangeStartDate={onChangeStartDate}
        className={styles.cardList}
      />
    </>
  );
};
