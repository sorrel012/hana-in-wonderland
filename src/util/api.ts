import axios from 'axios';
import emailjs from '@emailjs/browser';

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

export async function saveContact(form) {
  let status = '';

  await emailjs
    .sendForm(
      process.env.GATSBY_EMAIL_SERVICE_ID,
      process.env.GATSBY_EMAIL_TEMPLATE_ID,
      form,
      {
        publicKey: process.env.GATSBY_EMAIL_PUBLIC_KEY,
      },
    )
    .then(
      () => {
        status = 'success';
      },
      (error) => {
        console.log('error: ', error);
        status = 'error';
      },
    );

  return status;
}
