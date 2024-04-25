import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import seashell2 from '../../assets/images/profile/seashell2.png';
import Bubbles from '../../components/profile/Bubbles';
import Seaweeds from '../../components/profile/Seaweeds';
import { Label, Logo, Text } from './ProfileMain';
import { graphql, useStaticQuery } from 'gatsby';

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

interface IEducation {
  period: string;
  content: string;
  category: string;
  order: number;
}

function ProfileEdu() {
  const [sEducations, setSEducations] = useState<IEducation[]>([]);
  const [eEducations, setEEducations] = useState<IEducation[]>([]);

  const data = useStaticQuery<Queries.ProfileEduQuery>(graphql`
    query ProfileEdu {
      allContentfulEducation {
        edges {
          node {
            period
            content {
              content
            }
            category
            order
          }
        }
      }
    }
  `);

  useEffect(() => {
    if (data) {
      const eduList = data.allContentfulEducation.edges;
      const newEdus: IEducation[] = eduList.map((edu: any) => {
        const { period, content, order, category } = edu.node;
        return { period, content: content.content, order, category };
      });
      newEdus.sort((a, b) => a.order - b.order);

      setSEducations(newEdus.filter((v: IEducation) => v.category === 'S'));
      setEEducations(newEdus.filter((v: IEducation) => v.category === 'E'));
    }
  }, [data]);

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
              <Period key={edu.period}>◾ {edu.period}</Period>
            ))}
          </PeriodWrapper>
          <ContentWrapper>
            {sEducations.map((edu: IEducation) => (
              <School key={edu.content}>◾ {edu.content}</School>
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
              <Period key={edu.period}>◾ {edu.period}</Period>
            ))}
          </PeriodWrapper>
          <ContentWrapper>
            {eEducations.map((edu: IEducation) => (
              <Content key={edu.content}>◾ {edu.content}</Content>
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
