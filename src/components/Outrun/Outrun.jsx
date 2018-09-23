import React from 'react'
import styled, { keyframes } from 'styled-components'

import Rari from '../../images/outrun/rari.png'
import Cloud from '../../images/outrun/cloud.png'
import Horizon from '../../images/outrun/horizon.png'

const Outrun = () => (
  <OutrunStyled>
    <div className="cloud" />
    <div className="mountains" />
    <div className="road-container">
      <div className="ground-bg" />
      <div className="road" />
      <div className="stripes" />
    </div>
    <div className="car car-move" />
    {/* <img alt="car" src={Rari} /> */}
  </OutrunStyled>
)

const moveContent = keyframes`
	from {
		transform: translateY(0);
	}
	to { 
		transform: translateY(100vh);
	}
`

const stripes = keyframes`
	from {
		transform: translateY(0) translateX(-50%);
	}
	to { 
		transform: translateY(206px) translateX(-50%);
	}
`

const car = keyframes`
  0% {transform: translateX(-75%);}
  40% {transform: translateX(28%);}
  100% {transform: translateX(-75%);}
`

const cloud = keyframes`
  0% {transform: translateX(0%) translateY(0%);}
  40% {transform: translateX(20%) translateY(10%);}
  100% {transform: translateX(0%) translateY(0%);}
`

const bump = keyframes`
  0% {margin-bottom: 0;}
  98% {margin-bottom: 0;}
  99% {margin-bottom: -2px;}
  100% {margin-bottom: 0;}
`

const OutrunStyled = styled.div`
  background-color: deepskyblue;
  perspective: 120px;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;

  .cloud {
    background: url(${Cloud}) no-repeat 0 20px;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 50%;
    top: 0;
    animation-name: ${cloud};
    animation-duration: 300s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    image-rendering: pixelated;
  }

  .mountains {
    background: url(${Horizon}) no-repeat;
    height: 20px;
    width: 100%;
    position: absolute;
    top: 50%;
  }

  .road-container {
    transform: rotateX(70deg);
    height: 100%;
    max-width: 400px;
    margin: 0 auto;
    position: relative;
  }

  .ground-bg {
    width: 9999px;
    height: 100%;
    background-color: #10a810;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translateX(-50%);
  }

  .road {
    background-color: #9c969c;
    border: 0 solid #eee;
    border-left-width: 40px;
    border-right-width: 40px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    position: absolute;
  }

  .stripes {
    background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 50px,
      rgba(0, 0, 0, 0.05) 50px,
      rgba(0, 0, 0, 0.05) 100px
    );
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 2;

    left: 50%;
    right: 50%;
    transform: translateX(-50%);
    width: 9999px;

    animation-name: ${stripes};
    animation-duration: 0.4s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .text {
    position: absolute;
    text-align: center;
    z-index: 4;
    font-family: sans-serif;
    font-weight: bold;
    width: 100%;
    animation-name: ${moveContent};
    animation-duration: 2s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  img {
    position: absolute;
    bottom: 100px;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    image-rendering: pixelated;
    /* filter: brightness(43%); */
  }

  .car {
    position: absolute;
    bottom: 50px;
    left: 50%;
    /* transform: scale(6); */
    background: url(${Rari}) center no-repeat;
    content: '';
    /* filter: brightness(100%); */
    height: 150px;
    width: 300px;
    image-rendering: pixelated;
    background-size: contain;
  }

  .car-move {
    animation-name: ${car}, ${bump};
    animation-duration: 30s, 6s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
`

export default Outrun
