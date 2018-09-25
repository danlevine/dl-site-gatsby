import React from 'react'
import styled, { keyframes, injectGlobal } from 'styled-components'
import { TweenMax, TimelineMax, Linear, Power1, Power4 } from 'gsap'

import ResumeText from './ResumeText'

import Rari from '../../images/outrun/rari.png'
import Cloud from '../../images/outrun/cloud.png'
import SwissSienaFont from '../../images/outrun/fonts/SwissSiena.ttf'

class Outrun extends React.Component {
  constructor(props) {
    super(props)

    this.roadTlLoopActive = true

    this.handleStartButtonClick = this.handleStartButtonClick.bind(this)
    this.checkRoadTlLoopActive = this.checkRoadTlLoopActive.bind(this)
    this.tryPlayResume = this.tryPlayResume.bind(this)
  }

  componentDidMount() {
    this.cloudTL = new TimelineMax({
      repeat: -1,
      yoyo: true,
      paused: true,
    })
    this.cloudTL.fromTo(
      this.cloudRef,
      80,
      { transform: 'translateX(0%) translateY(0%)', ease: Power1.easeInOut },
      { transform: 'translateX(20%) translateY(10%)', ease: Power1.easeInOut }
    )

    this.carMoveTL = new TimelineMax({
      repeat: -1,
    })
    this.carMoveTL
      .fromTo(
        this.carRef,
        16,
        { transform: 'translateX(-5%)', ease: Power1.easeInOut },
        { transform: 'translateX(25%)', ease: Power1.easeInOut }
      )
      .to(this.carRef, 32, {
        transform: 'translateX(-5%)',
        ease: Power1.easeInOut,
      })

    this.carBumpTL = new TimelineMax({
      delay: 6,
      repeatDelay: 6,
      repeat: -1,
    })
    this.carBumpTL
      .fromTo(this.carRef, 0.05, { marginBottom: 0 }, { marginBottom: '-3px' })
      .to(this.carRef, 0.05, { marginBottom: 0 })

    this.roadTL = new TimelineMax({
      repeat: -1,
      onRepeat: this.checkRoadTlLoopActive,
      onRepeatParams: ['{self}'],
      onRepeatScope: this,
    })
    this.roadTL.add(
      TweenMax.fromTo(
        // [this.stripesRef, this.lanesRef],
        this.lanesRef,
        0.6,
        { transform: 'translateY(-200px)', ease: Linear.easeNone },
        {
          transform: 'translateY(0)',
          ease: Linear.easeNone,
        }
      )
    )

    this.heroTL = new TimelineMax({ paused: true })
    this.heroTL
      .fromTo(
        this.heroRef,
        1,
        { visibility: 'hidden', ease: Power1.easeOut },
        { visibility: 'visible', ease: Power1.easeOut }
      )
      .fromTo(this.heroTxtRef, 0, { opacity: 1 }, { opacity: 0 })
      .repeatDelay(1)
      .repeat(-1)

    // INTRO Timeline
    this.introTL = new TimelineMax()
    this.introTL
      .fromTo(
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
      )
      .fromTo(
        this.outrunContainerRef,
        6,
        { perspective: '20px', ease: Power1.easeOut },
        { perspective: '120px', ease: Power1.easeOut },
        0
      )
      .fromTo(
        this.cloudRef,
        3,
        { top: '140vh', ease: Power1.easeOut },
        { top: '0', ease: Power1.easeOut },
        3
      )
      .fromTo(
        this.carRef,
        1,
        { transform: 'translateY(200%)', ease: Power1.easeOut },
        { transform: 'translateY(0)', ease: Power1.easeOut },
        '-=1'
      )
      .add(this.heroTL.play())
      .add(this.cloudTL.play())

    this.resumeTL = new TimelineMax({ paused: true })
    this.resumeTL
      .fromTo(
        this.lanesRef,
        0.6,
        {
          transform: 'translateY(0)',
          ease: Linear.easeNone,
        },
        { transform: 'translateY(-1500px)', ease: Linear.easeNone }
      )
      .set(this.lanesRef, { display: 'none' })
      .set(this.resumeRef, { display: 'block' })
      .to(this.heroRef, 1, { opacity: 0 })
      .add('startRotation')
      .to(
        this.roadContainerRef,
        3,
        {
          transform: 'rotateX(0)',
          ease: Power1.easeInOut,
        },
        'startRotation'
      )
      .to(
        this.roadContainerRef,
        1,
        { maxWidth: '800px', ease: Power1.easeInOut },
        'startRotation+=2.5'
      )
      .to(
        this.carRef,
        0.75,
        { transform: 'translateY(200px)', ease: Power1.easeInOut },
        'startRotation'
      )
      .fromTo(
        this.resumeRef,
        10,
        { transform: 'translateY(100vh)', ease: Power4.easeOut },
        { transform: 'translateY(0)', ease: Power4.easeOut }
      )
    // TweenMax.pauseAll()
  }

