import { FC } from 'react';
import { useAppSelector } from 'common/hooks';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { Modal } from '../Modal';

interface IProps {
  isOpen: boolean;
  onCancel: () => void;
}

export const GreetingsModal: FC<IProps> = ({ isOpen = false, onCancel }) => {
  const { userInfo } = useAppSelector(employeesSelectors.employees);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <p style={{ textAlign: 'center', fontSize: '25px' }}>
        С возвращением <br />
        {userInfo?.first_name} {userInfo?.second_name}
      </p>
    </Modal>
  );
};
