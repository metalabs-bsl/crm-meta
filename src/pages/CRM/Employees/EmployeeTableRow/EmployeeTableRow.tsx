import { FC, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { FilePicker, Icon, Loading } from 'common/ui';
import { DropdownModal } from 'common/components';
import { useNotify } from 'common/hooks';
import { MESSAGE } from 'common/constants';
import { useCreateEmployeeMutation, useGetEmployeeRolesQuery, useGetQRCodeQuery } from 'api/admin/employees/employees.api';
import { IEmployee } from 'types/entities';
import { getRusRole } from '../Employees.helper';
import styles from './styles.module.scss';

import PhoneInput from 'react-phone-input-2';

interface IEmployeeTableRow extends IEmployee {
  handleDelete: (arg0: string, arg1: string) => void;
  isScrolled: boolean;
  online: boolean;
}

export const EmployeeTableRow: FC<IEmployeeTableRow> = ({
  id,
  second_name,
  first_name,
  middle_name,
  date_of_birth,
  phone,
  whatsapp_status,
  personal_phone,
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
  isScrolled,
  online
}) => {
  const notify = useNotify();
  const { data: rolesAll } = useGetEmployeeRolesQuery();
  const [createEmployee] = useCreateEmployeeMutation();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>(date_of_birth?.split('T')[0]);
  const [role, setRole] = useState<string>(roles[0].id);
  const [phoneNumber, setPhoneNumber] = useState<string>(phone || '');
  const [personalPhone, setPersonalPhone] = useState<string>(personal_phone || '');
  const [emailData, setEmailData] = useState<string>(email || '');
  const [emailPassword, setEmailPassword] = useState<string>(email_password || '');
  const [startOfInternship, setStartOfInternship] = useState<string>(start_of_internship?.split('T')[0] || '');
  const [startOfWork, setStartOfWork] = useState<string>(start_of_work?.split('T')[0] || '');
  const [loginCRM, setLoginCRM] = useState<string>(login || '');
  const [passwordCRM, setPasswordCRM] = useState<string>('');
  const [contractLocal, setContractLocal] = useState<{ id: string; original_name: string } | undefined>(contract);
  const [passportFrontLocal, setPassportFrontLocal] = useState<{ id: string; original_name: string } | undefined>(passport_front);
  const [passportBackLocal, setPassportBackLocal] = useState<{ id: string; original_name: string } | undefined>(passport_back);
  const [name, setName] = useState<string>(first_name || '');
  const [secondName, setSecondName] = useState<string>(second_name || '');
  const [middleName, setMiddleName] = useState<string>(middle_name || '');

  const whatsappStatusRef = useRef(null);
  const [whatsappStatusOpen, setWhatsAppStatusOpen] = useState<boolean>(false);
  const {
    data: qrCode,
    refetch,
    isFetching
  } = useGetQRCodeQuery(
    { phone: phone.replace('+', '') },
    {
      skip: !whatsappStatusOpen
    }
  );

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

    const employeeData: IEmployee = {
      id: id,
      date_of_birth: dateOfBirth,
      job_title: getRusRole(rolesAll?.find((el) => el.id === role)?.role_name || ''),
      phone: phoneNumber,
      personal_phone: personalPhone,
      email: emailData,
      email_password: emailPassword,
      start_of_internship: startOfInternship,
      start_of_work: startOfWork,
      login: loginCRM,
      first_name: name,
      second_name: secondName,
      middle_name: middleName,
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

  useEffect(() => {
    let intervalId: NodeJS.Timer | null = null;

    if (whatsappStatusOpen) {
      refetch();
      intervalId = setInterval(() => {
        refetch();
      }, 20000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [whatsappStatusOpen, refetch]);

  return (
    <div className={styles.tableRow}>
      <div className={cn(styles.item, styles.status)}>
        <span
          className={cn({
            [styles.online]: online,
            [styles.offline]: !online
          })}
        ></span>
      </div>
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
      {/* <div className={styles.item}>{`${second_name} ${first_name} ${middle_name}`}</div> */}
      <div className={styles.item}>
        <input className={styles.input} disabled={!isEdit} value={secondName} type='text' onChange={(e) => setSecondName(e.target.value)} />
      </div>
      <div className={styles.item}>
        <input className={styles.input} disabled={!isEdit} value={name} type='text' onChange={(e) => setName(e.target.value)} />
      </div>
      <div className={styles.item}>
        <input className={styles.input} disabled={!isEdit} value={middleName} type='text' onChange={(e) => setMiddleName(e.target.value)} />
      </div>
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
        <PhoneInput
          disabled={!isEdit}
          country={'kg'}
          value={phoneNumber}
          onChange={setPhoneNumber}
          enableSearch
          containerClass={styles.phone_container}
          buttonClass={cn(styles.select_btn, { [styles.disabled_btn]: !isEdit })}
          placeholder={undefined}
        />
      </div>
      <div className={cn(styles.item)}>
        <span onMouseEnter={() => setWhatsAppStatusOpen(true)} onMouseLeave={() => setWhatsAppStatusOpen(false)} ref={whatsappStatusRef}>
          {whatsapp_status ? ' Подключен' : 'Не подключен'}
        </span>
      </div>
      <div className={styles.item}>
        <PhoneInput
          disabled={!isEdit}
          country={'kg'}
          value={personalPhone}
          onChange={setPersonalPhone}
          enableSearch
          containerClass={styles.phone_container}
          buttonClass={cn(styles.select_btn, { [styles.disabled_btn]: !isEdit })}
          placeholder={undefined}
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
        {isEdit ? (
          <input
            className={styles.input}
            disabled={!isEdit}
            value={passwordCRM}
            type='text'
            onChange={(e) => setPasswordCRM(e.target.value)}
          />
        ) : (
          <span>Скрыто</span>
        )}
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
      <DropdownModal targetRef={whatsappStatusRef} isOpen={whatsappStatusOpen} onClose={() => setWhatsAppStatusOpen(false)}>
        <Loading isSpin={isFetching}>
          <div className={styles.qrCodeImage}>
            <img src={qrCode?.qr_url} alt='QR Code' />
          </div>
        </Loading>
      </DropdownModal>
    </div>
  );
};
