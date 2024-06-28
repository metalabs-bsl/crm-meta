export interface IMailChainData {
  image: string;
  name: string;
  email: string;
  date: string;
  text: string;
  reply?: IMailChainData;
}

export interface IMailData {
  id: number;
  sender: string;
  theme: string;
  text: string;
  mailChain: IMailChainData[];
  date: string;
  unread: boolean;
  pick: boolean;
  checked: boolean;
}
