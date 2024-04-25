import styled from 'styled-components';
import { useState } from 'react';

const ContactBox = styled.section`
  background-color: ${(props) => props.theme.admin.wrapperBgColor};
  border: 1px solid ${(props) => props.theme.admin.wrapperBorderColor};
  border-radius: 5px;
  color: ${(props) => props.theme.admin.textColor};
  padding: 3% 3% 1% 3%;
  margin-bottom: 3%;
`;

const Content = styled.div`
  margin-bottom: 5%;
`;

const Label = styled.h3`
  font-size: 2vw;
  flex: 2;
  margin-bottom: 1%;
  font-weight: bold;
`;

const Text = styled.div`
  width: 100%;
  border: 1px solid ${(props) => props.theme.admin.wrapperBorderColor};
  border-radius: 5px;
  padding: 10px;
  font-size: 1.8vw;
`;

export interface IContact {
  contactName: string;
  contactEmail: string;
  contactTitle: string;
  contactContent: string;
  contactDate: Date;
}

function ContactItem({
  contactName,
  contactEmail,
  contactTitle,
  contactContent,
  contactDate,
}: IContact) {
  const [openDetail, setOpenDetail] = useState(false);

  const onOpen = () => {
    setOpenDetail((prev) => !prev);
  };

  const dateFormatter = (date: Date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hour = newDate.getHours().toString().padStart(2, '0');
    const minute = newDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day} ${hour}:${minute}`;
  };

  return (
    <ContactBox>
      <Content>
        <Label style={{ cursor: 'pointer' }} onClick={onOpen}>
          날짜
        </Label>
        <Text>{dateFormatter(contactDate)}</Text>
      </Content>
      {openDetail && (
        <>
          <Content>
            <Label>이름</Label>
            <Text>{contactName}</Text>
          </Content>
          <Content>
            <Label>이메일</Label>
            <Text>{contactEmail}</Text>
          </Content>
          <Content>
            <Label>제목</Label>
            <Text>{contactTitle}</Text>
          </Content>
          <Content>
            <Label>내용</Label>
            <Text>{contactContent}</Text>
          </Content>
        </>
      )}
    </ContactBox>
  );
}

export default ContactItem;
