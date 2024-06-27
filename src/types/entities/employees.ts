export interface IResponsibleEmployees {
  id: string;
  first_name: string;
  second_name: string;
  email: string;
}

export interface IResResponsible {
  count: number;
  employees: IResponsibleEmployees[];
}
