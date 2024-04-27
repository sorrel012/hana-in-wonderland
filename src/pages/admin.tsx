import React from 'react';
import styled from 'styled-components';
import AdminContact from '../components/admin/AdminContact';
import SideBar from '../components/admin/SideBar';
import Seo from '../components/Seo';

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

export const Head = () => <Seo />;
