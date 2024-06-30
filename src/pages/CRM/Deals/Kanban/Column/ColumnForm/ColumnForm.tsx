import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Input } from 'common/ui';
import { IColumnInfo } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

const colors = ['transparent', '#bbed21', '#0ff85e', '#068d34', '#13edfb', '#c214de', '#ff1694', '#f21212', '#242423'];

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
    formState: { errors }
  } = useForm<IColumnInfo>({
    defaultValues: {
      name: formProps?.name ?? '',
      color: formProps?.color ?? colors[0]
    }
  });

  const [activeColor, setActiveColor] = useState<string>(formProps?.color ?? colors[0]);

  useEffect(() => {
    setValue('color', activeColor);
  }, [activeColor, setValue]);

  useEffect(() => {
    if (formProps) {
      setValue('name', formProps.name);
      setActiveColor(formProps.color);
    }
  }, [formProps, setValue]);

  const onSubmit = (data: IColumnInfo) => {
    const createData = { ...data, status: activeColor === '#f21212' ? 7 : 1 };
    onSendSubmit(createData);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.blocks}>
        <label>Выберите цвет</label>
        <div className={styles.colors}>
          {colors.map((color, index) => (
            <div
              onClick={() => setActiveColor(color)}
              key={index}
              className={cn(styles.roundIcon, {
                [styles.active]: color === activeColor,
                [styles.without]: color === 'transparent'
              })}
              style={{ background: color }}
            />
          ))}
        </div>
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
      <div className={styles.modalBtnWrapper}>
        <Button text='сохранить' styleType={BUTTON_TYPES.YELLOW} type='submit' />
        <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} onClick={onCancel} />
      </div>
    </form>
  );
};
