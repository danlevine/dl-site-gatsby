import React from "react";
import styled from "styled-components";
import { lighten, darken, transparentize } from "polished";
import PuckmanAvatar from "./PuckmanAvatar";

class Puckman extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      puckman: {
        x: 15,
        y: 15,
        size: 20
      },
      gameOn: false
    };

    this.insertCoin = this.insertCoin.bind(this);
    this.checkForElementToDestroy = this.checkForElementToDestroy.bind(this);
  }

  insertCoin() {
    if (this.state.gameOn) return; // return if game already started

    this.setState({ gameOn: true });
    document.addEventListener("keydown", e => {
      const keyCode = e.keyCode;

      const keyMap = {
        left: 37,
        up: 38,
        right: 39,
        down: 40
      };

      if ([37, 38, 39, 40].indexOf(keyCode) !== -1) {
        const oldX = this.state.puckman.x;
        const oldY = this.state.puckman.y;
        let newX = oldX;
        let newY = oldY;

        const increment = 15;
        if (keyCode === keyMap["left"]) newX = oldX - increment;
        else if (keyCode === keyMap["up"]) newY = oldY - increment;
        else if (keyCode === keyMap["right"]) newX = oldX + increment;
        else if (keyCode === keyMap["down"]) newY = oldY + increment;

        this.checkForElementToDestroy(newX, newY);

        this.setState({
          puckman: { x: newX, y: newY, size: this.state.puckman.size }
        });
      }
    });
  }

  checkForElementToDestroy(x, y) {
    const { size } = this.state.puckman;
    const overlappingElements = [
      document.elementFromPoint(x, y),
      document.elementFromPoint(x + size, y),
      document.elementFromPoint(x + size, y + size),
      document.elementFromPoint(x, y + size),
      document.elementFromPoint(x + size / 2, y + size / 2)
    ];

    const uniqueOverlappingElements = overlappingElements.filter(function(
      item,
      i,
      ar
    ) {
      return (
        ar.indexOf(item) === i &&
        item.children.length === 0 &&
        !item.className.includes("puckman")
      );
    });

    uniqueOverlappingElements.forEach(element => {
      // console.log(element);
      // debugger;
      // element.parentNode.removeChild(element);
      element.classList.add("puckman-food");
    });
  }

  render() {
    return (
      <PuckmanStyled left={this.state.puckman.x} top={this.state.puckman.y}>
        <button className="puckman-start-btn" onClick={this.insertCoin} />
        {this.state.gameOn && (
          <PuckmanAvatar x={this.state.puckman.x} y={this.state.puckman.y} />
        )}
      </PuckmanStyled>
    );
  }
}

const StyleButtonVariables = {
  color: "hsla(10, 90%, 40%, 1)",
  size: "25"
};

const PuckmanStyled = styled.div`
  .puckman-start-btn {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: ${StyleButtonVariables.size + "px"};
    height: ${StyleButtonVariables.size + "px"};
    border: 0;
    margin: 1em;
    outline: none;
    background-color: ${StyleButtonVariables.color};
    border-radius: 50%;
    cursor: pointer;
    transition: box-shadow 200ms;

    box-shadow: inset 0 ${StyleButtonVariables.size / 32 + "px"} 0
        ${lighten(0.05, StyleButtonVariables.color)},
      inset 0 ${StyleButtonVariables.size / -32 + "px"} 0
        ${darken(0.05, StyleButtonVariables.color)},
      inset 0 0 0 ${StyleButtonVariables.size / 32 + "px"}
        ${darken(0.03, StyleButtonVariables.color)},
      inset 0 0 0 ${StyleButtonVariables.size / 12 + "px"}
        ${StyleButtonVariables.color},
      inset 0 0 0 ${StyleButtonVariables.size / 10 + "px"}
        ${darken(0.2, StyleButtonVariables.color)},
      inset 0 0 0 ${StyleButtonVariables.size / 9.2 + "px"}
        ${darken(0.5, StyleButtonVariables.color)},
      inset 0 0 0 ${StyleButtonVariables.size / 7.5 + "px"}
        ${transparentize(0.3, lighten(0.3, StyleButtonVariables.color))},
      inset 0 0 0 ${StyleButtonVariables.size / 5.5 + "px"}
        ${StyleButtonVariables.color},
      inset 0 ${StyleButtonVariables.size / 2.5 + "px"}
        ${StyleButtonVariables.size / 7.5 + "px"}
        ${darken(0.05, StyleButtonVariables.color)},
      inset 0 0 ${StyleButtonVariables.size / 10 + "px"}
        ${StyleButtonVariables.size / 6 + "px"}
        ${darken(0.1, StyleButtonVariables.color)},
      0 ${StyleButtonVariables.size / 20 + "px"} 0 rgba(0, 0, 0, 0.3);

    &:after {
      content: "";
      position: absolute;
      bottom: ${StyleButtonVariables.size / 20 + "px"};
      left: ${StyleButtonVariables.size / 10 + "px"};
      display: block;
      width: ${StyleButtonVariables.size / 1.25 + "px"};
      height: ${StyleButtonVariables.size / 1.25 + "px"};
      border: ${StyleButtonVariables.size / 15 + "px"} solid rgba(0, 0, 0, 0.3);
      border-width: 0 0 ${StyleButtonVariables.size / 15 + "px"};
      border-radius: 50%;
      transition-duration: 200ms;
    }

    &:active,
    &.is-pushed {
      box-shadow: inset 0 ${StyleButtonVariables.size} / 32 0
          ${lighten(0.05, StyleButtonVariables.color)},
        inset 0 (-${StyleButtonVariables.size} / 32) 0
          ${darken(0.05, StyleButtonVariables.color)},
        inset 0 0 0 ${StyleButtonVariables.size} / 32
          ${darken(0.03, StyleButtonVariables.color)},
        inset 0 0 0 ${StyleButtonVariables.size} / 12
          ${StyleButtonVariables.color},
        inset 0 0 0 ${StyleButtonVariables.size} / 10
          ${darken(0.2, StyleButtonVariables.color)},
        inset 0 0 0 ${StyleButtonVariables.size} / 8.5
          ${darken(0.4, StyleButtonVariables.color)},
        inset 0 0 0 ${StyleButtonVariables.size} / 7.5
          ${transparentize(0.8, lighten(0.3, StyleButtonVariables.color))},
        inset 0 0 0 ${StyleButtonVariables.size} / 5.5
          ${darken(0.03, StyleButtonVariables.color)},
        inset 0 ${StyleButtonVariables.size} / 2.5 ${StyleButtonVariables.size} /
          7.5 ${darken(0.08, StyleButtonVariables.color)},
        inset 0 0 ${StyleButtonVariables.size} / 10 ${StyleButtonVariables.size} /
          6 ${darken(0.15, StyleButtonVariables.color)},
        0 ${StyleButtonVariables.size} / 20 0 rgba(0, 0, 0, 0.3);
      background-color: ${darken(0.02, StyleButtonVariables.color)};

      &:after {
        bottom: ${StyleButtonVariables.size} / 20 + ${StyleButtonVariables.size} /
          15;
        border-width: 0;
      }
    }
  }
`;

export default Puckman;
