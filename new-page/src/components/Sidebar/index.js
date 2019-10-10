import React, { Component } from "react";
import {Slide, Fade} from 'react-reveal';
import { Link as ScrolLink, animateScroll as scroll } from "react-scroll";
import PropTypes from "prop-types";
import config from "../../data/page.config";
import "./style.scss";

class Sidebar extends Component {
    constructor( props ){
        super(props);
        this.state ={}
    }
    toggleSidebar(e){
        e.preventDefault()
        this.props.toggleSidebar()
    }
    render(){
        //set sidebar and sidebar container classnames 
        let sidebarClassNames = `mobile-sidebar`;
        let containerClassNames = `sidebar mobile-sidebar__container`;

        //trigger sidebar on receive a true isVisible props
        if(this.props.isVisible){
            sidebarClassNames = sidebarClassNames+` mobile-sidebar--visible`;
            containerClassNames = containerClassNames+` mobile-sidebar--slide-out`;
        }
        
        const setAvatar = ()=>{
            if(config.home.avatar){
               return ( 
                <div className="avatar-wrapper">
                    <img src={config.home.avatar} className="avatar"/>
                </div>
            )
            }
        }
        return (
            <div className={sidebarClassNames}>
            <aside className={containerClassNames}>
                <nav className="sidebar-nav flex middle center column ">
                    <Slide bottom duration={200}>
                     {setAvatar()}
                    </Slide>
                    <ul>
                        <Fade bottom duration={400} >
                            <li >
                                <ScrolLink
                                to="home"
                                className="ripple"
                                spy={true}
                                smooth={true}
                                duration= {500}
                                onClick={this.toggleSidebar.bind(this)}>
                                <i className='uil uil-home'></i> Home
                                </ScrolLink>
                            </li>
                        </Fade>
                        <Fade bottom duration={600}>
                        <li>
                            <ScrolLink
                              to="about"
                              className="ripple"
                              spy={true}
                              smooth={true}
                              duration= {500}
                              onClick={this.toggleSidebar.bind(this)}>
                               <i className='uil uil-user'></i> About
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={800}>
                        <li>
                            <ScrolLink
                              to="skills"
                              className="ripple"
                              spy={true}
                              smooth={true}
                              duration= {500}
                              onClick={this.toggleSidebar.bind(this)}>
                               <i className='uil uil-desktop-alt'></i> Skills
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={1000}>
                        <li>
                            
                            <ScrolLink
                              to="my-work"
                              className="ripple"
                              spy={true}
                              smooth={true}
                              duration= {500}
                              onClick={this.toggleSidebar.bind(this)}>
                               <i className='uil uil-dice-two'></i> My Work
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={1200}>
                        <li>
                            <ScrolLink
                              to="contact"
                              className="ripple"
                              spy={true}
                              smooth={true}
                              duration= {500}
                              onClick={this.toggleSidebar.bind(this)}>
                               <i className='uil uil-envelope'></i> Contact
                            </ScrolLink>
                      </li>
                      </Fade>
                    </ul>
                </nav>
            </aside>
        </div>
        )
    }
}

//Type checking for sidebar proptypes
Sidebar.propTypes = {
    isVisible: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
}
export default Sidebar;