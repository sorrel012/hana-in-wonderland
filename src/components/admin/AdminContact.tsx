import React from 'react';

import styled from 'styled-components';
import { useQuery } from '@tanstack/react-query';
import { getContact } from '../../util/api';
import ContactItem, { IContact } from './ContactItem';

const Wrapper = styled.main`
  background-color: ${(props) => props.theme.admin.bgColor};
  width: 75vw;
  height: 100vh;
  padding: 3%;
  overflow-y: auto;
  color: ${(props) => props.theme.admin.textColor};
`;

const MainTitle = styled.h2`
  font-size: 2vw;
  font-weight: bold;
  margin-bottom: 2%;
`;

function AdminContact() {
  const { data, isLoading } = useQuery({
    queryKey: ['contact'],
    queryFn: getContact,
  });

  return (
    <Wrapper>
      <MainTitle>Contact</MainTitle>
      {!isLoading &&
        data !== null &&
        data.map((contact: IContact) => (
          <ContactItem key={contact.contactContent} {...contact} />
        ))}
      {!isLoading && data === null && <div>Contact가 없습니다.</div>}
    </Wrapper>
  );
}

export default AdminContact;
