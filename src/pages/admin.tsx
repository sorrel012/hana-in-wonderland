import React from 'react';
import styled from 'styled-components';
import SideBar from '../components/admin/SideBar';
import AdminContact from '../components/admin/AdminContact';

const Wrapper = styled.nav`
  display: flex;
`;

function Admin() {
  return (
    <Wrapper>
      <SideBar />
      <AdminContact />
    </Wrapper>
  );
}

export default Admin;
