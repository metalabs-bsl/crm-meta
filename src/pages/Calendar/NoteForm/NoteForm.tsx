import { FC, useEffect, useState } from 'react';
import dayjs, { extend } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Button, DatePicker, Icon, Input, Loading, MultipleSelect } from 'common/ui';
import { DeleteModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateNoteMutation, useDeleteNoteMutation, useUpdateNoteMutation } from 'api/admin/calendar/calendar.api';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { Options } from 'types/common';
import { Note } from 'types/entities';
import styles from './style.module.scss';

import { useForm } from 'react-hook-form';
import { BUTTON_TYPES } from 'types/enums';

extend(utc);

const selectOptions: Options[] = [
  { label: 'Во время начала', value: 2 },
  { label: 'За 5 минут', value: 3 },
  { label: 'За 15 минут', value: 4 },
  { label: 'За 30 минут', value: 5 },
  { label: 'За час', value: 6 },
  { label: 'За 2 часа', value: 7 },
  { label: 'За день', value: 8 },
  { label: 'За 2 дня', value: 9 },
  { label: 'За неделю', value: 10 }
];

interface IProps {
  onCloseModal?: () => void;
  formProps?: Note;
}

export const NoteForm: FC<IProps> = ({ formProps, onCloseModal }) => {
  const notify = useNotify();
  // const [disabled, setDisabled] = useState<boolean>(!!formProps ?? false);
  const [disabled, setDisabled] = useState<boolean>(formProps ? true : false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [reminders, setReminders] = useState<Options[]>([]);
  const [employees, setEmployees] = useState<Options[]>([]);
  const [openSelect, setOpenSelect] = useState<string | null>(null);
  const { data: responsibleOptions, isFetching: isResponsibleFetching } = useGetResponsibleEmployeesQuery();
  const [createNote, { isLoading }] = useCreateNoteMutation();
  const [deleteNote, { isLoading: isDeleteLoading }] = useDeleteNoteMutation();
  const [updateNote, { isLoading: isUpdateLoading }] = useUpdateNoteMutation();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
    setValue
  } = useForm<Note>();

  useEffect(() => {
    if (formProps) {
      Object.keys(formProps).forEach((key) => {
        const value = formProps[key as keyof Note];
        if (key === 'date' && typeof value === 'string') {
          setValue(key as keyof Note, dayjs.utc(value).format('YYYY-MM-DDTHH:mm'));
        } else {
          setValue(key as keyof Note, formProps[key as keyof Note]);
        }
      });
      if (responsibleOptions) {
        setEmployees(responsibleOptions.filter((option) => formProps.employees.includes(option.value as string)));
      }
      setReminders(selectOptions.filter((option) => formProps.reminderTypes.includes(option.value as number)));
    }
  }, [formProps, responsibleOptions, setValue]);

  const onEditClick = () => {
    setDisabled(false);
    setIsEditing(true);
  };

  const onCancelEditProcess = () => {
    setDisabled(true);
    setIsEditing(false);
  };

  const onCancelDelete = () => {
    setDeleteModal(false);
  };

  const onSubmit = () => {
    const data = getValues();
    const utcDate = dayjs(data.date).utc().format();

    const updatedReminders = reminders.map((i) => i.value as number);
    const updatedEmployees = employees.map((i) => i.value as string);

    const payload = {
      ...data,
      date: utcDate,
      reminderTypes: updatedReminders,
      employees: updatedEmployees
    };

    if (!formProps) {
      createNote(payload)
        .unwrap()
        .then(() => {
          new Audio('/notification.mp3').play();
          notify(MESSAGE.CREATED, 'success');
          onCloseModal && onCloseModal();
        });
    } else {
      updateNote(payload)
        .unwrap()
        .then(() => {
          onCancelEditProcess();
          notify(MESSAGE.UPDATED, 'success');
          onCloseModal && onCloseModal();
        });
    }
  };

  const onDelete = (id?: string) => {
    if (id) {
      console.log('Удаляем заметку с ID:', id); // Логируем ID
      deleteNote(id)
        .unwrap()
        .then(() => {
          notify(MESSAGE.DELETED, 'success');
          onCloseModal && onCloseModal();
        })
        .catch(() => {
          notify(MESSAGE.ERROR, 'error');
        });
    }
  };

  return (
    <Loading isSpin={isResponsibleFetching || isLoading || isDeleteLoading || isUpdateLoading}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form_head}>
          <span className={styles.formTypeText}>{formProps ? 'Заметка' : 'Новая заметка'}</span>
          <div className={styles.action_wrapper}>
            {formProps ? (
              isEditing ? (
                <>
                  <Button text='сохранить' type='submit' styleType={BUTTON_TYPES.YELLOW} />
                  <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} type='button' onClick={onCancelEditProcess} />
                </>
              ) : (
                formProps.canEdit && (
                  <>
                    <Icon type='edit' onClick={onEditClick} />
                    <Icon type='delete' onClick={() => setDeleteModal(true)} />
                  </>
                )
              )
            ) : (
              <Button text='создать' styleType={BUTTON_TYPES.YELLOW} type='submit' />
            )}
          </div>
        </div>
        <div className={styles.items}>
          <div className={styles.item}>
            <label>Название</label>
            <Input
              {...register('title', { required: 'Поле обязательно' })}
              disabled={disabled}
              placeholder='Введите название заметки'
              className={styles.inp_wrapper}
            />
            {errors.title && <span className={styles.error}>{errors.title.message}</span>}
          </div>
          <div className={styles.item}>
            <label>Геолокация</label>
            <Input
              {...register('geolocation', { required: 'Поле обязательно' })}
              disabled={disabled}
              placeholder='Введите геолокацию'
              className={styles.inp_wrapper}
            />
            {errors.geolocation && <span className={styles.error}>{errors.geolocation.message}</span>}
          </div>
          <div className={styles.item}>
            <label>Дата и время </label>
            <DatePicker
              {...register('date', { required: 'Поле обязательно' })}
              disabled={disabled}
              defaultValue={formProps?.date ? dayjs.utc(formProps.date).format('YYYY-MM-DDTHH:mm') : undefined}
            />
            {errors.date && <span className={styles.error}>{errors.date.message}</span>}
          </div>
          <div className={styles.item}>
            <label>Напоминание</label>
            <MultipleSelect
              disabled={disabled}
              placeholder='Не выбрано'
              options={selectOptions}
              onChange={setReminders}
              openSelect={openSelect}
              setOpenSelect={setOpenSelect}
              selectId='reminders'
              defaultValue={reminders}
            />
          </div>
          <div className={styles.item}>
            <label>Участники</label>
            <MultipleSelect
              onChange={setEmployees}
              disabled={disabled}
              placeholder='Не выбрано'
              options={responsibleOptions || []}
              openSelect={openSelect}
              setOpenSelect={setOpenSelect}
              selectId='employees'
              defaultValue={employees}
            />
          </div>
        </div>
        <DeleteModal
          text={`Вы точно хотите удалить заметку "${formProps?.title}"`}
          isOpen={deleteModal}
          onCancel={onCancelDelete}
          onDelete={() => onDelete(formProps?.id)}
        />
      </form>
    </Loading>
  );
};

export default NoteForm;
