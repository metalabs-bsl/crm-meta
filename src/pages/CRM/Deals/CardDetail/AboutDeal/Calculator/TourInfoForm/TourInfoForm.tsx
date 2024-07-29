import { FC, useRef, useState } from 'react';
import cn from 'classnames';
import { Options } from 'types/pages';
import { DatePicker, Input, MultipleSelect, Select } from 'common/ui';
import { Accordion, DropdownModal } from 'common/components';
import { ITourData } from 'types/entities/leads';
import { PassengersCount } from './PassengersCount';
import { brandOptions, categoryTourTimeOptions, PassengerCounts, servicesOptions } from './TourInfoForm.helper';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';

interface IProps {
  setServises: (data: Options[]) => void;
}

export const TourInfoForm: FC<IProps> = ({ setServises }) => {
  const passengersRef = useRef(null);
  const [isOpenPassengersModal, setIsOpenPassengersModal] = useState<boolean>(false);
  const [isEditTourInfo, setIsEditTourInfo] = useState<boolean>(false);
  const isEditable = !isEditTourInfo;
  const [passengerCounts, setPassengerCounts] = useState<PassengerCounts>({
    adults: 0,
    children: 0
  });
  const { register, getValues, setValue } = useForm<ITourData>();

  const onClosePassengersModal = () => {
    setIsOpenPassengersModal(false);
  };

  const onClickPassengersItem = () => {
    if (!isEditable) setIsOpenPassengersModal(!isOpenPassengersModal);
  };

  return (
    <Accordion title='Информация о туре' onEditAction={() => setIsEditTourInfo(!isEditTourInfo)} isEdit={isEditTourInfo}>
      <form className={styles.form}>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Номер брони в СТ</label>
            <Input
              {...register('booking_number', { required: 'обязательное поле' })}
              placeholder='Не заполнено'
              className={styles.inp_wrapper}
              disabled={isEditable}
            />
          </div>
          <div className={styles.item_block}>
            <label>Бренд</label>
            <Select
              {...register('brand', { required: 'обязательное поле' })}
              options={brandOptions}
              className={styles.select}
              disabled={isEditable}
            />
          </div>
          <div className={styles.item_block}>
            <label>Отель</label>
            <Input
              {...register('hotel', { required: 'обязательное поле' })}
              placeholder='Не заполнено'
              className={styles.inp_wrapper}
              disabled={isEditable}
            />
          </div>
          <div className={styles.item_block}>
            <label>Категория срока тура</label>
            <Select
              {...register('tour_category', { required: 'обязательное поле' })}
              options={categoryTourTimeOptions}
              className={styles.select}
              disabled={isEditable}
            />
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Город вылета</label>
            <Input
              {...register('departure_city', { required: 'обязательное поле' })}
              placeholder='Не выбрано'
              className={styles.inp_wrapper}
              disabled={isEditable}
            />
          </div>
          <div className={styles.item_block}>
            <label>Город прилета</label>
            <Input
              {...register('arrival_city', { required: 'обязательное поле' })}
              placeholder='Не выбрано'
              className={styles.inp_wrapper}
              disabled={isEditable}
            />
          </div>
          <div className={styles.item_block}>
            <label>Количество пассажиров</label>
            <div className={cn(styles.passengers, { [styles.isDisabled]: isEditable })} ref={passengersRef} onClick={onClickPassengersItem}>
              {passengerCounts.adults} взрослых (12+), {passengerCounts.children} ребенок (0 - 11)
            </div>
            <DropdownModal targetRef={passengersRef} isOpen={isOpenPassengersModal} onClose={onClosePassengersModal}>
              <PassengersCount passengerCounts={passengerCounts} setPassengerCounts={setPassengerCounts} />
            </DropdownModal>
          </div>
        </div>
        <div className={styles.blocks}>
          <div className={styles.item_block}>
            <label>Дата вылета</label>
            <DatePicker className={styles.datepicker} disabled={isEditable} />
          </div>
          <div className={styles.item_block}>
            <label>Дата прилета</label>
            <DatePicker className={styles.datepicker} disabled={isEditable} />
          </div>
          <div className={styles.item_block}>
            <label>Услуга</label>
            <MultipleSelect onChange={setServises} options={servicesOptions} disabled={isEditable} placeholder='не выбрано' />
          </div>
        </div>
      </form>
    </Accordion>
  );
};
