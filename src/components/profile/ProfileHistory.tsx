import seashell2 from '../../assets/images/profile/seashell2.png';
import { Label, Logo, Row, Text } from './ProfileMain.tsx';
import styled from 'styled-components';
import Seaweeds from '../../components/profile/Seaweeds.tsx';
import Bubbles from '../../components/profile/Bubbles.tsx';
import { useQuery } from '@tanstack/react-query';
import { getProfileCareer } from '../../util/api.ts';
import { ICareer } from '../../components/admin/profile/AdminProfileCareer.tsx';
import { Period } from './ProfileEdu.tsx';
import CareerProjectItem from '../../components/profile/CareerProjectItem.tsx';

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

const Career = styled.section`
  width: 70%;
  background-color: ${(props) => props.theme.profile.boxColor};
  border-radius: 20px;
  padding: 30px 40px 20px 30px;
  z-index: 99;
  margin-bottom: 5vh;
`;

const CareerContent = styled.div`
  padding-left: 5%;
`;

const Company = styled.div`
  font-weight: bold;
  font-size: 1.8vw;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5%;
`;

const CompanyName = styled.div`
  flex: 10;
  margin-left: 8.5vw;
`;

const Project = styled.div`
  padding-left: 3%;
`;

function ProfileHistory() {
  const { data, isLoading } = useQuery({
    queryKey: ['profileCareer'],
    queryFn: getProfileCareer,
  });

  return (
    <Wrapper>
      <Career>
        <Row>
          <Label>
            <Logo src={seashell2} alt="seashell" />
            <Text custom="red">경력</Text>
          </Label>
        </Row>
        {!isLoading &&
          data &&
          data.map((career: ICareer) => (
            <CareerContent key={career.careerCompany}>
              <Company>
                <Period>◾ {career.careerPeriod}</Period>
                <CompanyName>{career.careerCompany}</CompanyName>
              </Company>
              <Project>
                <CareerProjectItem {...{ company: career.careerCompany }} />
              </Project>
            </CareerContent>
          ))}
      </Career>
      <Seaweeds />
      <Bubbles />
    </Wrapper>
  );
}

export default ProfileHistory;
