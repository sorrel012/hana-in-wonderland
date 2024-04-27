import React, { useEffect, useState } from 'react';

import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, RootState } from '../../store/store';
import { graphql, Link, navigate, useStaticQuery } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';

const Wrapper = styled.nav`
  background-color: ${(props) => props.theme.admin.navBgColor};
  height: 100vh;
  width: 25vw;
  position: relative;
`;

const LoginUser = styled.section`
  border-bottom: 1px solid ${(props) => props.theme.admin.navBorderColor};
  height: 15vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UserName = styled.div`
  color: ${(props) => props.theme.admin.navTextColor};
  font-size: 1.5vw;
`;

const Categories = styled.section`
  text-align: center;

  a {
    display: block;
    text-transform: uppercase;
    font-size: 2vw;
    font-weight: bold;
    color: ${(props) => props.theme.admin.navTextColor};
    border-bottom: 1px solid ${(props) => props.theme.admin.navBorderColor};
    padding: 10px 0;
  }

  .isActive {
    color: ${(props) => props.theme.admin.navTextHoverColor};
  }
`;

const Logout = styled.button`
  background-color: white;
  border: none;
  border-radius: 7px;
  color: ${(props) => props.theme.admin.navTextColor};
  font-size: 1.7vw;
  position: absolute;
  bottom: 2%;
  right: 5%;
  padding: 1.5% 4%;
  cursor: pointer;
`;

interface IAdmin {
  id: string;
  pic: { gatsbyImageData: {} };
}

function SideBar() {
  const dispatch = useDispatch();
  const { name, id } = useSelector((state: RootState) => state.admin);
  const [pic, setPic] = useState<any>(null);

  const data = useStaticQuery(graphql`
    query AdminProfile {
      allContentfulAdmin {
        nodes {
          contentfulid
          pic {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const adminList: IAdmin[] = data.allContentfulAdmin.nodes.map(
        (node: { contentfulid: string; pic: {} }) => ({
          ...node,
          id: node.contentfulid,
        }),
      );
      const loginAdmin = adminList.filter((admin) => admin.id === id);
      setPic(loginAdmin[0].pic);
    }
  }, [data]);

  const handleLogout = () => {
    dispatch(
      adminActions.login({
        name: '',
        pic: '',
      }),
    );
    sessionStorage.removeItem('isLogin');
    navigate('/');
  };

  return (
    <Wrapper>
      <LoginUser>
        {pic?.gatsbyImageData && (
          <GatsbyImage
            image={pic.gatsbyImageData as any}
            alt="profile-pic"
            className="pic-user"
          />
        )}
        <UserName>{name}</UserName>
      </LoginUser>
      <Categories>
        <Link to="/admin" className="isActive">
          contact
        </Link>
        <Link to="/">main</Link>
      </Categories>
      <Logout onClick={handleLogout}>LOGOUT</Logout>
    </Wrapper>
  );
}

export default SideBar;
