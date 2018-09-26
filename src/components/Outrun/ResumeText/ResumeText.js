import React from 'react'
import styled from 'styled-components'

const ResumeText = () => (
  <ResumeTextStyled>
    <h1>Daniel Levine</h1>
    <section className="section-experience">
      <div className="section-title">EXPERIENCE</div>

      <h2>Front-End Developer</h2>
      <div className="experience-subtitle">
        A Place For Mom / SeniorAdvisor (Nov 2016 – July 2018)
      </div>
      <p>
        Managed and maintained a large React/Rails-based, responsive,
        cross-browser compatible web application. In addition to the maintenance
        and building out of new features, I led the refactoring and
        restructuring of our front-end for a more modern web architecture,
        utilizing Webpack/Yarn. Profiled and audited site performance, leading
        to optimizations (such as JS/CSS code splitting, inlining critical path
        CSS, scroll-based image lazy-loading, code deduplication, and improved
        client-side caching), which were essential in reaching our
        mobile-focused performance goals. Advocated for adoption of BEM CSS
        methodology to improve style/markup practices and structure while
        assisting team with its implementation. As a front-end resource for our
        team’s agile development process, I routinely assisted with ticket
        creation/prioritization and cross-team discussions related to
        requirement gathering/interpretation across development, product, SEO,
        and design teams.
      </p>

      <h2>Presentation Layer Engineer</h2>
      <div className="experience-subtitle">Razorfish (Nov 2014 – May 2016)</div>
      <p>
        Developed module code and maintained codebase on a long-term project for
        a multi-billion dollar client that consisted of a responsive and
        fully-accessible credit card portal web application using technologies
        such as Jade, Coffeescript, jQuery, and SASS. Worked closely with
        creative, product and QA teams to develop front-end in accordance to
        highly- specific technical and business requirements/guidelines.
        Subscribed to modern workflows including HTML/CSS/JS preprocessing via
        Jade/SASS/Coffeescript, HTML templating via Jade/JSRender, accessibility
        testing via FireEyes/aXe and version control via Git/Github.
      </p>

      <h2>UX Designer / Front-End Developer / Co-Founder</h2>
      <div className="experience-subtitle">
        Marketwiise (Jan 2014 – Nov 2014)
      </div>
      <p>
        Designed and developed the front-end of a responsive e-commerce web app,
        using HTML, SCSS, Bootstrap and Javascript. Worked in tandem with lead
        developer to wire up and maintain an Angular front-end. Consistently
        ensured cross-browser compatibility through testing in multiple
        environments. Contributed to much of startup’s identity through creation
        of mockups, demos, company branding, and marketing material.
      </p>

      <h2>UX / UI Designer</h2>
      <div className="experience-subtitle">
        ePsolutions (May 2011 – Dec 2013)
      </div>
      <p>
        Responsible for refreshing outdated UI design and implementing UX best
        practices for a Silverlight billing/CRM application and consumer payment
        portal. Hand-coded UI markup and styling using XAML and worked with
        developers to create and maintain front-end code (C#). Designed and
        helped build a separate HTML5 mobile portal web app using jQuery and
        Kendo UI.
      </p>
    </section>

    <section className="section-education">
      <div className="section-title">EDUCATION</div>
      <h2>University of Texas at Austin</h2>
      <ul>
        <li>Fall 2009: Bachelor of Arts in Economics</li>
        <li>Spring 2009: McCombs Business Foundations University Honors</li>
      </ul>
      <h2>Austin Community College</h2>
      <ul>
        <li>Spring 2011: Web Developer Specialist Certificate</li>
        <li>Fall 2010: IT Database Certificate</li>
      </ul>
    </section>

    <section className="section-skills">
      <div className="section-title">KNOWLEDGE + TOOLS USED</div>

      <p>
        Javascript (Vanilla / ES6) Coffeescript React / Redux jQuery / jQuery
        Mobile Angular JS 1 HTML5 / Jade (Pug) CSS3 / SASS / SCSS NodeJS/ NPM /
        Yarn Webpack Jest / Enzyme Silverlight / C# / XAML Ruby on Rails AWS
        Cloudfront / Kubernetes Git (Command Line) Github / Bitbucket / JIRA
        Agile Development Cycle W3C Accessibility FireEyes / aXe Mobile /
        Responsive Design Photoshop / Illustrator
      </p>
    </section>
  </ResumeTextStyled>
)

const ResumeTextStyled = styled.div`
  padding: 40px;

  h1 {
    width: 100%;
    text-align: right;
  }

  section {
    margin-bottom: 20px;
  }

  .section-title {
    font-weight: bold;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 16px;
    margin-bottom: 2px;
  }

  .experience-subtitle {
    font-style: italic;
    margin-bottom: 2px;
    color: #ddd;
  }

  p {
    margin-bottom: 10px;
  }
`

export default ResumeText
