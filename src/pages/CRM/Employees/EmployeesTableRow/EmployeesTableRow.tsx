import { FC, useState } from 'react';
import { Checkbox, DatePicker, Input, Select } from 'common/ui';
import { MultipleFilePicker } from 'common/components';
import { IEmployeeData } from '../types/types';
import styles from './styles.module.scss';

interface IEmployeesTableRowProps extends IEmployeeData {
  onSelectRow: (index: number) => void;
}

export const EmployeesTableRow: FC<IEmployeesTableRowProps> = ({
  second_name,
  first_name,
  middle_name,
  date_of_birth,
  job_title,
  phone,
  email,
  email_password,
  start_of_internship,
  start_of_work,
  login,
  password,
  contracts,
  passports
}) => {
  const [isEdit, setIsEdit] = useState<boolean>();
  const [dateOfBirth, setDateOfBirth] = useState<string>(date_of_birth);
  const [phoneNumber, setPhoneNumber] = useState<string>(phone);
  const [emailData, setEmailData] = useState<string>(phone);
  const [emailPassword, setEmailPassword] = useState<string>(phone);
  return (
    <tr>
      <td className={styles.item}>
        <Checkbox checked={isSelected} onChange={() => onSelectRow(index)} />
      </td>
      <td className={styles.item}>{second_name}</td>
      <td className={styles.item}>{first_name}</td>
      <td className={styles.item}>{middle_name}</td>
      <td className={styles.item}>
        <DatePicker className={styles.datepicker} disabled={isEdit} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
      </td>
      <td className={styles.item}>
        <Select value={} options={} className={styles.select} disabled={isEdit} onChange={(e) => {}} />
      </td>
      <td className={styles.item}>
        <Input className={styles.inp} disabled={isEdit} value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type='phone' />
      </td>
      <td className={styles.item}>
        <Input className={styles.inp} disabled={isEdit} value={emailData} type='email' onChange={(e) => setEmailData(e.target.value)} />
      </td>
      <td className={styles.item}>
        <Input
          className={styles.inp}
          disabled={isEdit}
          value={emailPassword}
          type='text'
          onChange={(e) => setEmailPassword(e.target.value)}
        />
      </td>
      <td className={styles.item}>
        <MultipleFilePicker files={receiptFiles} editable={isEditable} onFilesChange={setReceiptFiles} />
      </td>
      <td className={styles.item}>
        <Input className={styles.inp} disabled={isEditable} value={localTourAmount} onChange={(e) => setLocalTourAmount(e.target.value)} />
      </td>
      <td className={styles.item}>
        <MultipleFilePicker files={employeeInvoiceFiles} editable={isEditable} onFilesChange={setEmployeeInvoiceFiles} />
      </td>
      <td className={cn(styles.item, styles.checkboxWrapper)}>
        <Checkbox className={styles.checkboxItem} checked={localIsPaid} disabled={isEditable} onChange={handleCheckboxChange} />
      </td>
    </tr>
  );
};
