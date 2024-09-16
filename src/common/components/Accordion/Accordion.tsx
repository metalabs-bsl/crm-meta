import React, { useState } from 'react';
import cn from 'classnames';
import { Button, Icon } from 'common/ui';
import styles from './style.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface AccordionProps {
  title?: string;
  children: React.ReactNode;
  isEdit?: boolean;
  onEditAction?: () => void;
  className?: string;
  onSaveAction?: () => void;
  isOpenDefault?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ title, children, onEditAction, isEdit, className, onSaveAction, isOpenDefault }) => {
  const [isOpen, setIsOpen] = useState(isOpenDefault || false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const onEdiIconCLick = () => {
    if (onEditAction) {
      onEditAction();
      setIsOpen(true);
    }
  };

  return (
    <div className={cn(styles.accordion, className)}>
      <div className={styles.accordion_header}>
        <div className={styles.accordion_title}>{title}</div>
        {isEdit ? (
          <div className={styles.btns_wrapper}>
            <Button styleType={BUTTON_TYPES.YELLOW} text='сохранить' onClick={onSaveAction} />
            <Button styleType={BUTTON_TYPES.Link_BLACK} text='отменить' onClick={onEditAction} />
          </div>
        ) : (
          <>
            <Icon
              className={cn(styles.accordion_icon, { [styles.accordion_icon_open]: isOpen })}
              type='arrow-up'
              onClick={toggleAccordion}
            />
            <Icon className={styles.edit} type='edit' onClick={onEdiIconCLick} />
          </>
        )}
      </div>
      <div className={cn(styles.accordion_content, { [styles.accordion_content_open]: isOpen })}>{children}</div>
    </div>
  );
};
