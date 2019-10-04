import React, { Component } from "react";
import {Slide, Fade} from 'react-reveal';
import { Link as ScrolLink, animateScroll as scroll } from "react-scroll";
import "./style.scss";

class Sidebar extends Component {
    constructor( props ){
        super(props);
        this.state ={}
    }
    render(){
        let sidebarClassNames = `mobile-sidebar`;
        let containerClassNames = `sidebar mobile-sidebar__container`;

        if(this.props.isVisible){
            sidebarClassNames = sidebarClassNames+` mobile-sidebar--visible`;
            containerClassNames = containerClassNames+` mobile-sidebar--slide-out`;
        }
        return (
            <div className={sidebarClassNames}>
            <aside className={containerClassNames}>
                <nav className="sidebar-nav flex middle center column ">
                    <Slide bottom duration={200}>
                    <div className="avatar-wrapper">
                        <img src="/assets/avatar.jpg" className="avatar"/>
                    </div>
                    </Slide>
                    <ul>
                        <Fade bottom duration={400}>
                            <li onClick={this.props.toggleSidebar}>
                                <ScrolLink
                                to="home"
                                spy={true}
                                smooth={true}
                                duration= {500}>
                                <i className='uil uil-home'></i> Home
                                </ScrolLink>
                            </li>
                        </Fade>
                        <Fade bottom duration={600}>
                        <li>
                            <ScrolLink
                              to="about"
                              spy={true}
                              smooth={true}
                              duration= {500}>
                               <i className='uil uil-user'></i> About
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={800}>
                        <li>
                            <ScrolLink
                              to="skills"
                              spy={true}
                              smooth={true}
                              duration= {500}>
                               <i className='uil uil-desktop-alt'></i> Skills
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={1000}>
                        <li>
                            
                            <ScrolLink
                              to="my-work"
                              spy={true}
                              smooth={true}
                              duration= {500}>
                               <i className='uil uil-dice-two'></i> My Work
                            </ScrolLink>
                        </li>
                        </Fade>
                        <Fade bottom duration={1200}>
                        <li>
                            <ScrolLink
                              to="contact"
                              spy={true}
                              smooth={true}
                              duration= {500}>
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

export default Sidebar;