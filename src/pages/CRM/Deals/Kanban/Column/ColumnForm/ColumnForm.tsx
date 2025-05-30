import { FC, useEffect } from 'react';
import cn from 'classnames';
import { Button, Input, Select } from 'common/ui';
import { Options } from 'types/common';
import { IColumnInfo } from 'types/entities';
import styles from './style.module.scss';

import { Controller, useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

const colors = ['transparent', '#bbed21', '#0ff85e', '#068d34', '#13edfb', '#c214de', '#ff1694', '#f21212', '#242423'];

const colTypes: Options[] = [
  { label: 'Удачная', value: 1 },
  { label: 'Неудачная', value: 7 }
];

interface IProps {
  formProps?: IColumnInfo;
  onCancel: () => void;
  onSendSubmit: (body: IColumnInfo) => void;
}

export const ColumnForm: FC<IProps> = ({ formProps, onCancel, onSendSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors }
  } = useForm<IColumnInfo>({
    defaultValues: {
      color: colors[0],
      status: colTypes[0].value as number
    }
  });

  useEffect(() => {
    if (formProps) {
      setValue('name', formProps.name);
      setValue('color', formProps.color);
      setValue('status', formProps.status);
    }
  }, [formProps, setValue]);

  const onSubmit = (data: IColumnInfo) => {
    onSendSubmit(data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.blocks}>
        <label>Выберите цвет</label>
        <Controller
          name='color'
          control={control}
          rules={{ required: 'Phone number is required' }}
          render={({ field: { onChange, value } }) => (
            <div className={styles.colors}>
              {colors.map((color, index) => (
                <div
                  onClick={() => onChange(color)}
                  key={index}
                  className={cn(styles.roundIcon, {
                    [styles.active]: color === value,
                    [styles.without]: color === 'transparent'
                  })}
                  style={{ background: color }}
                />
              ))}
            </div>
          )}
        />
      </div>
      <div className={styles.blocks}>
        <label>Название доски</label>
        <Input
          maxLength={16}
          placeholder='Введите название'
          className={cn(styles.inp, { [styles.error]: errors.name })}
          {...register('name', { required: 'Название доски обязательно' })}
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>}
      </div>
      <div className={styles.blocks}>
        <label>Тип колонки</label>
        <Controller
          name='status'
          control={control}
          rules={{ required: 'Phone number is required' }}
          render={({ field: { onChange, value } }) => (
            <Select options={colTypes} className={styles.select} value={value} onChange={(e) => onChange(Number(e.target.value))} />
          )}
        />

        {errors.status && <span className={styles.errorMessage}>{errors.status.message}</span>}
      </div>
      <div className={styles.modalBtnWrapper}>
        <Button text='сохранить' styleType={BUTTON_TYPES.YELLOW} type='submit' />
        <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} onClick={onCancel} />
      </div>
    </form>
  );
};
