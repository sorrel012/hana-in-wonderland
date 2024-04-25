import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    home: {
      bgColor: string;
      titleColor: string;
      textColor: string;
    };
    header: {
      profile: {
        bgColor: string;
        textColor: string;
        borderColor: string;
      };
      skills: {
        bgColor: string;
        textColor: string;
        borderColor: string;
      };
      projects: {
        bgColor: string;
        textColor: string;
        borderColor: string;
      };
      contact: {
        bgColor: string;
        textColor: string;
        borderColor: string;
      };
      login: {
        bgColor: string;
        textColor: string;
        borderColor: string;
      };
    };
    profile: {
      bgColor: string;
      boxColor: string;
      titleColor: string;
      labelColor: string;
      textColor: string;
    };
    skills: {
      bgColor: string;
      textColor: string;
    };
    projects: {
      headerBgColor: string;
      headerTextColor: string;
      bgColor: string;
      wrapperBgColor: string;
      contentBgColor: string;
    };
    contact: {
      bgColor: string;
      headerColor: string;
      textColor: string;
      boxColor: string;
    };
    admin: {
      loginColor: string;
      navBgColor: string;
      navBorderColor: string;
      navTextColor: string;
      navTextHoverColor: string;
      textColor: string;
      bgColor: string;
      wrapperBgColor: string;
      wrapperBorderColor: string;
    };
  }
}
