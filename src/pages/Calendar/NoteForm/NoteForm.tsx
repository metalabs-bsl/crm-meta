import { FC, useState } from 'react';
import { Note, Options } from 'types/pages';
import { Button, DatePicker, Icon, Input, MultipleSelect } from 'common/ui';
import { DeleteModal } from 'common/components';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

const selectOptions: Options[] = [
  { label: 'Нет', value: '0' },
  { label: 'Во время начала', value: '1' },
  { label: 'За 5 минут', value: '2' },
  { label: 'За 15 минут', value: '3' },
  { label: 'За 30 минут', value: '4' },
  { label: 'За час', value: '5' },
  { label: 'За 2 часа', value: '6' },
  { label: 'За день', value: '7' },
  { label: 'За 2 дня', value: '8' },
  { label: 'За неделю', value: '9' }
];

interface IProps {
  createAction?: () => void;
  deleteAction?: () => void;
  editAction?: () => void;
  formProps?: Note;
}

export const NoteForm: FC<IProps> = ({ createAction, deleteAction, editAction, formProps }) => {
  const [disabled, setDisabled] = useState<boolean>(!!formProps ?? false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const onEditClick = () => {
    setDisabled(false);
    setIsEditing(true);
  };

  const onDeleteClick = () => {
    // Делаем что-то перед вызовом deleteAction
    if (deleteAction) {
      deleteAction();
    }
  };

  const onCancelEditProcess = () => {
    setDisabled(true);
    setIsEditing(false);
  };

  const onCancelDelete = () => {
    setDeleteModal(false);
  };

  const onSaveEdited = () => {
    onCancelEditProcess();
    editAction && editAction();
  };

  return (
    <form className={styles.form}>
      <div className={styles.form_head}>
        <span className={styles.formTypeText}>{formProps ? 'Заметка' : 'Новая заметка'}</span>
        <div className={styles.action_wrapper}>
          {formProps ? (
            isEditing ? (
              <>
                <Button text='сохранить' styleType={BUTTON_TYPES.YELLOW} type='button' onClick={onSaveEdited} />
                <Button text='отменить' styleType={BUTTON_TYPES.Link_BLACK} type='button' onClick={onCancelEditProcess} />
              </>
            ) : (
              <>
                <Icon type='edit' onClick={onEditClick} />
                <Icon type='delete' onClick={() => setDeleteModal(true)} />
              </>
            )
          ) : (
            <Button text='создать' styleType={BUTTON_TYPES.YELLOW} type='button' onClick={createAction} />
          )}
        </div>
      </div>
      <div className={styles.items}>
        <div className={styles.item}>
          <label>Название</label>
          <Input
            disabled={disabled}
            placeholder='Введите название заметки'
            className={styles.inp_wrapper}
            defaultValue={formProps?.title}
          />
        </div>
        <div className={styles.item}>
          <label>Геолокация</label>
          <Input
            disabled={disabled}
            placeholder='Введите геолокацию'
            className={styles.inp_wrapper}
            defaultValue={formProps?.geolocation}
          />
        </div>
        <div className={styles.item}>
          <label>Дата и время </label>
          <DatePicker disabled={disabled} defaultValue={formProps?.date} />
        </div>
        <div className={styles.item}>
          <label>Напоминание</label>
          <MultipleSelect disabled={disabled} placeholder='Не выбрано' options={selectOptions} defaultValue={formProps?.reminder} />
        </div>
        <div className={styles.item}>
          <label>Участник</label>
          <Input
            disabled={disabled}
            prevIcon='userIcon'
            placeholder='Добавьте участника'
            className={styles.inp_wrapper}
            defaultValue={formProps?.user}
          />
        </div>
      </div>
      <DeleteModal
        text={`Вы точно хотите удалить заметку "${formProps?.title}"`}
        isOpen={deleteModal}
        onCancel={onCancelDelete}
        onDelete={onDeleteClick}
      />
    </form>
  );
};

export default NoteForm;
