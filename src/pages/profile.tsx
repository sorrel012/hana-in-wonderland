import React from 'react';
import FullPage from '@fullpage/react-fullpage';
import Header from '../components/Header';
import ProfileIntro from '../components/profile/ProfileIntro';
import ProfileMain from '../components/profile/ProfileMain';
import ProfileEdu from '../components/profile/ProfileEdu';
import ProfileHistory from '../components/profile/ProfileHistory';
import Seo from '../components/Seo';

function Profile() {
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
              <ProfileIntro />
            </div>
            <div className="section">
              <ProfileMain />
            </div>
            <div className="section">
              <ProfileEdu />
            </div>
            <div className="section">
              <ProfileHistory />
            </div>
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

export const Head = () => <Seo />;