  checkRoadTlLoopActive(tl) {
    if (!this.roadTlLoopActive) {
      tl.repeat(0)

      this.tryPlayResume()
    }
  }

  tryPlayResume() {
    if (!this.roadTlLoopActive) {
      this.resumeTL.play()

      this.carBumpTL.pause()
      this.carMoveTL.pause()
      this.cloudTL.pause()
    }
  }

  handleStartButtonClick() {
    this.roadTlLoopActive = false
  }

  render() {
    return (
      <OutrunStyled ref={el => (this.outrunContainerRef = el)}>
        <div className="cloud" ref={el => (this.cloudRef = el)} />
        <div className="hero" ref={el => (this.heroRef = el)}>
          <h1>Daniel Levine</h1>
          <button onClick={this.handleStartButtonClick}>
            <span ref={el => (this.heroTxtRef = el)}>
              PRESS ENTER OR CLICK HERE TO START
            </span>
          </button>
        </div>
        <div className="mountains" />
        <div
          className="road-container"
          ref={el => (this.roadContainerRef = el)}
        >
          <div className="ground-bg" />
          <div className="road">
            <div className="lanes" ref={el => (this.lanesRef = el)} />
            <div className="resume-container" ref={el => (this.resumeRef = el)}>
              <ResumeText />
            </div>
          </div>
          {/* <div className="stripes-container">
            <div className="stripes" ref={el => (this.stripesRef = el)} />
          </div> */}
        </div>
        <div className="car" ref={el => (this.carRef = el)} />
      </OutrunStyled>
    )
  }
}

injectGlobal`
  @font-face{
    font-family: 'SwissSienaFont';
    src: url(${SwissSienaFont});
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
  overflow: hidden;

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
    top: 20px;
    left: 0;
    right: 0;
    z-index: 1;
    font-family: SwissSienaFont;

    @media (min-width: 480px) {
      top: 100px;
    }

    h1 {
      font-size: 100px;
      font-style: italic;
      letter-spacing: 6px;
      text-shadow: -5px 5px 0 #000, 2px 0px 0 #000, 2px -1px 0 #000;
      color: yellow;
    }

    button {
      font-weight: bold;
      background: none;
      border: none;
      font-family: inherit;
      font-size: 22px;
      letter-spacing: 1px;
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
    height: 200%;
    width: 40%;
    border: 2px dashed white;
    border-top: none;
    border-bottom: none;
    margin: 0 auto;

    @media (min-width: 480px) {
      width: 30%;
      border-width: 4px;
    }
  }

  .resume-container {
    display: none;
    overflow: auto;
    font-family: SwissSienaFont;
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
    margin-left: -125px;
    image-rendering: pixelated;
    background-size: contain;

    @media (min-width: 480px) {
      height: 150px;
      width: 300px;
      margin-left: -150px;
    }
  }
`

export default Outrun
