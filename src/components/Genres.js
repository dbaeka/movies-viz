import React from "react";
// reactstrap components
import {
    Button,
    Collapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col,
    UncontrolledTooltip
} from "reactstrap";

import * as d3 from "d3";
import * as scaler from 'rect-scaler';
import ReactTooltip from 'react-tooltip';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import worker from '../workers/image-worker'
import WebWorker from "../workers/webWorker";
import Store from "../flux/store";
import {Actions} from "../flux";

class Genres extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pageNum: Store.getNumPages(),
            path: ""
        };

        this.genres = ["Comedy", "Crime", "Drama", "Romance", "Thriller", "Sci-Fi", "Action", "Animation", "Family",
            "Biography", "Adventure", "Fantasy", "Horror", "Western", "Documentary"
        ];

        this.drawPath = this.drawPath.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentDidMount() {
        this.drawPath();
        window.addEventListener('resize', this.drawPath);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.drawPath);
        Store.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            ...this.state,
            pageNum: Store.getNumPages(),
        });
        this.drawPath();
    }

    getData = () => {
        // fetch data from the server
        // and transform into CSV format
        return new Promise((resolve, reject) => {
            d3.csv(this.props.src)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };


    drawPath = () => {

        this.getData()
            .then(data => { // renders the data table
                const keys = Object.keys(data[0]);
                const FIELDS = {
                    GROSS: 8, GENRES: 9, TITLES: 11, YEAR: 23, SCORE: 25, LIKES: 27, POSTERS: 28
                };

                const poster = keys[FIELDS.POSTERS];
                const title = keys[FIELDS.TITLES];
                const year = keys[FIELDS.YEAR];
                const score = keys[FIELDS.SCORE];
                const gross = keys[FIELDS.GROSS];

                const category = (Store.getFilterIndex() === "0") ? year : gross;
                const order = Store.getSortOrder() === 0;
                let bounds = Store.getSliderValue();

                let filteredData = data
                    .filter(k => k[poster] !== "" && k[gross] !== "" && k[year] !== "")
                    .sort((e, f) => e[category] - f[category]);

                if (!order) {
                    filteredData = filteredData.reverse();
                }

                if (typeof bounds.start !== "number") {
                    bounds.start = Number(bounds.start.replace(/[^0-9.-]+/g, ""));
                    bounds.end = Number(bounds.end.replace(/[^0-9.-]+/g, ""));
                }

                filteredData = filteredData
                    .filter(k => k[category] > bounds.start && k[category] < bounds.end);


                // set the dimensions and margins of the graph
                const margin = 5;
                const padding = 9;
                let {width, height} = this.props;
                width -= (2 * padding);
                height -= (2 * padding);

                height -= 140;

                const numRects = parseInt(this.state.pageNum);
                const rectWidth = 1;
                const rectHeight = 1.467;
                const result = scaler.largestRect(width, height, numRects, rectWidth, rectHeight);

                let imgs = ``;
                filteredData.slice(0, numRects).forEach(img => {
                    let info = encodeURI(JSON.stringify({
                        image: img[poster],
                        year: img[year],
                        title: img[title],
                        score: img[score]
                    }));
                    imgs += `<img src="${img[poster]}" width=${result.width} height=${result.height} data-for="posterTooltip" data-tip=${info} loading="lazy" style="padding: ${margin}px">`;
                });
                // let res = `<g class="bars" transform="translate(${margin.left + 20},${margin.top})">${bars}</g>`;

                this.setState({
                    ...this.state,
                    path: imgs//res
                });
                ReactTooltip.rebuild();
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <>
                <div className="">
                    <div className="section-title line"><h2
                    >Genres</h2>
                        <div className="subtitle-box">
                            <img src={require("./../assets/img/svg/click.svg")}
                                 className="click-icon"/>
                            <h3>Click to select one or more genres</h3>
                        </div>
                    </div>
                    <div className="macrocategories">
                        <button
                            className="macro-button inactive">
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
            </>
        );
    }
}

export default Genres;