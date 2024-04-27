import axios from 'axios';
import { IContactProps } from '../pages/contact';

const apiUrl = process.env.GATSBY_API_URL;

export interface IProfileInfo {
  name: string | undefined;
  mainPic: string | undefined;
  title: string | undefined;
  content: string | undefined;
  subPic: string | undefined;
  birth: string | undefined;
  email: string | undefined;
  address: string | undefined;
}

export async function getContact() {
  const { data } = await axios.get(`${apiUrl}/contact`);
  return data.result;
}

export async function saveContact(contact: IContactProps) {
  const { data } = await axios.post(`${apiUrl}/contact`, contact);
  return data;
}
