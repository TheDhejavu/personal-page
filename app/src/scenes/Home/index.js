import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { Zoom, Fade } from 'react-reveal';
import { Link as ScrolLink, animateScroll as scroll } from "react-scroll";
import "./style.scss";

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      isMobileSidebarVisible: false
    }
  }
  toggleSidebar(){
    this.setState({
      isMobileSidebarVisible: !this.state.isMobileSidebarVisible
    });
  }
  render() {
    return (
    <div className="site-layout">
      <Sidebar 
        isVisible={this.state.isMobileSidebarVisible}
        toggleSidebar={this.toggleSidebar.bind(this)}
      ></Sidebar>
      <main className="site-layout__main">
        <header className="header">
          <div className="header-panel">
            <button 
              className="toggle-button"
              onClick={this.toggleSidebar.bind(this)}
            >
                <i className="uil uil-bars"></i>
            </button>
            <button className="customize-button primary-button to-right">
              Customize
            </button>
          </div>
        </header>
        <section className="home-section section" id="home">
            <div className="section-panel">
              <h1 className="heading">😒 Hi,</h1>
              <Zoom>
                <h2 className="sub-heading">I'm Akinola Ayodeji.</h2>
              </Zoom>
              <p className="slant-text">West Africa, Nigeria · <a href="#">ayo@patricia.com.ng</a></p>
              <h3 className="sub-heading summary">CS student with a keen interest in AI & web technologies. Currently a Software Engineering intern at Patricia.</h3>
              
              <ScrolLink
                to="about"
                spy={true}
                smooth={true}
                className="btn primary-button"
                duration= {500}>
                  <i class='uil uil-user'></i>  ABOUT ME
              </ScrolLink>
            </div>
        </section>
        <section className="about-section section" id="about">
            <div className="section-panel">
              <h1 className="heading">About me</h1>
              <p className="slant-text">I'm a pragmatic person</p>
              <Fade bottom>
                <p className="text">
                  Leveraging technology such as artificial intelligence , webvr and maps to help africa Millennials become better humans through solutions for better education , living & travel. <br></br><br></br>
                  Understanding the concept of data analysis in order to help develop solution that can help make africa more livable.<br></br><br></br>
                  Building business solutions that has the potential of effecting real change in africa E.G technology for health and poverty <br></br>
                </p>
              </Fade>
            </div>
        </section>
        <section className="skills-section section" id="skills">
            <div className="section-panel">
              <h1 className="heading">Skills </h1>
              <p className="slant-text">On Demand skills </p>
              <Fade bottom>
              <ul className="skill-lists">
                <li>
                  Public Speaking
                </li>
                <li>
                  Research
                </li>
                <li>
                  Writing
                </li>
                <li>
                  Problem Solving
                </li>
                <li>
                  Public Speaking
                </li>
                <li>
                  Javascript
                </li>
                <li>
                  Python
                </li>
                <li>
                  Docker
                </li>
                <li>
                  Data analysis
                </li>
                <li>
                  Machine learning
                </li>
                <li>
                  Computer vision
                </li>
                <li>
                  Natural language processing
                </li>
                <li>
                  Golang
                </li>
              </ul>
              </Fade>
            </div>
        </section>
        <section className="my-work-section section" id="my-work">
            <div className="section-panel">
              <h1 className="heading">My Work</h1>
              <p className="slant-text">Innovative projects</p>
              <Fade bottom>
              <div className="flex flex--wrap my-work-container">
                <div className="col-s-33 ">
                  <div className="card">
                    <div className="card-panel">
                      <h4 className="title">SignAuthentication</h4>
                      <p className="description">Building business solutions that has the potential of effecting real change in africa E.G technology for health and poverty</p>
                    </div>
                  </div>
                </div>
                <div className="col-s-33">
                  <div className="card">
                    <div className="card-panel">
                      <h4 className="title">Rape In Nigeria</h4>
                      <p className="description">Building business solutions that has the potential of effecting real change in africa E.G technology for health and poverty</p>
                    </div>
                  </div>
                </div>
                <div className="col-s-33 ">
                  <div className="card">
                    <div className="card-panel">
                      <h4 className="title">Ilegbe.com</h4>
                      <p className="description">Building business solutions that has the potential of effecting real change in africa E.G technology for health and poverty</p>
                    </div>
                  </div>
                </div>
                <div className="col-s-33">
                  <div className="card">
                    <div className="card-panel">
                      <h4 className="title">theMessengerAuto</h4>
                      <p className="description">Building business solutions that has the potential of effecting real change in africa E.G technology for health and poverty</p>
                    </div>
                  </div>
                </div>
              </div>
              </Fade>
            </div>
        </section>
        <section className="contact-section section" id="contact">
            <div className="section-panel">
              <h1 className="heading">Contact me</h1>
              <p className="slant-text">You can find me on the web</p>
              <Fade bottom>
                <div>
                <ul class="contact-lists">
                  <li>
                    <a href="#"> <i class='uil uil-envelope'></i> akinayodeji4all@gmail.com</a>
                  </li>
                  <li>
                    <a href="#"> <i class='uil uil-twitter'></i> @thedhejavu</a>
                  </li>
                  <li>
                    <a href="#"> <i class='uil uil-github'></i> @thedhejavu</a>
                  </li>
                  <li>
                    <a href="#"> <i class='uil uil-linkedin'></i> Akinola Ayodeji</a>
                  </li>
                </ul>
                </div>
              </Fade>
            </div>
        </section>
        <footer className="footer text-center">
          © 2019 generated by personnal-page , made by Akinola Ayodeji. All Rights Reserved.
        </footer>
      </main>
    </div>);
  }
}

export default Home;