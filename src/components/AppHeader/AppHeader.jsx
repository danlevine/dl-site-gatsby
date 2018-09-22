import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

class AppHeader extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePage: 'home',
    }
  }

  // TODO: Pull out link into seperate component
  isLinkActive({ isCurrent }) {
    let classList = isCurrent ? 'link active' : 'link'
    return { className: classList }
  }

  render() {
    return (
      <AppHeaderStyled>
        <Link to="/">
          <div className="logo">DL</div>
        </Link>
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
    background: #373737;
    color: #f4f4f4;
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
