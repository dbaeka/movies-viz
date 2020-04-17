import React from "react";
// reactstrap components
import {
    FormGroup, Label, Input,
} from "reactstrap";

import Slider from "nouislider";
import wNumb from "wnumb";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import Gallery from "../../components/Gallery";
import FIlterSlider from "../../components/FIlterSlider";

// import FIlterSlider from "../../components/FIlterSlider";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0, width: 0,
            filterHeight: 0, filterWidth: 0,
        };

        this.resetDimensions = this.resetDimensions.bind(this);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resetDimensions);
        this.resetDimensions();

        document.body.classList.toggle("landing-page");
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resetDimensions);
        document.body.classList.toggle("landing-page");
    }

    resetDimensions() {
        var visContainer = this.refs.visContainer;
        var filterContainer = this.refs.filterContainer;

        this.setState({
                width: visContainer.clientWidth, height: visContainer.clientHeight,
                filterHeight: filterContainer.clientHeight, filterWidth: filterContainer.clientWidth
            }
        );
    }

    render() {
        return (
            <>
                <ExamplesNavbar/>
                <div className="wrapper" style={{height: "100vh"}}>
                    <div className="page-container">
                        <div className="page-filters">
                            <div className="filter-top">
                                <div className="filter-selection">
                                    <div className="section-title">
                                        <div className="right-info">
                                            <div className="title-box">
                                                <h2>Selection filter</h2>
                                                <div className="subtitle-box">
                                                    <h3>Select category to filter (choose one radio button)</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-box">
                                        <div className="d-flex mx-4"
                                             style={{fontSize: "12px", justifyContent: "space-between"}}>
                                            <FormGroup check className="form-check-radio">
                                                <Label check>
                                                    <Input
                                                        defaultValue="option1"
                                                        id="exampleRadios"
                                                        name="exampleRadios"
                                                        type="radio"
                                                    />
                                                    <span className="form-check-sign"/>
                                                    Year
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio">
                                                <Label check>
                                                    <Input
                                                        defaultChecked
                                                        defaultValue="option2"
                                                        id="exampleRadios1"
                                                        name="exampleRadios"
                                                        type="radio"
                                                    />
                                                    <span className="form-check-sign"/>
                                                    Gross (US$)
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio">
                                                <Label check>
                                                    <Input
                                                        defaultValue="option3"
                                                        id="exampleRadios2"
                                                        name="exampleRadios"
                                                        type="radio"
                                                    />
                                                    <span className="form-check-sign"/>
                                                    IMDB Score
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio">
                                                <Label check>
                                                    <Input
                                                        defaultValue="option4"
                                                        id="exampleRadios3"
                                                        name="exampleRadios"
                                                        type="radio"
                                                    />
                                                    <span className="form-check-sign"/>
                                                    Facebook Likes
                                                </Label>
                                            </FormGroup>
                                        </div>
                                    </div>
                                </div>
                                <div className="filter-selection">
                                    <div className="section-title">
                                        <div className="right-info">
                                            <div className="title-box">
                                                <h2>Selection slider</h2>
                                                <div className="subtitle-box">
                                                    <h3>Movies per selected category(</h3>
                                                    <img src={require("assets/img/svg/drag.svg")}
                                                         className="drag-icon"/>
                                                    <h3>drag to select interval)</h3>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="slider-box" ref="filterContainer">
                                        <FIlterSlider height={this.state.filterHeight}
                                                      width={this.state.filterWidth}
                                                      src="http://localhost:8080/movies.csv"/>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-bottom">
                                <div className="left-info">
                                    <div className="option-view">
                                        <div className="selection-options"><h3>Show</h3>
                                            <div className="switch-buttons">
                                                <button className="page-buttonview active"><h4>all pages</h4></button>
                                                <button className="page-buttonview"><h4>active pages</h4></button>
                                            </div>
                                            <h3>in</h3>
                                            <div className="switch-buttons">
                                                <button className="page-buttonview active"><h4>numerical</h4></button>
                                                <button className="page-buttonview"><h4>chronological</h4></button>
                                            </div>
                                            <h3>order</h3></div>
                                    </div>
                                    <button className="reset-all dbButton clickable">
                                        Reset Filters
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="page-main-content">
                            <div className="page-viz" ref="visContainer">
                                <Gallery height={this.state.height} width={this.state.width}
                                         src="http://localhost:8080/movies.csv"/>
                            </div>
                            <div className="page-side-filters">
                                <div>
                                    <div className="">
                                        <div className="section-title line"><h2
                                        >Genres</h2>
                                            <div className="subtitle-box">
                                                <img src={require("assets/img/svg/click.svg")}
                                                     className="click-icon"/>
                                                <h3>Click to select one or more genres</h3>
                                            </div>
                                        </div>
                                        <div className="macrocategories">
                                            <button
                                                className="macro-button geometria_e_algebra inactive">
                                                <div className="macro-background"></div>
                                                <div className="macro-bar"
                                                     style={{
                                                         width: "13%",
                                                         background: "rgb(89, 205, 144)",
                                                         opacity: "0.8"
                                                     }}>
                                                </div>
                                                <div className="macro-labels"><h3
                                                >Action</h3><h3
                                                >142 Occurrences</h3></div>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default LandingPage;
