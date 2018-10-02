import React from 'react'
import { navigate } from 'gatsby'
import styled, { keyframes, injectGlobal } from 'styled-components'
import { TimelineMax, Linear, Power1, Power4, TweenMax } from 'gsap'

import ResumeText from './ResumeText'

import Rari from '../../images/outrun/rari.png'
import Cloud from '../../images/outrun/cloud.png'
import HomeIcon from '../../images/outrun/home-icon.svg'
import SwissSienaFont from '../../images/outrun/fonts/SwissSiena.ttf'

// CustomEase.create(
//   'easeToLinear',
//   'M0,0 C0.126,0.382 0.254,0.872 0.794,0.964 0.948,0.99 0.92,0.984 1,1'
// )

class Outrun extends React.Component {
  constructor(props) {
    super(props)

    this.roadTlLoopActive = true

    this.state = {
      hideScrolledTxt: false,
      carSpeed: 0.8,
    }

    this.initAnimations = this.initAnimations.bind(this)
    this.handleStartButtonClick = this.handleStartButtonClick.bind(this)
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.handleResumeContainerScroll = this.handleResumeContainerScroll.bind(
      this
    )
    this.checkRoadTlLoopActive = this.checkRoadTlLoopActive.bind(this)
    this.tryPlayResume = this.tryPlayResume.bind(this)
  }

  componentDidMount() {
    this.initAnimations()
  }

  initAnimations() {
    this.cloudTL = new TimelineMax({
      repeat: -1,
      yoyo: true,
      paused: true,
    })
    this.cloudTL.fromTo(
      this.cloudRef,
      80,
      // 4,
      { transform: 'translateX(0%) translateY(0%)', ease: Power1.easeInOut },
      { transform: 'translateX(20%) translateY(10%)', ease: Power1.easeInOut }
    )

    this.carMoveTL = new TimelineMax({
      repeat: -1,
      yoyo: true,
      paused: true,
    })
    this.carMoveTL
      .to(this.carRef, 16, {
        transform: 'translateX(25%)',
        ease: Power1.easeInOut,
      })
      .to(this.carRef, 32, {
        transform: 'translateX(-5%)',
        ease: Power1.easeInOut,
      })

    this.carBumpTL = new TimelineMax({
      delay: 6,
      repeatDelay: 6,
      repeat: -1,
      paused: true,
    })
    this.carBumpTL
      .to(this.carRef, 0.05, { marginBottom: '-3px' })
      .to(this.carRef, 0.05, { marginBottom: '0' })

    this.roadTL = new TimelineMax({
      repeat: -1,
      onRepeat: this.checkRoadTlLoopActive,
      onRepeatParams: ['{self}'],
      onRepeatScope: this,
    })
    this.roadTL.fromTo(
      this.lanesRef,
      this.state.carSpeed,
      { transform: 'translateY(-100vh)', ease: Linear.easeNone },
      {
        transform: 'translateY(0)',
        ease: Linear.easeNone,
      }
    )

    this.overlayTL = new TimelineMax({ paused: true })
    this.overlayTL
      .fromTo(
        this.overlayRef,
        1,
        { visibility: 'hidden', ease: Power1.easeOut },
        { visibility: 'visible', ease: Power1.easeOut }
      )
      .fromTo(this.heroTxtRef, 0, { opacity: 1 }, { opacity: 0 })
      .repeatDelay(1)
      .repeat(-1)

    this.defaultLoopTL = new TimelineMax({ paused: true })
    this.defaultLoopTL
      .add(this.overlayTL.play(), 0)
      .add(this.cloudTL.play(), 0)
      .add(this.carMoveTL.play(), 0)
      .add(this.carBumpTL.play(), 0)

    // INTRO Timeline
    this.introTL = new TimelineMax({
      onCompleteScope: this,
      onComplete: function() {
        this.defaultLoopTL.play()
      },
    })
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

    this.resumeTL = new TimelineMax({ paused: true })
    this.resumeTL
      .to(this.overlayRef, 0.6, { opacity: 0 })
      .set(this.overlayRef, { display: 'none' })
      .add('startRotation')
      .to(
        this.roadContainerRef,
        1,
        {
          transform: 'rotateX(0)',
          ease: Power1.easeInOut,
        },
        'startRotation'
      )
      .to(
        this.roadContainerRef,
        0.5,
        { maxWidth: '800px', ease: Power1.easeInOut },
        'startRotation+=.5'
      )
      .to(
        this.carRef,
        0.25,
        { yPercent: 200, ease: Power1.easeInOut },
        'startRotation'
      )
      .fromTo(
        this.resumeRef,
        2,
        { transform: 'translateY(100vh)', ease: Power4.easeOut },
        { transform: 'translateY(0)', ease: Power4.easeOut }
      )
      .set(this.resumeRef, { overflow: 'auto' })
    // END ResumeTL
  }

  checkRoadTlLoopActive(tl) {
    if (this.roadTlLoopActive) return

    tl.eventCallback('onComplete', () => {
      TweenMax.fromTo(
        // Push lanes offscreen downwards
        this.lanesRef,
        this.state.carSpeed,
        {
          transform: 'translateY(0)',
          ease: Linear.easeNone,
        },
        {
          transform: 'translateY(100vh)',
          ease: Linear.easeNone,
          onCompleteScope: this,
          onComplete: this.tryPlayResume,
        }
      )
    }).repeat(0)
  }

