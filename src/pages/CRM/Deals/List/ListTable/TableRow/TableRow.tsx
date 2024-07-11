import React, { FC, useRef, useState } from 'react';
import { Icon, Select } from 'common/ui';
import { ClientWindow, DeleteModal, DropdownModal } from 'common/components';
import { useAppDispatch, useNotify, useRedirect } from 'common/hooks';
import { crmChapters } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { useUpdateColumnMutation } from 'api/admin/kanban/kanban.api';
import { useUpdateLeadMutation } from 'api/admin/leads/leads.api';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
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
  const [updateColumn] = useUpdateColumnMutation();
  // const [deleteLeads] = useDeleteLeadsMutation();
  const notify = useNotify();
  const { data: responsibleOptions } = useGetResponsibleEmployeesQuery();
  const redirect = useRedirect();
  const dispatch = useAppDispatch();

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

  // const handleConfirmDelete = async () => {
  //   deleteLeads(id)
  //     .unwrap()
  //     .then(() => {
  //       notify('Lead deleted successfully', 'success');
  //     })
  //     .catch(() => {
  //       notify('Error deleting lead', 'error');
  //     })
  //     .finally(() => {
  //       setShowDeleteModal(false);
  //     });
  // };

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

  const handleColumnUpdate = async (newStageId: string) => {
    updateColumn({
      id,
      body: {
        name: newStageId,
        color: ''
      }
    })
      .unwrap()
      .then(() => {
        notify('Column updated successfully', 'success');
      })
      .then(() => {
        notify('Error updating column', 'error');
      });
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
        <td style={{ textAlign: 'center' }}>{order}</td>
        <td>
          <div className={styles.inpBlock}>
            <Select
              value={editedResponsibleEmployee}
              options={responsibleOptions || []}
              onChange={handleSelectChange}
              className={styles.select}
            />
          </div>
        </td>
        <td className={styles.deleteIcon}>
          <Icon type='delete' />
        </td>
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
        // onDelete={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};

export default TableRowData;
