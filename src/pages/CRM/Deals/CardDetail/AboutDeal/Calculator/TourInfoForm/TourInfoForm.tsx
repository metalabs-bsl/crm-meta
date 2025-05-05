import { FC, useEffect, useRef, useState } from 'react';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import cn from 'classnames';
import { DatePicker, Input, Loading, MultipleSelect, Select } from 'common/ui';
import { Accordion, DropdownModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useSetTourDataMutation } from 'api/admin/leads/endpoints/calculator';
import { Options } from 'types/common';
import { ITourData } from 'types/entities/leads';
import { PassengersCount } from './PassengersCount';
import { categoryTourTimeOptions, PassengerCounts } from './TourInfoForm.helper';
import styles from './styles.module.scss';

import { useForm } from 'react-hook-form';

extend(utc);

interface IProps {
  formProps?: ITourData;
  calcId?: string;
  servicesOptions: Options[];
  brandOptions: Options[];
}

export const TourInfoForm: FC<IProps> = ({ calcId, formProps, servicesOptions, brandOptions }) => {
  const [brandInput, setBrandInput] = useState('');
  const [filteredBrands, setFilteredBrands] = useState<Options[]>([]);
  const notify = useNotify();
  const [postTourData, { isLoading }] = useSetTourDataMutation();
  const passengersRef = useRef(null);
  const [isOpenPassengersModal, setIsOpenPassengersModal] = useState<boolean>(false);
  const [isEditTourInfo, setIsEditTourInfo] = useState<boolean>(true);
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const [passengerCounts, setPassengerCounts] = useState<PassengerCounts>({
    adults: 0,
    children: 0,
    children_old: 0
  });
  const isEditable = !isEditTourInfo;
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm<ITourData>({
    defaultValues: {
      brand: brandOptions[0].value as string,
      tour_category: categoryTourTimeOptions[0].value as string
    }
  });
  const [servises, setServises] = useState<Options[]>([]);
  const [isUserTyping, setIsUserTyping] = useState(false);

  const onClosePassengersModal = () => {
    setIsOpenPassengersModal(false);
  };

  console.log('tour data', formProps);

  const onClickPassengersItem = () => {
    if (!isEditable) setIsOpenPassengersModal(!isOpenPassengersModal);
  };

  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureSuggestions, setDepartureSuggestions] = useState<string[]>([]);
  const [arrivalSuggestions, setArrivalSuggestions] = useState<string[]>([]);

  const fetchCities = async (query: string, setSuggestions: React.Dispatch<React.SetStateAction<string[]>>) => {
    try {
      const response = await fetch(process.env.REACT_APP_BASE_URL + `/leadsCalculator/cities/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
      setSuggestions(data);
    } catch (error) {
      console.error('Error fetching cities:', error);
      setSuggestions([]);
    }
  };
  useEffect(() => {
    if (!isUserTyping || brandInput.trim() === '') {
      setFilteredBrands([]);
      return;
    }

    const filtered = brandOptions.filter((option) => option.label.toLowerCase().includes(brandInput.toLowerCase()));
    setFilteredBrands(filtered);
  }, [brandInput, brandOptions, isUserTyping]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (departureCity) {
        fetchCities(departureCity, setDepartureSuggestions);
      }
    }, 300);

    if (departureCity === '') {
      setDepartureSuggestions([]);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [departureCity]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (arrivalCity) {
        fetchCities(arrivalCity, setArrivalSuggestions);
      }
    }, 300);

    if (arrivalCity === '') {
      setArrivalSuggestions([]);
    }

    return () => clearTimeout(delayDebounceFn);
  }, [arrivalCity]);

  const handleSuggestionClick = (suggestion: string, type: 'departure' | 'arrival') => {
    if (type === 'arrival') {
      setValue('arrival_city', suggestion);
      setArrivalSuggestions([]);
    } else {
      setValue('departure_city', suggestion);
      setDepartureSuggestions([]);
    }
  };

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof ITourData];
        if ((key === 'departure_date' || key === 'arrival_date') && typeof value === 'string') {
          setValue(key as keyof ITourData, dayjs.utc(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof ITourData, formProps[key as keyof ITourData]);
        }
        setPassengerCounts({
          adults: formProps.adult_passengers,
          children: formProps.child_passengers,
          children_old: formProps.child_passengers_older
        });
      });

      const servicesIds = formProps.services.map((service) => String(service.id));
      servicesOptions && setServises(servicesOptions.filter((option) => servicesIds.includes(String(option.value))));
    }
  }, [formProps, servicesOptions, setValue]);

  useEffect(() => {
    if (formProps?.brand) {
      const brandOption = brandOptions.find((option) => option.value === formProps.brand);
      if (brandOption) {
        setBrandInput(brandOption.label);
        setValue('brand', formProps.brand);
        setIsUserTyping(false);
      }
    }
  }, [formProps, brandOptions, setValue]);

  const onSubmit = handleSubmit(() => {
    if (calcId) {
      const data = getValues();
      const updatedServises = servises.map((i) => ({ id: String(i.value) }));
      const sendingData: ITourData = {
        ...data,
        services: updatedServises,
        adult_passengers: passengerCounts.adults,
        child_passengers: passengerCounts.children,
        child_passengers_older: passengerCounts.children_old,
        id: formProps?.id,
        calculator: {
          id: calcId
        }
      };
      if (sendingData.arrival_date === '') {
        delete sendingData.arrival_date;
      }

      if (sendingData.departure_date === '') {
        delete sendingData.departure_date;
      }
      console.log('Данные перед отправкой:', sendingData);
      postTourData(sendingData)
        .unwrap()
        .then((response) => {
          console.log('Ответ от сервера:', response);
          notify(MESSAGE.UPDATED, 'success');
          setIsEditTourInfo(!isEditTourInfo);
        })
        .catch((error) => {
          console.error('Ошибка при отправке данных:', error);
        });
    }
  });
  return (
    <Accordion
      title='Информация о туре'
      onEditAction={() => setIsEditTourInfo(!isEditTourInfo)}
      isEdit={isEditTourInfo}
      onSaveAction={onSubmit}
      isOpenDefault={true}
    >
      <Loading isSpin={isLoading}>
        <form className={styles.form}>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Номер брони в СТ</label>
              <Input
                {...register('booking_number')}
                placeholder='Не заполнено'
                className={styles.inp_wrapper}
                disabled={isEditable}
                type='number'
              />
            </div>
            {brandOptions && (
              <div className={styles.item_block}>
                <label>Бренд</label>
                <Input
                  {...register('brand', { required: 'обязательное поле' })}
                  disabled={isEditable}
                  value={brandInput}
                  placeholder='Начните вводить бренд'
                  className={styles.inp_wrapper}
                  onChange={(e) => {
                    setIsUserTyping(true);
                    setBrandInput(e.target.value);
                    setValue('brand', e.target.value);
                  }}
                />
                {!isEditable && filteredBrands.length > 0 && (
                  <div className={styles.suggestions}>
                    {filteredBrands.map((option) => (
                      <div
                        key={option.value}
                        className={styles.suggestionItem}
                        onClick={() => {
                          setBrandInput(option.label);
                          setValue('brand', String(option.value));
                          setFilteredBrands([]);
                          setIsUserTyping(false);
                        }}
                      >
                        {option.label}
                      </div>
                    ))}
                  </div>
                )}
                {errors.brand && <p className={styles.error}>{errors.brand.message}</p>}
              </div>
            )}
            <div className={styles.item_block}>
              <label>Отель</label>
              <Input {...register('hotel')} placeholder='Не заполнено' className={styles.inp_wrapper} disabled={isEditable} />
              {errors.hotel && <p className={styles.error}>{errors.hotel.message}</p>}
            </div>
            <div className={styles.item_block}>
              <label>Категория срока тура</label>
              <Select {...register('tour_category')} options={categoryTourTimeOptions} className={styles.select} disabled={isEditable} />
              {errors.tour_category && <p className={styles.error}>{errors.tour_category.message}</p>}
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Город вылета</label>
              <Input
                {...register('departure_city')}
                placeholder='Не выбрано'
                className={styles.inp_wrapper}
                disabled={isEditable}
                onChange={(e) => setDepartureCity(e.target.value)}
              />
              {errors.departure_city && <p className={styles.error}>{errors.departure_city.message}</p>}

              <div className={styles.suggestions}>
                {Array.isArray(departureSuggestions) &&
                  departureSuggestions.map((city, index) => (
                    <div key={index} onClick={() => handleSuggestionClick(city, 'departure')}>
                      {city}
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.item_block}>
              <label>Город прилета</label>
              <Input
                {...register('arrival_city')}
                placeholder='Не выбрано'
                className={styles.inp_wrapper}
                disabled={isEditable}
                onChange={(e) => setArrivalCity(e.target.value)}
              />
              {errors.arrival_city && <p className={styles.error}>{errors.arrival_city.message}</p>}

              <div className={styles.suggestions}>
                {Array.isArray(arrivalSuggestions) &&
                  arrivalSuggestions.map((city, index) => (
                    <div key={index} onClick={() => handleSuggestionClick(city, 'arrival')}>
                      {city}
                    </div>
                  ))}
              </div>
            </div>
            <div className={styles.item_block}>
              <label>Количество пассажиров</label>
              <div
                className={cn(styles.passengers, { [styles.isDisabled]: isEditable })}
                ref={passengersRef}
                onClick={onClickPassengersItem}
              >
                {passengerCounts.adults} взрослых (12+), {passengerCounts.children} ребенок (3 - 11)
              </div>
              <DropdownModal targetRef={passengersRef} isOpen={isOpenPassengersModal} onClose={onClosePassengersModal}>
                <PassengersCount passengerCounts={passengerCounts} setPassengerCounts={setPassengerCounts} />
              </DropdownModal>
            </div>
          </div>
          <div className={styles.blocks}>
            <div className={styles.item_block}>
              <label>Дата вылета</label>
              <DatePicker {...register('departure_date')} className={styles.datepicker} disabled={isEditable} />
              {errors.departure_date && <p className={styles.error}>{errors.departure_date.message}</p>}
            </div>
            <div className={styles.item_block}>
              <label>Дата прилета</label>
              <DatePicker {...register('arrival_date')} className={styles.datepicker} disabled={isEditable} />
              {errors.arrival_date && <p className={styles.error}>{errors.arrival_date.message}</p>}
            </div>
            {servicesOptions && (
              <div className={styles.item_block}>
                <label>Услуга</label>
                <MultipleSelect
                  openSelect={openSelect}
                  setOpenSelect={setOpenSelect}
                  selectId='services'
                  onChange={setServises}
                  options={servicesOptions}
                  disabled={isEditable}
                  placeholder='Не выбрано'
                  defaultValue={servises}
                />
              </div>
            )}
          </div>
        </form>
      </Loading>
    </Accordion>
  );
};
