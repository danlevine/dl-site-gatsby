import React from "react";
import styled from "styled-components";

const PuckmanAvatar = props => (
  <PuckmanAvatarStyled x={props.x} y={props.y}>
    <div className="puckman__top" />
    <div className="puckman__bottom" />
    <div className="puckman__cover" />
  </PuckmanAvatarStyled>
);

const PuckmanAvatarStyled = styled.div`
  display: block;
  position: absolute;
  transition: 0.1s all;
  animation: slide-in-left 1s ease-out;

  left: ${props => props.x + "px"};
  top: ${props => props.y + "px"};
  width: 20px;
  height: 20px;

  div {
    position: absolute;
    width: 20px;
    height: 10px;
    border-radius: 120px 120px 0 0;
    background: #ffff00;
  }

  .puckman__top,
  .puckman__bottom {
    animation: puckman-top 0.8s linear infinite;
    transform-origin: 10px 10px;
    border: 1px solid hsl(60, 100%, 35%);
  }

  .puckman__bottom {
    animation: puckman-bottom 0.8s linear infinite;
  }

  .puckman__cover {
    transform: rotate(270deg) translateX(-13.5px) translateY(5px) scale(0.85);
    transform-origin: 0;
  }

  @keyframes puckman-top {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(-45deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
  @keyframes puckman-bottom {
    0% {
      transform: rotate(180deg);
    }
    50% {
      transform: rotate(225deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  @keyframes slide-in-left {
    0% {
      left: -40px;
    }
    100% {
      left: 15px;
    }
  }
`;

export default PuckmanAvatar;
