import styled from 'styled-components';
import seashell2 from '../../assets/images/profile/seashell2.png';
import Bubbles from '../../components/profile/Bubbles.tsx';
import Seaweeds from '../../components/profile/Seaweeds.tsx';
import { useEffect, useState } from 'react';
import { IEducation } from '../../components/admin/profile/AdminProfileEdu.tsx';
import { Label, Logo, Text } from './ProfileMain.tsx';
import { useQuery } from '@tanstack/react-query';
import { getProfileEdu } from '../../util/api.ts';

const Wrapper = styled.main`
  background: ${(props) => props.theme.profile.bgColor};
  height: 100vh;
  width: 100vw;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Row = styled.div`
  margin-bottom: 10px;
`;

const Education = styled.section`
  width: 80%;
  background-color: ${(props) => props.theme.profile.boxColor};
  border-radius: 20px;
  padding: 30px 40px 20px 30px;
  z-index: 99;
  margin-bottom: 5vh;
`;

export const EduContent = styled.div`
  padding-left: 5%;
  font-weight: bold;
  font-size: 1.8vw;
  display: flex;
  justify-content: space-between;
`;

export const PeriodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 4vw;
`;

export const Period = styled.time`
  margin-bottom: 10px;
`;

const School = styled.span`
  margin-bottom: 10px;
`;

const Experience = styled.section`
  width: 80%;
  background-color: ${(props) => props.theme.profile.boxColor};
  border-radius: 20px;
  padding: 30px 40px 20px 30px;
  z-index: 99;
  margin-bottom: 5vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 10;
`;

const Content = styled.span`
  margin-bottom: 10px;
`;

function ProfileEdu() {
  const [sEducations, setSEducations] = useState<IEducation[]>([]);
  const [eEducations, setEEducations] = useState<IEducation[]>([]);

  const { data: eduData, isLoading: isEduLoading } = useQuery({
    queryKey: ['profileEdu'],
    queryFn: getProfileEdu,
  });

  useEffect(() => {
    if (!isEduLoading && eduData) {
      setSEducations(eduData.filter((v: IEducation) => v.eduCategory === 'S'));
      setEEducations(eduData.filter((v: IEducation) => v.eduCategory === 'E'));
    }
  }, [eduData, isEduLoading]);

  return (
    <Wrapper>
      <Education>
        <Row>
          <Label>
            <Logo src={seashell2} alt="seashell" />
            <Text custom="red">학력</Text>
          </Label>
        </Row>
        <EduContent>
          <PeriodWrapper>
            {sEducations.map((edu: IEducation) => (
              <Period key={edu.eduPeriod}>◾ {edu.eduPeriod}</Period>
            ))}
          </PeriodWrapper>
          <ContentWrapper>
            {sEducations.map((edu: IEducation) => (
              <School key={edu.eduContent}>◾ {edu.eduContent}</School>
            ))}
          </ContentWrapper>
        </EduContent>
      </Education>
      <Experience>
        <Row>
          <Label>
            <Logo src={seashell2} alt="seashell" />
            <Text custom="red">교육·경험</Text>
          </Label>
        </Row>
        <EduContent>
          <PeriodWrapper>
            {eEducations.map((edu: IEducation) => (
              <Period key={edu.eduPeriod}>◾ {edu.eduPeriod}</Period>
            ))}
          </PeriodWrapper>
          <ContentWrapper>
            {eEducations.map((edu: IEducation) => (
              <Content key={edu.eduContent}>◾ {edu.eduContent}</Content>
            ))}
          </ContentWrapper>
        </EduContent>
      </Experience>
      <Bubbles />
      <Seaweeds />
    </Wrapper>
  );
}

export default ProfileEdu;
