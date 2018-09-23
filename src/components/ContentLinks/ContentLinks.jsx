import React from 'react'
import styled from 'styled-components'

import GithubIcon from '../../images/github.svg'
import LinkedinIcon from '../../images/linkedin.svg'

const ContentLinks = () => (
  <ContentLinksStyled>
    <h1 className="page-title">Witness me</h1>
    <div className="links">
      <a
        className="link--linkedin"
        href="https://www.linkedin.com/in/iamdanlevine/"
      >
        <img src={LinkedinIcon} alt="Linkedin icon" />
      </a>
      <a className="link--github" href="https://github.com/danlevine">
        <img src={GithubIcon} alt="Github icon" />
      </a>
    </div>
  </ContentLinksStyled>
)

const ContentLinksStyled = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 20px;

  .links {
    display: flex;
    flex-direction: column;
  }

  a {
    border: 8px solid transparent;
    border-radius: 50px;
  }

  a.link--linkedin:hover,
  a.link--linkedin:focus {
    border-color: #0077b5;
    outline: none;
  }

  a.link--github:hover,
  a.link--github:focus {
    border-color: #4078c0;
    outline: none;
  }

  img {
    max-width: 100%;
  }

  @media (min-width: 500px) {
    .links {
      flex-direction: row;
    }

    a {
      margin: 0 20px;
    }
  }
`

export default ContentLinks
