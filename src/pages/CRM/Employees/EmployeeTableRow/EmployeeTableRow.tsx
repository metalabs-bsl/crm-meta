import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { FilePicker, Icon } from 'common/ui';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateEmployeeMutation, useGetEmployeeRolesQuery } from 'api/admin/employees/employees.api';
import { getRusRole } from '../Employees.helper';
import { IEmployeeData } from '../types/types';
import styles from './styles.module.scss';

interface IEmployeeTableRow extends IEmployeeData {
  handleDelete: (arg0: string, arg1: string) => void;
  isScrolled: boolean;
}

export const EmployeeTableRow: FC<IEmployeeTableRow> = ({
  id,
  second_name,
  first_name,
  middle_name,
  date_of_birth,
  phone,
  roles,
  email,
  email_password,
  start_of_internship,
  start_of_work,
  login,
  contract,
  passport_front,
  passport_back,
  handleDelete,
  isScrolled
}) => {
  const notify = useNotify();
  const { data: rolesAll } = useGetEmployeeRolesQuery();
  const [createEmployee] = useCreateEmployeeMutation();

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>(date_of_birth.split('T')[0]);
  const [role, setRole] = useState<string>(roles[0].id);
  const [phoneNumber, setPhoneNumber] = useState<string>(phone || '');
  const [emailData, setEmailData] = useState<string>(email || '');
  const [emailPassword, setEmailPassword] = useState<string>(email_password || '');
  const [startOfInternship, setStartOfInternship] = useState<string>(start_of_internship?.split('T')[0] || '');
  const [startOfWork, setStartOfWork] = useState<string>(start_of_work?.split('T')[0] || '');
  const [loginCRM, setLoginCRM] = useState<string>(login || '');
  const [passwordCRM, setPasswordCRM] = useState<string>('');
  const [contractLocal, setContractLocal] = useState<{ id: string; original_name: string } | undefined>(contract);
  const [passportFrontLocal, setPassportFrontLocal] = useState<{ id: string; original_name: string } | undefined>(passport_front);
  const [passportBackLocal, setPassportBackLocal] = useState<{ id: string; original_name: string } | undefined>(passport_back);

  const [contractLocalFile, setContractLocalFile] = useState<File | null>(null);
  const [frontPassportLocalFile, setFrontPassportLocalFile] = useState<File | null>(null);
  const [backPassportLocalFile, setBackPassportLocalFile] = useState<File | null>(null);

  useEffect(() => {
    setContractLocal(contract);
    setPassportFrontLocal(passport_front);
    setPassportBackLocal(passport_back);
  }, [contract, passport_front, passport_back]);

  const handleSubmit = async () => {
    const formData = new FormData();

    const employeeData: IEmployeeData = {
      id: id,
      date_of_birth: dateOfBirth,
      job_title: getRusRole(rolesAll?.find((el) => el.id === role)?.role_name || ''),
      phone: phoneNumber,
      email: emailData,
      email_password: emailPassword,
      start_of_internship: startOfInternship || null,
      start_of_work: startOfWork || null,
      login: loginCRM,
      //@ts-ignore
      roles: [rolesAll?.find((el) => el.id === role)]
    };

    if (passwordCRM) {
      employeeData.password = passwordCRM;
    }

    formData.append('employeeInfo', JSON.stringify(employeeData));

    if (contractLocalFile) {
      formData.append(`contract`, contractLocalFile);
    }
    if (frontPassportLocalFile) {
      formData.append(`passport_front`, frontPassportLocalFile);
    }
    if (backPassportLocalFile) {
      formData.append(`passport_back`, backPassportLocalFile);
    }

    for (const [key, value] of formData.entries()) {
      console.log(`Key: ${key}, Value: ${value}`);
    }

    try {
      await createEmployee(formData).unwrap();
      notify(MESSAGE.SUCCESS, 'success');
    } catch (error) {
      notify(MESSAGE.ERROR, 'error');
    } finally {
      setIsEdit(false);
      setContractLocalFile(null);
      setFrontPassportLocalFile(null);
      setBackPassportLocalFile(null);
    }
  };

  return (
    <div className={styles.tableRow}>
      <div className={cn(styles.item, styles.buttons, { [styles.scrolled]: isScrolled })}>
        {!isEdit ? (
          <>
            <div className={styles.button} onClick={() => handleDelete(id, `${second_name} ${first_name} ${middle_name}`)}>
              <Icon type={'delete'} className={styles.button_delete} />
            </div>
            <div className={styles.button}>
              <Icon type={'edit'} onClick={() => setIsEdit(true)} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.button}>
              <Icon type={'search-clear'} className={styles.button_cancel} onClick={() => setIsEdit(false)} />
            </div>
            <div className={styles.button} onClick={() => handleSubmit()}>
              <Icon type={'check'} className={styles.button_check} />
            </div>
          </>
        )}
      </div>
      <div className={styles.item}>{`${second_name} ${first_name} ${middle_name}`}</div>
      <div className={styles.item}>
        <input
          type='date'
          className={styles.input}
          disabled={!isEdit}
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <select value={role} onChange={(e) => setRole(e.target.value)} className={cn(styles.input, styles.select)} disabled={!isEdit}>
          {rolesAll?.map((role) => (
            <option value={role.id} key={role.id}>
              {getRusRole(role.role_name)}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          disabled={!isEdit}
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          type='phone'
        />
      </div>
      <div className={styles.item}>
        <input className={styles.input} disabled={!isEdit} value={emailData} type='email' onChange={(e) => setEmailData(e.target.value)} />
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          disabled={!isEdit}
          value={emailPassword}
          type='email'
          onChange={(e) => setEmailPassword(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          disabled={!isEdit}
          value={startOfInternship}
          type='date'
          onChange={(e) => setStartOfInternship(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          disabled={!isEdit}
          value={startOfWork}
          type='date'
          onChange={(e) => setStartOfWork(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <input className={styles.input} disabled={!isEdit} value={loginCRM} type='text' onChange={(e) => setLoginCRM(e.target.value)} />
      </div>
      <div className={styles.item}>
        <input
          className={styles.input}
          disabled={!isEdit}
          value={passwordCRM}
          type='text'
          onChange={(e) => setPasswordCRM(e.target.value)}
        />
      </div>

      <div className={cn(styles.item, styles.fileItem)}>
        {contractLocal ? (
          <div className={styles.file}>
            <a href={`${process.env.REACT_APP_BASE_URL}/files/download/${contractLocal.id}`} download target='_blank' rel='noreferrer'>
              {contractLocal.original_name}
            </a>
            {isEdit && <Icon type={'delete'} onClick={() => setContractLocal(undefined)} />}
          </div>
        ) : (
          <FilePicker className={styles.fileInput} onChange={setContractLocalFile} disabled={!isEdit} />
        )}
      </div>

      <div className={cn(styles.item, styles.fileItem)}>
        {passportFrontLocal ? (
          <div className={styles.file}>
            <a href={`${process.env.REACT_APP_BASE_URL}/files/download/${passportFrontLocal.id}`} download target='_blank' rel='noreferrer'>
              {passportFrontLocal.original_name}
            </a>
            {isEdit && <Icon type={'delete'} onClick={() => setPassportFrontLocal(undefined)} />}
          </div>
        ) : (
          <FilePicker className={styles.fileInput} onChange={setFrontPassportLocalFile} disabled={!isEdit} />
        )}
      </div>

      <div className={cn(styles.item, styles.fileItem)}>
        {passportBackLocal ? (
          <div className={styles.file}>
            <a href={`${process.env.REACT_APP_BASE_URL}/files/download/${passportBackLocal.id}`} download target='_blank' rel='noreferrer'>
              {passportBackLocal.original_name}
            </a>
            {isEdit && <Icon type={'delete'} onClick={() => setPassportBackLocal(undefined)} />}
          </div>
        ) : (
          <FilePicker className={styles.fileInput} onChange={setBackPassportLocalFile} disabled={!isEdit} />
        )}
      </div>
    </div>
  );
};
