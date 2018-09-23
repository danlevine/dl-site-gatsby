import React from 'react'
import styled, { keyframes } from 'styled-components'
import { Link } from 'gatsby'

class AppHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 'home',
      logoClicked: false,
    }

    this.handleLogoClick = this.handleLogoClick.bind(this)
  }

  // TODO: Pull out link into seperate component
  isLinkActive({ isCurrent }) {
    let classList = isCurrent ? 'link active' : 'link'
    return { className: classList }
  }

  handleLogoClick() {
    this.setState({ logoClicked: true })
  }

  render() {
    return (
      <AppHeaderStyled>
        <button
          className={`logo ${this.state.logoClicked ? 'clicked' : ''}`}
          onClick={this.handleLogoClick}
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
        </ul>
      </AppHeaderStyled>
    )
  }
}

const rotate360 = keyframes`
  0% {
    transform: scale(1);
    color: transparent;
    background-color: #373737;
  }
  10% {
    transform: scale(1);
    color: transparent;
    background-color: #373737;
  }
  100% {
    transform: scale(100);
    color: transparent;
    background-color: deepskyblue;
  }
`

const AppHeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 40px 0;

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

    &.clicked {
      animation-fill-mode: forwards;
      animation: ${rotate360} 1 2s linear;
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
