import React from "react";
import styled from "styled-components";

const ContentAbout = props => (
  <ContentAboutStyled>
    <h1 className="page-title">A bit about me</h1>
    <p>
      I've always had an interest in technology and computers, especially the
      area of interaction between the user and the device. These interactions
      make a language that we use to communicate with our devices, and as a user
      of these devices, my goal has been to help make this language translation
      as seamless as possible.
    </p>
    <p>
      Having worked on various websites as a hobbyist and a consultant during
      and after college, I began my professional career in user experience and
      design. I eventually felt a desire to not only contribute to the
      conceptualization stage, but also to actually construct a user interface.
      This further led me to transition with my creative background/knowledge
      into the area of front-end development, providing me with the opportunity
      to craft user-friendly and visually pleasing experiences for the modern
      web.
    </p>
  </ContentAboutStyled>
);

const ContentAboutStyled = styled.section`
  padding: 40px;
  text-align: center;

  @media (min-width: 500px) {
    padding: 80px;
  }

  p {
    text-align: justify;
  }

  p:first-of-type {
    margin: 20px 0 40px;
  }
`;

export default ContentAbout;
