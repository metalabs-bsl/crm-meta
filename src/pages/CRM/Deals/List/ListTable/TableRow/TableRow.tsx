import { FC, useEffect, useRef, useState } from 'react';
import { CardDetail } from 'pages/CRM/Deals/CardDetail';
import { Checkbox, Select } from 'common/ui';
import { ClientWindow, DropdownModal, EdgeModal } from 'common/components';
import { useAppDispatch, useRedirect } from 'common/hooks';
import { crmChapters } from 'common/constants';
import { useGetResponsibleEmployeesQuery } from 'api/admin/employees/employees.api';
import { setChangeOpenEdgeModal, setIsNewDeal } from 'api/admin/sidebar/sidebar.slice';
import MiniProgressBar from '../../OldTable/MiniProgressBar';
import { ILeadRow, IStageData, TableColumn } from '../../types/types';
import styles from '../style.module.scss';

interface IProps extends ILeadRow {
  selectedRows: string[];
  handleSelectRow: (id: string) => void;
  stages: IStageData[];
  columns: TableColumn[];
  isEditing: boolean;
}

export const TableRowData: FC<IProps> = ({
  id,
  lead_name,
  customer,
  lead_column,
  stages,
  selectedRows,
  order,
  responsible_employee,
  handleSelectRow,
  isEditing
}) => {
  const profileRef = useRef(null);

  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [editedLeadName, setEditedLeadName] = useState<string>(lead_name);
  const [editedResponsibleEmployee, setEditedResponsibleEmployee] = useState<string>(responsible_employee.id);
  const [currentStage, setCurrentStage] = useState<string>(lead_column?.id || '');

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedResponsibleEmployee(e.target.value);
  };

  const handleStageChange = (stageId: string) => {
    setCurrentStage(stageId);
  };

  useEffect(() => {
    const updatedData = {
      id,
      lead_name: editedLeadName,
      responsible_employee: editedResponsibleEmployee,
      currentStage
    };
    console.log('Updated Data:', updatedData);
  }, [editedLeadName, editedResponsibleEmployee, currentStage, id]);

  const getEmployeeName = (id: string) => {
    const employee = responsibleOptions?.find((option) => option.value === id);
    return employee ? employee.label : '';
  };

  return (
    <>
      <tr className={styles.table_text}>
        <td>
          <div className={styles.main_checkbox}>
            <Checkbox checked={selectedRows.includes(id)} onChange={() => handleSelectRow(id)} />
          </div>
        </td>
        <td onClick={onOpen}>
          <input
            type='text'
            name='lead_name'
            value={editedLeadName}
            onChange={handleInputChange}
            disabled={!isEditing || !selectedRows.includes(id)}
            className={styles.input_edit}
            onClick={(e) => e.stopPropagation()}
          />
        </td>
        <td>
          <span ref={profileRef} onMouseEnter={() => setIsShowModal(true)} onMouseLeave={() => setIsShowModal(false)}>
            {customer?.fullname}
          </span>
        </td>
        <td>
          {lead_column && lead_column.id ? (
            <MiniProgressBar
              currentStage={currentStage}
              stages={stages}
              isEditable={isEditing && selectedRows.includes(id)}
              onStageChange={handleStageChange}
            />
          ) : (
            <div>No stage data</div>
          )}
        </td>
        <td>Render tasks data</td>
        <td>{order}</td>
        <td>
          {responsibleOptions && (
            <div className={styles.inpBlock}>
              {isEditing && selectedRows.includes(id) ? (
                <Select
                  value={editedResponsibleEmployee}
                  options={responsibleOptions}
                  onChange={handleSelectChange}
                  className={styles.select}
                />
              ) : (
                <input
                  type='text'
                  name='responsible_employee'
                  value={getEmployeeName(editedResponsibleEmployee)}
                  disabled
                  className={styles.input_edit}
                />
              )}
            </div>
          )}
        </td>
      </tr>
      <DropdownModal targetRef={profileRef} isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <ClientWindow
          data={{
            name: customer.fullname,
            phone: customer.phone,
            birthday: customer.birthday,
            city: customer.city,
            source: customer.source
          }}
        />
      </DropdownModal>

      <EdgeModal>
        <CardDetail />
      </EdgeModal>
    </>
  );
};
