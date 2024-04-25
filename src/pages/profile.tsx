import React from 'react';
import FullPage from '@fullpage/react-fullpage';
import Header from '../components/Header';
import ProfileIntro from '../components/profile/ProfileIntro';

export interface IIntroProps {
  mainPic: string;
  title: string;
  content: string;
}

export interface IMainProps {
  subPic: string;
  name: string;
  birth: string;
  email: string;
  address: string;
}

function Profile() {
  const tmp: IIntroProps = {
    mainPic: 'tmp',
    title: 'profile',
    content: 'g',
  };
  return (
    <FullPage
      licenseKey={process.env.GATSBY_FULLPAGE_LICENSE_KEY}
      scrollingSpeed={1000}
      navigation
      anchors={['intro', 'main', 'edu', 'career']}
      controlArrows
      controlArrowsHTML={[
        '<div class="fp-arrow"></div>',
        '<div class="fp-arrow"></div>',
      ]}
      sectionsColor={['#fff']}
      render={() => {
        return (
          <>
            <div className="section">
              <Header category="profile" />
              <ProfileIntro {...tmp} />
            </div>
            {/*<div className="section">*/}
            {/*  <ProfileMain />*/}
            {/*</div>*/}
            {/*<div className="section">*/}
            {/*  <ProfileEdu />*/}
            {/*</div>*/}
            {/*<div className="section">*/}
            {/*  <ProfileHistory />*/}
            {/*</div>*/}
          </>
        );
      }}
      credits={{
        enabled: false,
      }}
    />
  );
}

export default Profile;
