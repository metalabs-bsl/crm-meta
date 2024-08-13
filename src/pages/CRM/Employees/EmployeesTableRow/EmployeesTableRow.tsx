// import { FC, useState } from 'react';
// import { Checkbox, DatePicker, Input, Select } from 'common/ui';
// import { MultipleFilePicker } from 'common/components';
// import { IEmployeeData } from '../types/types';
// import styles from './styles.module.scss';

// interface IEmployeesTableRowProps extends IEmployeeData {
//   onSelectRow: (index: number) => void;
//   index: number;
// }

// export const EmployeesTableRow: FC<IEmployeesTableRowProps> = ({
//   second_name,
//   first_name,
//   middle_name,
//   date_of_birth,
//   phone,
//   onSelectRow,
//   index
// }) => {
//   const [isEdit, setIsEdit] = useState<boolean>(false);
//   const [dateOfBirth, setDateOfBirth] = useState<string>(date_of_birth);
//   const [phoneNumber, setPhoneNumber] = useState<string>(phone);
//   const [emailData, setEmailData] = useState<string>('');
//   const [emailPassword, setEmailPassword] = useState<string>('');
//   const [receiptFiles, setReceiptFiles] = useState<File[]>([]);
//   const [localTourAmount, setLocalTourAmount] = useState<string>('');
//   const [employeeInvoiceFiles, setEmployeeInvoiceFiles] = useState<File[]>([]);
//   const [localIsPaid, setLocalIsPaid] = useState<boolean>(false);
//   const [isSelected, setIsSelected] = useState<boolean>(false);

//   const handleCheckboxChange = () => {
//     setLocalIsPaid(!localIsPaid);
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     // Your logic for handling select change
//   };

//   return (
//     <tr>
//       <td className={styles.item}>
//         <Checkbox
//           checked={isSelected}
//           onChange={() => {
//             setIsSelected(!isSelected);
//             onSelectRow(index);
//           }}
//         />
//       </td>
//       <td className={styles.item}>{second_name}</td>
//       <td className={styles.item}>{first_name}</td>
//       <td className={styles.item}>{middle_name}</td>
//       <td className={styles.item}>
//         <DatePicker className={styles.datepicker} disabled={!isEdit} value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
//       </td>
//       <td className={styles.item}>
//         <Select value={''} options={[]} className={styles.select} disabled={!isEdit} onChange={handleSelectChange} />
//       </td>
//       <td className={styles.item}>
//         <Input
//           className={styles.inp}
//           disabled={!isEdit}
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           type='phone'
//         />
//       </td>
//       <td className={styles.item}>
//         <Input className={styles.inp} disabled={!isEdit} value={emailData} type='email' onChange={(e) => setEmailData(e.target.value)} />
//       </td>
//       <td className={styles.item}>
//         <Input
//           className={styles.inp}
//           disabled={!isEdit}
//           value={emailPassword}
//           type='text'
//           onChange={(e) => setEmailPassword(e.target.value)}
//         />
//       </td>
//       <td className={styles.item}>
//         <MultipleFilePicker files={receiptFiles} editable={isEdit} onFilesChange={setReceiptFiles} />
//       </td>
//       <td className={styles.item}>
//         <Input className={styles.inp} disabled={!isEdit} value={localTourAmount} onChange={(e) => setLocalTourAmount(e.target.value)} />
//       </td>
//       <td className={styles.item}>
//         <MultipleFilePicker files={employeeInvoiceFiles} editable={isEdit} onFilesChange={setEmployeeInvoiceFiles} />
//       </td>
//       <td className={styles.item}>
//         <Checkbox className={styles.checkboxItem} checked={localIsPaid} disabled={!isEdit} onChange={handleCheckboxChange} />
//       </td>
//     </tr>
//   );
// };

export {};
