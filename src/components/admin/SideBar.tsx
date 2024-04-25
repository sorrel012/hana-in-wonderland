import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store/store.ts';
import { AWS_URL } from '../../util/constant.ts';

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

const UserImg = styled.img`
  width: 7vw;
  height: 7.5vw;
  background-color: white;
  border-radius: 50%;
  margin-bottom: 5%;
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
  name: string;
  pic: string;
}

function SideBar({ name, pic }: IAdmin) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
        <UserImg src={`${AWS_URL}/${pic}`} alt="profile-pic" />
        <UserName>{name}</UserName>
      </LoginUser>
      <Categories>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
          end
        >
          home
        </NavLink>
        <NavLink
          to="/admin/profile"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          profile
        </NavLink>
        <NavLink
          to="/admin/skills"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          skills
        </NavLink>
        <NavLink
          to="/admin/projects"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          projects
        </NavLink>
        <NavLink
          to="/admin/contact"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          contact
        </NavLink>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'isActive' : '')}
        >
          main
        </NavLink>
      </Categories>
      <Logout onClick={handleLogout}>LOGOUT</Logout>
    </Wrapper>
  );
}

export default SideBar;
