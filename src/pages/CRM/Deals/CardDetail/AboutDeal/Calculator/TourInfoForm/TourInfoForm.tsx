import { FC, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import cn from 'classnames';
import { Options } from 'types/pages';
import { DatePicker, Input, Loading, MultipleSelect, Select } from 'common/ui';
import { Accordion, DropdownModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useSetTourDataMutation } from 'api/admin/leads/endpoints/calculator';
import { ITourData } from 'types/entities/leads';
import { PassengersCount } from './PassengersCount';
import { brandOptions, categoryTourTimeOptions, PassengerCounts, servicesOptions } from './TourInfoForm.helper';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';

interface IProps {
  formProps?: ITourData;
  calcId?: string;
}

export const TourInfoForm: FC<IProps> = ({ calcId, formProps }) => {
  const notify = useNotify();
  const [postTourData, { isLoading }] = useSetTourDataMutation();
  const passengersRef = useRef(null);
  const [isOpenPassengersModal, setIsOpenPassengersModal] = useState<boolean>(false);
  const [isEditTourInfo, setIsEditTourInfo] = useState<boolean>(false);
  const [passengerCounts, setPassengerCounts] = useState<PassengerCounts>({
    adults: 0,
    children: 0
  });
  const isEditable = !isEditTourInfo;
  const { register, getValues, setValue } = useForm<ITourData>({
    defaultValues: {
      brand: brandOptions[0].value as string,
      tour_category: categoryTourTimeOptions[0].value as string
    }
  });
  const [servises, setServises] = useState<Options[]>([]);

  const onClosePassengersModal = () => {
    setIsOpenPassengersModal(false);
  };

  const onClickPassengersItem = () => {
    if (!isEditable) setIsOpenPassengersModal(!isOpenPassengersModal);
  };

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof ITourData];
        if ((key === 'departure_date' || key === 'arrival_date') && typeof value === 'string') {
          setValue(key as keyof ITourData, dayjs(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof ITourData, formProps[key as keyof ITourData]);
        }
        setPassengerCounts({ adults: formProps.adult_passengers, children: formProps.child_passengers });
      });

      setServises(servicesOptions.filter((option) => formProps?.services?.includes(option.value as string)));
    }
  }, [formProps, setValue]);

  const onSubmit = () => {
    if (calcId) {
      const data = getValues();
      const updatedServises = servises.map((i) => i.value as string);
      const sendingData: ITourData = {
        ...data,
        services: updatedServises,
        adult_passengers: passengerCounts.adults,
        child_passengers: passengerCounts.children,
        id: formProps?.id,
        calculator: {
          id: calcId
        }
      };
      postTourData(sendingData)
        .unwrap()
        .then(() => {
          notify(MESSAGE.UPDATED, 'success');
          setIsEditTourInfo(!isEditTourInfo);
        });
    }
  };

  return (
    <Accordion
      title='Информация о туре'
      onEditAction={() => setIsEditTourInfo(!isEditTourInfo)}
      isEdit={isEditTourInfo}
      onSaveAction={onSubmit}
    >
      <Loading isSpin={isLoading}>
        <form className={styles.form}>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Номер брони в СТ</label>
              <Input
                {...register('booking_number', { required: 'обязательное поле' })}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
                type='number'
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
              <div
                className={cn(styles.passengers, { [styles.isDisabled]: isEditable })}
                ref={passengersRef}
                onClick={onClickPassengersItem}
              >
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
              <DatePicker
                {...register('departure_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
            </div>
            <div className={styles.item_block}>
              <label>Дата прилета</label>
              <DatePicker
                {...register('arrival_date', { required: 'обязательное поле' })}
                className={styles.datepicker}
                disabled={isEditable}
              />
            </div>
            <div className={styles.item_block}>
              <label>Услуга</label>
              <MultipleSelect
                onChange={setServises}
                options={servicesOptions}
                disabled={isEditable}
                placeholder='не выбрано'
                defaultValue={servises}
              />
            </div>
          </div>
        </form>
      </Loading>
    </Accordion>
  );
};
