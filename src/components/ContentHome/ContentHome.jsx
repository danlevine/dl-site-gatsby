import React from 'react'
import styled from 'styled-components'

const ContentHome = () => (
  <ContentHomeStyled>
    <small>Hi, I&apos;m</small>
    <h1 className="page-title">Daniel Levine</h1>
    <div>and I build user interfaces for the web</div>
    <div className="subtext">
      (for example, I originally built this simple/minimal site using VueJS/Nuxt
      and then rewrote it using react-create-app/reach-router/styled-components
      ...then ported that over to Gatsby and added Greensock for the animation
      on my resume page. More to come!)
    </div>
  </ContentHomeStyled>
)

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
`

export default ContentHome
