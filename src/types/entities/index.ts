export type { IResAppSettings, IUpdateAppSettings } from './appSettings';
export type { Birthday, ICalendarDataRes, Note } from './calendar';
export type { IResCurrenciesLast } from './currencies';
export type { ICreateDocumentParams, IDocument, IGetDocumentParams } from './document';
export type { IEmployee, IResResponsible, IRole } from './employees';
export type { IResExchangeRates } from './exchangeRates';
export * from './history';
export type { IColumn, IColumnInfo, ICreateColumnParams, ICustomer, IGetColumnsRes, Task } from './kanban';
export type {
  IComment,
  ICreateCommentParams,
  ICreateInvoiceParams,
  ICreateLeadParams,
  ICreatePaymentParams,
  ICreateReminderParams,
  IgetLeadAdditionalPayments,
  IInvoice,
  IInvoiseSelectOptions,
  ILead,
  IPassportParams,
  IPassportResponse,
  IResCalc,
  IResPaymentCurrency,
  IResSearch,
  IResSource,
  IServise,
  ISetAdditionalPaymentRes,
  ITourData,
  IUpdateContract,
  IUpdateLeadCalcPaidStatusParams,
  IUpdateLeadColumnParams,
  IUpdateLeadParams
} from './leads';
export type { ILoginParams, ILoginRes } from './login';
export type {
  IAttachment,
  IForwardMessageParams,
  IMail,
  IMailCounts,
  IMailParams,
  ISendMail,
  ISetPinMessageParams,
  ISetReadMessageParams
} from './mail';
export type { IResWorkTimeInfo } from './workTime';
