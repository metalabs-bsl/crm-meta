import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Button, Input } from 'common/ui';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

const colors = [
  { status: 'without' },
  { status: 'salat' },
  { status: 'light-green' },
  { status: 'dark-green' },
  { status: 'blue' },
  { status: 'violet' },
  { status: 'pink' },
  { status: 'red' },
  { status: 'black' }
];

interface IFormProps {
  title: string;
  color: string;
}

interface IProps {
  formProps?: IFormProps;
  onCancel: () => void;
}

export const ColumnForm: FC<IProps> = ({ formProps, onCancel }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<IFormProps>({
    defaultValues: {
      title: formProps?.title ?? '',
      color: formProps?.color ?? colors[0].status
    }
  });

  const [activeColor, setActiveColor] = useState<string>(formProps?.color ?? colors[0].status);

  useEffect(() => {
    setValue('color', activeColor);
  }, [activeColor, setValue]);

  useEffect(() => {
    if (formProps) {
      setValue('title', formProps.title);
      setActiveColor(formProps.color);
    }
  }, [formProps, setValue]);

  const onSubmit = (data: IFormProps) => {
    console.log('Form Submitted:', data);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.blocks}>
        <label>Выберите цвет</label>
        <div className={styles.colors}>
          {colors.map((color, index) => (
            <div
              onClick={() => setActiveColor(color.status)}
              key={index}
              className={cn(styles.roundIcon, styles[color.status], { [styles.active]: color.status === activeColor })}
            />
          ))}
        </div>
      </div>
      <div className={styles.blocks}>
        <label>Название доски</label>
        <Input
          placeholder='Введите название'
          className={cn(styles.inp, { [styles.error]: errors.title })}
          {...register('title', { required: 'Название доски обязательно' })}
        />
        {errors.title && <span className={styles.errorMessage}>{errors.title.message}</span>}
      </div>
      <div className={styles.modalBtnWrapper}>
        <Button text='сохранить' styleType={BUTTON_TYPES.YELLOW} type='submit' />
        <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} onClick={onCancel} />
      </div>
    </form>
  );
};
