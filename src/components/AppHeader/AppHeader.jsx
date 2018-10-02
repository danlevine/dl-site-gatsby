import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, navigate } from 'gatsby'

class AppHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 'home',
      logoClicked: false,
      resumeHovered: false,
    }

    this.handleLogoClick = this.handleLogoClick.bind(this)
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this)
    this.handleResumeLinkEnter = this.handleResumeLinkEnter.bind(this)
    this.handleResumeLinkExit = this.handleResumeLinkExit.bind(this)
  }

  // TODO: Pull out link into seperate component
  isLinkActive({ isCurrent }) {
    let classList = isCurrent ? 'link active' : 'link'
    return { className: classList }
  }

  handleLogoClick() {
    this.setState({ logoClicked: true })
  }

  handleAnimationEnd() {
    if (this.state.logoClicked) navigate('/resume')
  }

  handleResumeLinkEnter() {
    console.log('hovered')
    this.setState({ resumeHovered: true })
  }

  handleResumeLinkExit() {
    console.log('unhovered')
    this.setState({ resumeHovered: false })
  }

  render() {
    return (
      <AppHeaderStyled>
        <button
          className={`logo ${this.state.logoClicked ? 'clicked' : ''} ${
            this.state.resumeHovered ? 'resume-link-hover' : ''
          }`}
          onClick={this.handleLogoClick}
          onAnimationEnd={this.handleAnimationEnd}
        >
          DL
        </button>
        <ul className="link-list">
          {this.props.links.map(link => (
            <li key={link.title} className="link-item">
              <Link to={link.url} getProps={this.isLinkActive}>
                {link.title}
              </Link>
            </li>
          ))}
          <li className="link-item">
            <button
              className="link"
              onClick={this.handleLogoClick}
              onMouseEnter={this.handleResumeLinkEnter}
              onMouseLeave={this.handleResumeLinkExit}
              onFocus={this.handleResumeLinkEnter}
              onBlur={this.handleResumeLinkExit}
            >
              Resume
            </button>
          </li>
        </ul>
      </AppHeaderStyled>
    )
  }
}

const transitionToResume = keyframes`
  0% {
    transform: scale(1);
    color: #f4f4f4;
    background-color: deepskyblue;
  }
  10% {
    transform: scale(1);
    color: transparent;
    background-color: deepskyblue;
  }
  100% {
    transform: scale(100);
    color: transparent;
    background-color: deepskyblue;
  }
`

const wobble = keyframes`
  10% {
    transform: translate3d(0, 5px, 0);
    background-color: deepskyblue;
  }
  30% {
    transform: translate3d(0, -4px, 0);
    background-color: deepskyblue;
  }
  50% {
    transform: translate3d(0, 3px, 0);
    background-color: #373737;
  }
  70% {
    transform: translate3d(0, -2px, 0);
    background-color: #373737;
  }
  90% {
    transform: translate3d(0, 1px, 0);
    background-color: #373737;
  }
  100% {
    transform: translate3d(0, 0px, 0);
    background-color: #373737;
  }
`

const AppHeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 20px 0;

  @media (min-width: 500px) {
    padding: 40px 80px 0;
  }

  .logo {
    font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
      BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
      sans-serif;
    font-size: 18px;
    font-weight: 600;
    padding: 4px 16px 18px 6px;
    border-radius: 3px;
    background-color: #373737;
    color: #f4f4f4;
    transition: 0.1s all;
    border: none;
    cursor: pointer;
    transition: 0.1s background-color ease-out;
    animation: ${wobble} 1.5s ease-in-out;
    animation-delay: 2s;
    transform: translate3d(0, 0, 0);
    backface-visibility: hidden;
    perspective: 1000px;

    &:hover,
    &.resume-link-hover {
      background-color: deepskyblue;
    }

    &.clicked {
      animation-fill-mode: forwards;
      animation: ${transitionToResume} 1 2s linear;
      transform: scale(100);
      color: transparent;
      background-color: deepskyblue;
    }

    &:focus {
      outline: none;
    }

    &:active {
      transform: scale(0.9);
    }
  }

  .link-list {
    display: flex;
    list-style: none;
    padding: 0;
  }

  .link-item {
    margin-left: 15px;

    @media (min-width: 500px) {
      margin-left: 40px;
    }
  }

  .link {
    text-decoration: none;
    color: #888;
    font-weight: 600;
    font-size: 14px;
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;

    @media (min-width: 500px) {
      font-size: 16px;
    }
  }

  .link:hover,
  .link:focus {
    padding-bottom: 10px;
    border-bottom: 5px solid #888;
    outline: none;
  }

  .link.active {
    color: #c0b283;
    border-bottom: none;
  }
`

export default AppHeader
