import React from 'react';

import Header from '../components/Header';
import flower1 from '../assets/images/home/flower1.png';
import flower2 from '../assets/images/home/flower2.png';
import flower3 from '../assets/images/home/flower3.png';
import flower4 from '../assets/images/home/flower4.png';
import flower5 from '../assets/images/home/flower5.png';
import {
  BackgroundWrapper,
  Flower,
  FlowerFirstRow,
  Flowers,
  FlowerSecondRow,
  Grass,
} from './index';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { adminActions, RootState } from '../store/store';
import styled from 'styled-components';
import { graphql, navigate, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const Wrapper = styled.main`
  height: 100vh;
  background: ${(props) => props.theme.home.bgColor};
`;

const MainWrapper = styled.section`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 35%;
  position: absolute;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${(props) => props.theme.admin.loginColor};
  font-size: 2vw;
  width: 70%;
`;

const LoginButton = styled.button<{ src: string }>`
  background: url(${(props) => props.src}) no-repeat center center;
  background-size: contain;
  border: none;
  width: 100%;
  height: 80%;
  position: absolute;
  margin-top: 8%;
  cursor: pointer;
`;

interface ILogin {
  id: string;
  pw: string;
}

function Login() {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm<ILogin>();
  const apiUrl = useSelector((state: RootState) => state.apiUrl.url);

  const { grass, rabbit, book } = useStaticQuery(graphql`
    query LoginGrass {
      grass: file(relativePath: { eq: "home/grass.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      rabbit: file(relativePath: { eq: "admin/login-rabbit.png" }) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
      book: file(relativePath: { eq: "admin/login-book.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  `);

  const onLoginSubmit = (data: ILogin) => {
    if (data.id.trim().length > 0 && data.pw.trim().length > 0) {
      const params = { id: data.id, pw: data.pw };
      axios
        .post(`${apiUrl}/login`, params)
        .then((response) => {
          sessionStorage.setItem('isLogin', 'Y');
          Swal.fire({
            title: '✅',
            text: '로그인에 성공했습니다.',
          });
          dispatch(
            adminActions.login({
              name: response.data.result.name,
              pic: response.data.result.pic,
              id: response.data.result.id,
            }),
          );
          navigate('/admin');
        })
        .catch(() => {
          Swal.fire({
            title: '❗',
            text: '아이디 비밀번호가 일치하지 않습니다.',
          });
        });
    } else {
      Swal.fire({
        title: '❗',
        text: '아이디 비밀번호를 확인해 주세요.',
      });
    }
  };

  return (
    <Wrapper>
      <Header category="login" />
      <MainWrapper>
        <GatsbyImage
          alt="book"
          image={getImage(book.childImageSharp)!}
          className="pic-book"
        />
        <Form onSubmit={handleSubmit(onLoginSubmit)}>
          <InputBox>
            <Col>
              <label htmlFor="id" className="mg-b-30">
                아이디
              </label>
              <label htmlFor="pw">비밀번호</label>
            </Col>
            <Col>
              <input
                id="id"
                {...register('id', { required: false })}
                className="font-size-2 font-default pd-lr-10"
                style={{
                  border: '1px solid #6D422A',
                  borderRadius: 5,
                  outline: 'none',
                }}
              />
              <input
                id="pw"
                type="password"
                {...register('pw', { required: false })}
                className="font-size-2 font-default pd-lr-10 mg-t-30"
                style={{
                  border: '1px solid #6D422A',
                  borderRadius: 5,
                  outline: 'none',
                }}
              />
            </Col>
          </InputBox>
          <LoginButton src={rabbit.childImageSharp.fluid.src} type="submit" />
        </Form>
      </MainWrapper>
      <BackgroundWrapper>
        <Grass src={grass.childImageSharp.fluid.src} />
        <Flowers>
          <FlowerFirstRow>
            <Flower src={flower1} transform="matrix(-1, 0, 0, 1, 0, 0)" />
            <Flower src={flower3} transform="matrix(-1, 0, 0, 1, 0, 0)" />
            <Flower src={flower5} transform="matrix(-1, 0, 0, 1, 0, 0)" />
          </FlowerFirstRow>
          <FlowerSecondRow>
            <Flower src={flower2} transform="" />
            <Flower src={flower4} transform="" />
          </FlowerSecondRow>
        </Flowers>
      </BackgroundWrapper>
    </Wrapper>
  );
}

export default Login;
