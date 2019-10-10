import React, { Component } from "react";
import config from "../../data/page.config";
import "./style.scss";


class Dialog_{
    constructor(){
        this.props = {};
    }
    handleYesButton(evt){
        evt.preventDefault();
        this.props.callback && this.props.callback();
        this.close();
    }
    handleNoButton(evt){
        evt.preventDefault();
        this.close();
    }
    close(){
        
         // zoom open dialog
         this.dialog.style.transform = `scale(1.1)`;
         this.dialog.style.opacity = 0;
         this.dialog.style.WebkitTransform = `scale(1.1)`;
         this.dialog.style.visibility = `hidden`;

         // hide overlay
         this.dialogOverlay.style.opacity = 0;
         this.dialogOverlay.style.visibility = "hidden";
    }
    open( props ){
        

        this.dialogContainer = document.querySelector(".js-dialog-container");
        this.dialog = document.querySelector(".js-dialog");
        this.dialogOverlay = document.querySelector(".js-dialog-overlay");
        this.title = this.dialogContainer.querySelector(".js-dialog-title");
        this.message = this.dialogContainer.querySelector(".js-dialog-message");
        this.yesButton = this.dialogContainer.querySelector(".js-dialog-yes__button");
        this.noButton = this.dialogContainer.querySelector(".js-dialog-no__button");

        
        this.yesButton.addEventListener("click", this.handleYesButton.bind(this));
        this.noButton.addEventListener("click", this.handleNoButton.bind(this))
        this.dialogOverlay.addEventListener("click", this.close.bind(this));

        this.props = props;
        if(this.props.hideButton2){
            this.noButton.style.visibility = "hidden";
            this.noButton.style.position = "absolute"
        }
        
        this.title.innerHTML = props.title;
        this.message.innerHTML = props.message;
        // zoom open dialog
        this.dialog.style.transform = `scale(1)`;
        this.dialog.style.opacity =1;
        this.dialog.style.WebkitTransform = `scale(1)`;
        this.dialog.style.visibility = `visible`;

        // show overlay
        this.dialogOverlay.style.opacity = 0.5;
        this.dialogOverlay.style.visibility = "visible";
        
    }
}

class DialogContainer extends Component{
    constructor( props){
        super(props)
        this.state = {
            themes:[
                {
                    key:"Light Mode",
                    color:"white"
                },
                {
                    key:"Dark Mode",
                    color:"black"
                }
            ],
            colors:[
                {
                    key:"green",
                    color:"#28a745"
                },
                {
                    key:"blue",
                    color:"#007bff"
                },
                {
                    key:"red",
                    color:"#dc3545"
                },
                {
                    key:"pink",
                    color:"#ec2e87"
                },
                {
                    key:"purple",
                    color:"#6f42c1"
                }
            ],
            prevColor: null,
            prevThemeElement: null,
            prevColorElement: null,
        }

        this.setDefault( this.state.themes,  config.theme);
        this.setDefault(this.state.colors, config.color.toLowerCase());
    }
    changePageTheme( theme ){
        return (e)=>{
            const currentTargetElement = e.currentTarget;
            if(this.state.prevThemeElement)
            this.state.prevThemeElement.classList.remove("active");
            currentTargetElement.classList.add("active");

            this.setTheme(theme)

            this.state.prevThemeElement = currentTargetElement;
        }
    }
    setTheme( theme ){
        const color = (this.state.prevColor)? this.state.prevColor : "white";
        switch(theme.key){
            
            case"Dark Mode":
                document.body.classList.add("site-dark");
                document.body.classList.add(`color-${color}`);
                break;
            default:
                document.body.classList.remove("site-dark");
                document.body.classList.remove("color-white");
                break;
        }
    }
    changePageColor( { key }){
        return (e)=>{
            const currentTargetElement = e.currentTarget;
            if(this.state.prevColorElement)
            this.state.prevColorElement.classList.remove("active");
            currentTargetElement.classList.add("active");

            this.setColor( key );
            this.state.prevColorElement = currentTargetElement;
        }
    }
    setColor( key ){
        const arr = ["green", "pink","yellow","blue","red","purple"];
        if(arr.includes(key)){
                //remove the previously set color 
                if(this.state.prevColor) 
                document.body.classList.remove(`color-${this.state.prevColor}`);
                //remove the color-white class body added by the dark theme;
                document.body.classList.remove("color-white");
                //set the new page color
                document.body.classList.add(`color-${key}`);
        }
        //set the previous color 
        this.state.prevColor = key;
    }
    componentDidMount(){
        //select the previously selected theme or color, if any.
        this.state.prevThemeElement = document.querySelector(".themes-container .color.active");
        this.state.prevColorElement = document.querySelector(".colors-container .color.active");

        //set page theme and color on mounted using the configuration file
        this.setColor( config.color.toLowerCase());
        this.setTheme({key: config.theme});

    }
    setDefault( state, color){
        const new_state = [];
        state.forEach(item => {
            if(item.key == color){
                item.default = true;
                new_state.push( item )
            }
        });
        // set the default theme and color
        // NOTE:::: this isnt violating React principle
        // because this function is been called before the page is mounted
        this.state = { ...this.state, ...new_state}
    }
    render(){
        const { themes, colors } = this.state;
        const setClass = (theme)=>{
            return (theme.default)? "color active": "color"
        }
        return (
            <div className="dialog-container js-dialog-container" >
                <div
                    className="overlay js-dialog-overlay"
                />
                <div className="dialog js-dialog">
                    <div className="dialog--main">
                        <h3 className="title js-dialog-title"> </h3>
                        <p className="message js-dialog-message"></p>
                        <div className="themes-container">
                            <h5 className="heading"> Theme</h5>
                            <ul>
                            {
                                    themes.map( theme=>{
                                        return (
                                            <li key={theme.key} className={theme.color}>
                                                <p className="name">{theme.key}</p>
                                                <p 
                                                className={setClass(theme)}
                                                onClick={this.changePageTheme( theme )}
                                                style={{
                                                    "backgroundColor": theme.color
                                                }}>
                                                    <i className='uil uil-check' ></i>
                                                </p>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        <div className="colors-container">
                            <h5 className="heading"> Colors</h5>
                            <ul>
                                {
                                    colors.map( color=>{
                                        return (
                                            <li key={color.key}>
                                                <p className="name">{color.key}</p>
                                                <p 
                                                className={setClass(color)}
                                                onClick={this.changePageColor( color )}
                                                style={{
                                                    "backgroundColor": color.color
                                                }}>
                                                    <i className='uil uil-check'></i>
                                                </p>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="dialog--bottom text-center">
                        <button
                            className="btn btn--one reset-btn js-dialog-yes__button"
                        >
                            DISMISS
                        </button>
                        <button
                            className="btn btn--two reset-btn js-dialog-no__button"
                        >
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const Dialog = new Dialog_();

export {
    DialogContainer,
    Dialog
};

