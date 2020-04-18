import React from "react";
// reactstrap components
import {
    FormGroup, Label, Input,
} from "reactstrap";

import Store from "../../flux/store";
import {Actions} from "../../flux";


// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";
import Gallery from "../../components/Gallery";
import FIlterSlider from "../../components/FIlterSlider";
import ReactTooltip from 'react-tooltip';

// import FIlterSlider from "../../components/FIlterSlider";

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0, width: 0,
            filterHeight: 0, filterWidth: 0,
            filterIndex: Store.getFilterIndex(),
            numPages: Store.getNumPages(),
            toggle1: "active",
            toggle2: "",
        };

        this.resetDimensions = this.resetDimensions.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentDidMount() {
        window.addEventListener('resize', this.resetDimensions);
        this.resetDimensions();

        document.body.classList.toggle("landing-page");
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resetDimensions);
        Store.removeChangeListener(this.onChange);
        document.body.classList.toggle("landing-page");
    }

    onChange() {
        this.setState({
            ...this.state,
            filterIndex: Store.getFilterIndex(),
            numPages: Store.getNumPages(),
        });
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

    handleRadio = event => {
        const value = event.target.value;
        Actions.toggleFilter(value);
        this.updateFilter();
    };

    handleReset = () => {
        Actions.resetFilters();
        this.updateFilter();
        this.setState({
            ...this.state,
            toggle1: "active",
            toggle2: "",
        });
    };

    handlePageNum = event => {
        const value = event.target.value;
        Actions.updatePageNums(value);
    };

    handleToggle = event => {
        const name = event.target.innerHTML;
        let toggle1 = "", toggle2 = "";
        if (name === "ascending") {
            toggle1 = "active";
            toggle2 = "";
            Actions.updateOrder(0);
        } else if (name === "descending") {
            toggle2 = "active";
            toggle1 = "";
            Actions.updateOrder(1);
        }
        this.setState({
            ...this.state,
            toggle1: toggle1,
            toggle2: toggle2,
        });
    };

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
                                                        defaultValue="0"
                                                        id="exampleRadios"
                                                        name="exampleRadios"
                                                        type="radio"
                                                        checked={this.state.filterIndex === "0"}
                                                        onChange={this.handleRadio}
                                                    />
                                                    <span className="form-check-sign"/>
                                                    Year
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio">
                                                <Label check>
                                                    <Input
                                                        defaultValue="1"
                                                        id="exampleRadios1"
                                                        name="exampleRadios"
                                                        type="radio"
                                                        checked={this.state.filterIndex === "1"}
                                                        onChange={this.handleRadio}
                                                    />
                                                    <span className="form-check-sign"/>
                                                    Gross (US$)
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio" disabled>
                                                <Label check>
                                                    <Input
                                                        defaultValue="2"
                                                        id="exampleRadios2"
                                                        name="exampleRadios"
                                                        type="radio"
                                                        checked={this.state.filterIndex === "2"}
                                                        onChange={this.handleRadio}
                                                        disabled
                                                    />
                                                    <span className="form-check-sign"/>
                                                    IMDB Score
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="form-check-radio" disabled>
                                                <Label check>
                                                    <Input
                                                        defaultValue="3"
                                                        id="exampleRadios3"
                                                        name="exampleRadios"
                                                        type="radio"
                                                        disabled
                                                        checked={this.state.filterIndex === "3"}
                                                        onChange={this.handleRadio}
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
                                                      setClick={click => this.updateFilter = click}
                                                      src="http://localhost:8080/movies.csv"/>
                                    </div>
                                </div>
                            </div>
                            <div className="filter-bottom">
                                <div className="left-info">
                                    <div className="option-view">
                                        <div className="selection-options"><h3>Show</h3>
                                            <FormGroup className="m-2">
                                                <Input
                                                    value={this.state.numPages}
                                                    id="pageNumber"
                                                    name="pageNumber"
                                                    type="range"
                                                    min="20"
                                                    max="100"
                                                    onChange={this.handlePageNum}
                                                />

                                            </FormGroup>
                                            <h3><strong>{this.state.numPages}</strong> (min: 20, max: 100) pages in</h3>
                                            <div className="switch-buttons">
                                                <button className={"page-buttonview " + this.state.toggle1} name="asc"
                                                        onClick={this.handleToggle}><h4>ascending</h4></button>
                                                <button className={"page-buttonview " + this.state.toggle2} name="dsc"
                                                        onClick={this.handleToggle}><h4>descending</h4></button>
                                            </div>
                                            <h3>order</h3></div>
                                    </div>
                                    <button className="reset-all dbButton clickable" onClick={this.handleReset}>
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
