import React from "react";
import styled from "styled-components";

const ContentHome = props => (
  <ContentHomeStyled>
    <small>Hi, I'm</small>
    <h1 className="page-title">Daniel Levine</h1>
    <div>and I build user interfaces for the web</div>
    <div className="subtext">
      (for example, I originally built this simple/minimal site using VueJS/Nuxt
      and then rewrote it using React/Reach-Router/Styled-Components. More to
      come!)
    </div>
  </ContentHomeStyled>
);

const ContentHomeStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  text-align: center;

  @media (min-width: 500px) {
    padding: 80px;
  }

  small {
    font-size: 12px;
  }

  .page-title {
    font-size: 70px;
  }

  .subtext {
    font-size: 10px;
    margin-top: 80px;
  }
`;

export default ContentHome;