  tryPlayResume() {
    if (this.roadTlLoopActive) return

    this.resumeRef.scrollTo(0, 0) // Reset scroll container to top

    this.resumeTL
      .eventCallback('onComplete', () => {
        this.defaultLoopTL.pause()
      })
      .play()
  }

  handleStartButtonClick() {
    this.roadTlLoopActive = false
  }

  handleBackButtonClick() {
    this.roadTlLoopActive = true // Reset road loop flag
    this.defaultLoopTL.resume()

    this.resumeTL
      .eventCallback('onReverseComplete', () => {
        this.roadTL.repeat(-1) // re-initialize road loop

        TweenMax.fromTo(
          // Pull lanes onscreen from top
          this.lanesRef,
          this.state.carSpeed * 2,
          {
            transform: 'translateY(-200vh)',
            ease: Linear.easeNone,
          },
          {
            transform: 'translateY(0)',
            ease: Linear.easeNone,
            onCompleteScope: this,
            onComplete: () => this.roadTL.play(),
          }
        )
        this.setState({ hideScrolledTxt: false }) // Reset scrolled text hiding
      })
      .reverse()
  }

  handleHomeButtonClick() {
    navigate('/')
  }

  handleResumeContainerScroll() {
    this.setState({ hideScrolledTxt: true })
  }

  render() {
    return (
      <OutrunStyled ref={el => (this.outrunContainerRef = el)}>
        <div className="cloud" ref={el => (this.cloudRef = el)} />
        <div className="overlay" ref={el => (this.overlayRef = el)}>
          <div className="title-container">
            <h1>Daniel Levine</h1>
            <button
              className="resume-btn"
              onClick={this.handleStartButtonClick}
            >
              <span ref={el => (this.heroTxtRef = el)}>CLICK HERE TO VIEW</span>
            </button>
          </div>
          <button className="home-btn" onClick={this.handleHomeButtonClick}>
            <img src={HomeIcon} alt="home" />
          </button>
          <div className="copyright">{`\u00A9 DL 1986`}</div>
        </div>
        <div className="mountains" />
        <div
          className="road-container"
          ref={el => (this.roadContainerRef = el)}
        >
          <div className="ground-bg" />
          <div className="road">
            <div className="lanes" ref={el => (this.lanesRef = el)} />
            <div
              className="resume-container"
              ref={el => (this.resumeRef = el)}
              onScroll={this.handleResumeContainerScroll}
            >
              <ResumeText
                backButtonClick={this.handleBackButtonClick}
                hideScrolledTxt={this.state.hideScrolledTxt}
              />
            </div>
          </div>
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

  button {
    background: none;
    border: none;
    font-family: inherit;
    &:focus {
      outline: none;
      font-style: italic;
    }
    cursor: pointer;
  }
  .cloud {
    background: url(${Cloud}) no-repeat 0 20px;
    background-size: cover;
    position: absolute;
    width: 100%;
    height: 50%;
    top: 0;
    image-rendering: pixelated;
  }

  .overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    font-family: SwissSienaFont;
    display: flex;

    .title-container {
      max-width: 600px;
      margin: 0 auto;
      margin-top: 20px;
      text-align: center;
      display: flex;
      flex-direction: column;

      @media (min-width: 480px) {
        margin-top: 100px;
      }
    }

    h1 {
      font-size: 100px;
      font-style: italic;
      letter-spacing: 6px;
      text-shadow: -5px 5px 0 #000, 2px 0px 0 #000, 2px -1px 0 #000;
      color: yellow;
      line-height: 0.7;
      margin-bottom: 20px;
    }

    .resume-btn {
      font-weight: bold;
      font-size: 22px;
      letter-spacing: 2px;
      color: #000;
      text-shadow: -2px 2px 0 #fff, 2px 2px 0 #fff, 2px -2px 0 #fff,
        -2px -2px 0 #fff;
    }

    .copyright {
      position: absolute;
      bottom: 10px;
      right: 15px;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 4px;
      color: #fff;

      @media (min-width: 480px) {
        color: #000;
        font-size: 20px;
        letter-spacing: 7px;
        right: 40px;
        text-shadow: -2px 2px 0 #fff, 2px 2px 0 #fff, 2px -2px 0 #fff,
          -2px -2px 0 #fff;
      }
    }

    .home-btn {
      position: absolute;
      left: 10px;
      bottom: 10px;
      width: 30px;
      height: 30px;
      padding: 0;

      @media (min-width: 480px) {
        left: 20px;
        width: 40px;
        height: 40px;
      }
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
    width: 10000px;
    height: 100%;
    background-color: #10a810;
    position: absolute;
    left: 50%;
    right: 50%;
    /* transform: translateX(-50%); */
    margin-left: -5000px;
    overflow: hidden;
  }

  .road {
    background-color: #9c969c;
    border: 0 solid #eee;
    border-left-width: 20px;
    border-right-width: 20px;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    /* display: flex; */
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
    margin-left: 30%;
    border: 2px dashed white;
    border-top: none;
    border-bottom: none;
    position: absolute;
    top: 0;
    left: 0;

    @media (min-width: 480px) {
      width: 30%;
      margin-left: 35%;
      border-width: 4px;
    }
  }

  .resume-container {
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    font-family: SwissSienaFont;
    color: #fff;
    font-size: 18px;
    letter-spacing: 1px;
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
