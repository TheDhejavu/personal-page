import React, { Component } from "react";
import Sidebar from "../../components/Sidebar";
import { Zoom, Fade } from 'react-reveal';
import { Link as ScrolLink, animateScroll as scroll } from "react-scroll";
import config from "../../data/page.config";
import { Dialog, DialogContainer } from "../../components/Dialog";
import "./style.scss";

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      isMobileSidebarVisible: false,
      config: config
    }
  }
  toggleSidebar(){
    this.setState({
      isMobileSidebarVisible: !this.state.isMobileSidebarVisible
    });
  }
  toggleDialog(){
    Dialog.open({
      title: "🎉 Customize Page",
      message: "Choose theme and favourite matching color",
      hideButton2: true
    });
  }
  render() {
    const { config } = this.state;
    return (
    <div className="site-layout">
      <Sidebar 
        isVisible={this.state.isMobileSidebarVisible}
        toggleSidebar={this.toggleSidebar.bind(this)}
      ></Sidebar>
      <DialogContainer/>
      <main className="site-layout__main">
        <header className="header">
          <div className="header-panel">
            <button 
              className="toggle-button"
              onClick={this.toggleSidebar.bind(this)}
            >
                <i className="uil uil-bars theme-text"></i>
            </button>
            <button 
              className="customize-button btn primary-button to-right"
              onClick={this.toggleDialog.bind(this)}
            >
              🎉Customize
            </button>
          </div>
        </header>
        <section className="home-section section" id="home">
            <div className="section-panel">
              <h1 className="heading color-text">😊  Hi,</h1>
              <Zoom>
                <h2 className="sub-heading theme-text">I'm { config.home.fullname }.</h2>
              </Zoom>
              <p className="slant-text theme-text">{ config.home.continent } · { config.home.country }· <a href="#" className="theme-text">{ config.contact.email }</a></p>
              <h3 className="sub-heading summary theme-text">{ config.home.summary }</h3>
              
              <ScrolLink
                to="about"
                spy={true}
                smooth={true}
                className="btn primary-button"
                duration= {500}>
                  <i className='uil uil-user'></i>  ABOUT ME
              </ScrolLink>
            </div>
        </section>
        <section className="about-section section" id="about">
            <div className="section-panel">
              <h1 className="heading color-text">About me</h1>
              <p className="slant-text theme-text">{ config.about.text }</p>
              <Fade bottom>
                <p className="text theme-text">
                { config.about.about }
                </p>
              </Fade>
            </div>
        </section>
        <section className="skills-section section" id="skills">
            <div className="section-panel">
              <h1 className="heading color-text">Skills </h1>
              <p className="slant-text theme-text">{ config.skill.text }</p>
              <Fade bottom>
              <ul className="skill-lists">
                {
                  config.skill.lists.map( skill=>{
                    return (
                      <li className="theme-text" key={skill}>
                        {skill}
                      </li>
                    )
                  })
                }
              </ul>
              </Fade>
            </div>
        </section>
        <section className="my-work-section section" id="my-work">
            <div className="section-panel">
              <h1 className="heading color-text">My Work</h1>
              <p className="slant-text theme-text">Innovative projects</p>
              <Fade bottom>
              <div className="flex flex--wrap my-work-container">
              {
                  config.work.lists.map( work=>{
                    return (
                      <div className="col-s-33 " key={work.title}>
                        <div className="card">
                          <div className="card-panel">
                            <h4 className="title theme-text">{ work.title}</h4>
                            <p className="description theme-text">{ work.description}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })
              }
              </div>
              </Fade>
            </div>
        </section>
        <section className="contact-section section" id="contact">
            <div className="section-panel">
              <h1 className="heading color-text">Contact me</h1>
              <p className="slant-text theme-text">You can find me on the web</p>
              <Fade bottom>
                <div>
                <ul className="contact-lists">
                  <li>
                    <a href="#"> <i className='uil uil-envelope'></i> { config.contact.email }</a>
                  </li>
                  <li>
                    <a href="#"> <i className='uil uil-twitter'></i> @{ config.contact.twitter.username }</a>
                  </li>
                  <li>
                    <a href="#"> <i className='uil uil-github'></i> @{ config.contact.github.username }</a>
                  </li>
                  <li>
                    <a href="#"> <i className='uil uil-linkedin'></i> { config.contact.linkedin.name }</a>
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