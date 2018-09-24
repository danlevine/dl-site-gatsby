import React from 'react'
import styled, { keyframes, injectGlobal } from 'styled-components'
import { TweenMax, TimelineMax, Linear, Power1 } from 'gsap'

import Rari from '../../images/outrun/rari.png'
import Cloud from '../../images/outrun/cloud.png'
import PixelBugFont from '../../images/pixelBug.otf'

class Outrun extends React.Component {
  componentDidMount() {
    const cloudTL = new TimelineMax({ repeat: -1, yoyo: true, paused: true })
    cloudTL.add(
      TweenMax.fromTo(
        this.cloudRef,
        80,
        { transform: 'translateX(0%) translateY(0%)', ease: Power1.easeInOut },
        { transform: 'translateX(20%) translateY(10%)', ease: Power1.easeInOut }
      )
    )

    const carMoveTL = new TimelineMax({ repeat: -1 })
    carMoveTL
      .fromTo(
        this.carRef,
        16,
        { transform: 'translateX(-55%)', ease: Power1.easeInOut },
        { transform: 'translateX(-25%)', ease: Power1.easeInOut }
      )
      .to(this.carRef, 32, {
        transform: 'translateX(-55%)',
        ease: Power1.easeInOut,
      })

    const carBumpTL = new TimelineMax({
      delay: 6,
      repeatDelay: 6,
      repeat: -1,
    })
    carBumpTL
      .fromTo(this.carRef, 0.05, { marginBottom: 0 }, { marginBottom: '-3px' })
      .to(this.carRef, 0.05, { marginBottom: 0 })

    const roadTL = new TimelineMax({ repeat: -1 })
    roadTL.add(
      TweenMax.allFromTo(
        [this.stripesRef, this.lanesRef],
        0.6,
        { transform: 'translateY(-200px)', ease: Linear.easeNone },
        {
          transform: 'translateY(0)',
          ease: Linear.easeNone,
        }
      )
    )

    const introTL = new TimelineMax()
    introTL.add(
      TweenMax.fromTo(
        this.roadContainerRef,
        6,
        {
          transform: 'rotateX(80deg) translateZ(-200vh) translateY(100%)',
          ease: Power1.easeOut,
        },
        {
          transform: 'rotateX(70deg) translateZ(0) translateY(0)',
          ease: Power1.easeOut,
        }
      ),
      0
    )
    introTL.add(
      TweenMax.fromTo(
        this.outrunContainerRef,
        6,
        { perspective: '20px', ease: Power1.easeOut },
        { perspective: '120px', ease: Power1.easeOut }
      ),
      0
    )
    introTL.add(
      TweenMax.fromTo(
        this.cloudRef,
        3,
        { top: '140vh', ease: Power1.easeOut },
        { top: '0', ease: Power1.easeOut }
      ),
      3
    )
    introTL.add(
      TweenMax.fromTo(
        this.carRef,
        1,
        { transform: 'translateY(200%)', ease: Power1.easeOut },
        { transform: 'translateY(0)', ease: Power1.easeOut }
      ),
      5
    )
    introTL.add(
      TweenMax.fromTo(
        this.heroRef,
        0.4,
        { opacity: 0, ease: Power1.easeOut },
        { opacity: 1, ease: Power1.easeOut }
      ),
      6
    )
    introTL.add(cloudTL.play())
  }

  render() {
    return (
      <OutrunStyled ref={el => (this.outrunContainerRef = el)}>
        <div className="cloud" ref={el => (this.cloudRef = el)} />
        <div className="hero" ref={el => (this.heroRef = el)}>
          <h1>Daniel Levine</h1>
          <p>PRESS ENTER OR CLICK HERE TO START</p>
        </div>
        <div className="mountains" />
        <div
          className="road-container"
          ref={el => (this.roadContainerRef = el)}
        >
          <div className="ground-bg" />
          <div className="road">
            <div className="lanes" ref={el => (this.lanesRef = el)} />
          </div>
          <div className="stripes-container">
            <div className="stripes" ref={el => (this.stripesRef = el)} />
          </div>
        </div>
        <div className="car" ref={el => (this.carRef = el)} />
      </OutrunStyled>
    )
  }
}

injectGlobal`
  @font-face {
    font-family: 'PixelBug';
    src: url(${PixelBugFont});
  }
`

const moveContent = keyframes`
	from {
		transform: translateY(0);
	}
	to { 
		transform: translateY(100vh);
	}
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
    image-rendering: pixelated;
  }

  .hero {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 150px;
    left: 0;
    right: 0;
    font-family: PixelBug;

    h1 {
      font-size: 80px;
      text-shadow: -2px 2px 0 #000, 2px 2px 0 #000, 2px -2px 0 #000;
      color: yellow;
    }
  }

  /* .mountains {
    background: url(Horizon) no-repeat;
    height: 20px;
    width: 100%;
    position: absolute;
    top: 50%;
  } */

  .road-container {
    transform: rotateX(70deg);
    height: 100%;
    max-width: 200px;
    margin: 0 auto;
    position: relative;

    @media (min-width: 480px) {
      max-width: 400px;
    }
  }

  .ground-bg {
    width: 100000px;
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
    border-left-width: 20px;
    border-right-width: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
    position: absolute;
    overflow: hidden;

    @media (min-width: 480px) {
      border-left-width: 40px;
      border-right-width: 40px;
    }
  }

  .lanes {
    display: none;
    height: 200%;
    width: 30%;
    border: 4px dashed white;
    border-top: none;
    border-bottom: none;
    margin: 0 auto;

    @media (min-width: 480px) {
      display: block;
    }
  }

  .stripes-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    left: -5000px;
    width: 10000px;
    z-index: 2;
  }

  .stripes {
    /* background: repeating-linear-gradient(
      0deg,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 50px,
      rgba(0, 0, 0, 0.05) 50px,
      rgba(0, 0, 0, 0.05) 100px
    ); */
    position: absolute;
    height: 100%;
    width: 100%;
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
    background: url(${Rari}) center no-repeat;
    content: '';
    /* filter: brightness(100%); */
    height: 125px;
    width: 250px;
    image-rendering: pixelated;
    background-size: contain;

    @media (min-width: 480px) {
      height: 150px;
      width: 300px;
    }
  }
`

export default Outrun
