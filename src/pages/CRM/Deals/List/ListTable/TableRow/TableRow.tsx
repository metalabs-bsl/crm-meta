import React, { FC, useRef, useState } from 'react';
import { Icon, Select } from 'common/ui';
import { ClientWindow, DeleteModal, DropdownModal } from 'common/components';
import { useAppDispatch, useAppSelector, useNotify, useRedirect } from 'common/hooks';
import { crmChapters } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { employeesSelectors } from 'api/admin/employees/employees.selectors';
import { useDeleteLeadMutation, useUpdateLeadColumnMutation, useUpdateLeadMutation } from 'api/admin/leads/leads.api';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
import { ROLES } from 'types/roles';
import { ILeadRow, IStageData } from '../../types/types';
import MiniProgressBar from '../MiniProgressBar';
import styles from '../style.module.scss';

interface IProps extends ILeadRow {
  stages: IStageData[];
}

export const TableRowData: FC<IProps> = ({ id, lead_name, customer, lead_column, stages, order, responsible_employee }) => {
  const profileRef = useRef(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [editedLeadName, setEditedLeadName] = useState<string>(lead_name);
  const [editedResponsibleEmployee, setEditedResponsibleEmployee] = useState<string>(responsible_employee?.id || '');
  const [showEditField, setShowEditField] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const [updateLead] = useUpdateLeadMutation();
  // const [updateColumn] = useUpdateColumnMutation();
  const [deleteLead] = useDeleteLeadMutation();
  const { data: responsibleOptions } = useGetResponsibleEmployeesQuery();
  const [update] = useUpdateLeadColumnMutation();
  const notify = useNotify();
  const redirect = useRedirect();
  const dispatch = useAppDispatch();

  const { role } = useAppSelector(employeesSelectors.employees);

  const onOpen = () => {
    dispatch(setChangeOpenEdgeModal(true));
    dispatch(setIsNewDeal(false));
    redirect.crm({ chapter: crmChapters.transactions.chapter, search: id });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'lead_name') {
      setEditedLeadName(value);
    }
  };

  const handleSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newResponsibleEmployee = e.target.value;
    setEditedResponsibleEmployee(newResponsibleEmployee);

    updateLead({
      id,
      body: {
        lead_name: editedLeadName,
        responsible_employee_id: newResponsibleEmployee
      }
    })
      .unwrap()
      .then(() => {
        notify('Lead updated successfully', 'success');
      })
      .catch(() => {
        notify('Error', 'error');
      });
  };

  const handleIconClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setShowEditField(true);
  };

  const handleConfirmDelete = async () => {
    deleteLead(id)
      .unwrap()
      .then(() => {
        notify('Lead deleted successfully', 'success');
      })
      .catch(() => {
        notify('Error deleting lead', 'error');
      })
      .finally(() => {
        setShowDeleteModal(false);
      });
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleCheckClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();

    updateLead({
      id,
      body: {
        lead_name: editedLeadName,
        responsible_employee_id: editedResponsibleEmployee
      }
    })
      .unwrap()
      .then(() => {
        notify('Lead updated successfully', 'success');
        setShowEditField(false);
      })
      .catch(() => {
        notify('Error updating lead', 'error');
      });
  };

  const handleColumnUpdate = async (stageId: string) => {
    try {
      await update({
        column_id: stageId,
        lead_id: id
      }).unwrap();

      notify(`Выбран статус - "${stages.find((stage) => stage.id === stageId)?.name}"`);
    } catch (error) {
      notify('Произошла ошибка при обновлении статуса', 'error');
    }
  };

  return (
    <>
      <tr className={styles.table_text}>
        <td onClick={onOpen} className={styles.clientName}>
          {showEditField ? (
            <input
              type='text'
              name='lead_name'
              value={editedLeadName}
              onChange={handleInputChange}
              className={`${styles.input_edit}`}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span>{editedLeadName}</span>
          )}
          {!showEditField ? (
            <div className={styles.plus} onClick={handleIconClick}>
              <Icon type='edit' alt='edit' />
            </div>
          ) : (
            <div className={styles.check} onClick={handleCheckClick}>
              <Icon type='check' alt='check' />
            </div>
          )}
        </td>
        <td>
          <span ref={profileRef} onMouseEnter={() => setIsShowModal(true)} onMouseLeave={() => setIsShowModal(false)}>
            {customer?.fullname}
          </span>
        </td>
        <td className={styles.miniprogress_wrapper}>
          {lead_column && lead_column.id ? (
            <MiniProgressBar currentStage={lead_column?.id} stages={stages} isEditable onStageChange={handleColumnUpdate} />
          ) : (
            <div>No stage data</div>
          )}
        </td>
        <td style={{ maxWidth: '280px' }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptatem sunt dolor.</td>
        <td>{order}</td>
        <td>
          {role !== ROLES.MANAGER && (
            <div className={styles.inpBlock}>
              <Select
                value={editedResponsibleEmployee}
                options={responsibleOptions || []}
                onChange={handleSelectChange}
                className={styles.select}
              />
            </div>
          )}
        </td>
        <td className={styles.deleteIcon}>{role === ROLES.DIRECTOR && <Icon type='delete' onClick={() => setShowDeleteModal(true)} />}</td>
      </tr>
      <DropdownModal targetRef={profileRef} isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <ClientWindow
          data={{
            name: customer?.fullname,
            phone: customer?.phone,
            birthday: customer?.birthday,
            city: customer?.city,
            source: customer?.source
          }}
        />
      </DropdownModal>

      <DeleteModal
        text={`Вы уверены, что хотите удалить ${lead_name}?`}
        isOpen={showDeleteModal}
        onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TableRowData;
