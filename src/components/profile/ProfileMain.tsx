import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import seashell from '../../assets/images/profile/seashell.png';
import seashell2 from '../../assets/images/profile/seashell2.png';
import Bubbles from '../../components/profile/Bubbles';
import Seaweeds from '../../components/profile/Seaweeds';
import { IMainProps } from '../../pages/profile';
import { useQuery } from '@tanstack/react-query';
import { getProfileCert } from '../../util/api';
import { ICertification } from '../admin/profile/AdminProfileCert';
import { AWS_URL } from '../../util/constant';

const Wrapper = styled.main`
  background: ${(props) => props.theme.profile.bgColor};
  height: 100vh;
  width: 100vw;
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.section`
  width: 70%;
  background-color: ${(props) => props.theme.profile.boxColor};
  border-radius: 20px;
  padding: 30px;
  z-index: 99;
`;

const PersonalInfo = styled.section`
  display: flex;
  margin-bottom: 5%;
`;

const Img = styled.img`
  width: 20%;
`;

const Info = styled.div`
  padding-left: 20px;
  display: flex;
`;

const LabelWrapper = styled.div`
  margin: 0 6.5vw 0 2vw;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const Label = styled.span`
  display: flex;
  align-items: flex-end;
`;

export const Logo = styled.img`
  width: 2.5vw;
  margin-right: 10px;
`;

const Information = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  font-weight: bold;
  font-size: 1.8vw;
`;

export const Text = styled.div<{ custom: string }>`
  color: ${(props) =>
    props.custom === 'black'
      ? props.theme.profile.textColor
      : props.theme.profile.labelColor};
  font-size: 2vw;
  font-weight: bold;
`;

export const Row = styled.div`
  margin-bottom: 2%;
`;

const Certificate = styled.section`
  margin-top: 10px;
`;

const CertContent = styled.div`
  padding-left: 5%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  color: ${(props) => props.theme.profile.textColor};
`;

const Content = styled.div`
  font-weight: bold;
  font-size: 1.8vw;
`;

function ProfileMain({ subPic, name, birth, email, address }: IMainProps) {
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ['profileCert'],
    queryFn: getProfileCert,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setCertifications(data);
    }
  }, [data, isLoading]);

  return (
    <Wrapper>
      <Box>
        <PersonalInfo>
          <Img src={`${AWS_URL}/${subPic}`} />
          <Info>
            <LabelWrapper>
              <Label>
                <Logo src={seashell} alt="seashell" />
                <Text custom="red">이름</Text>
              </Label>
              <Label>
                <Logo src={seashell} alt="seashell" />
                <Text custom="red">생년월일</Text>
              </Label>
              <Label>
                <Logo src={seashell} alt="seashell" />
                <Text custom="red">이메일</Text>
              </Label>
              <Label>
                <Logo src={seashell} alt="seashell" />
                <Text custom="red">주소</Text>
              </Label>
            </LabelWrapper>
            <Information>
              <Text custom="black">{name}</Text>
              <Text custom="black">{birth}</Text>
              <Text custom="black">{email}</Text>
              <Text custom="black">{address}</Text>
            </Information>
          </Info>
        </PersonalInfo>
        <Certificate>
          <Row>
            <Label>
              <Logo src={seashell2} alt="seashell" />
              <Text custom="red">자격증 및 어학</Text>
            </Label>
          </Row>
          <CertContent>
            {!isLoading &&
              certifications.map((cert: ICertification) => (
                <Content key={cert.certName}>
                  ◾ {cert.certName}({cert.certDate})
                  {cert.certScore ? ' - ' : ''}
                  {cert.certScore ? cert.certScore : ''}
                </Content>
              ))}
          </CertContent>
        </Certificate>
      </Box>
      <Bubbles />
      <Seaweeds />
    </Wrapper>
  );
}

export default ProfileMain;
