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

import * as d3 from "d3"

class Gallery extends React.Component {
    constructor(props) {
        super(props);

        this.state = {path: ""};

        this.drawPath = this.drawPath.bind(this);
    }

    componentDidMount() {
        this.drawPath();
        window.addEventListener('resize', this.drawPath);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.drawPath);
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
                const year = keys[FIELDS.YEAR];
                var groupByYear = d3.nest()
                    .key(function (d) {
                        return d[year];
                    }).sortKeys(d3.ascending)
                    .rollup(function (v) {
                        return v.length;
                    })
                    .entries(data);

                // set the dimensions and margins of the graph
                const margin = {top: 40, bottom: 150, left: 40, right: 100};
                let {width, height} = this.props;
                width -= (margin.left + margin.right);
                height -= (margin.top + margin.bottom);
                //X axis
                var xScale = d3.scaleBand()
                    .range([0, width])
                    .domain(groupByYear.map(function (d) {
                        return parseDate(d.key);
                    }))
                    .padding(0.2);

                // Add Y axis
                var yScale = d3.scaleLinear()
                    .domain([
                        d3.min(groupByYear.map(d => d.value)),
                        d3.max(groupByYear.map(d => d.value))
                    ])
                    .range([height, 0]);

                let bars = ``;
                groupByYear.forEach((item) => {
                    bars += `<rect x="${xScale(parseDate(item.key))}" y="${yScale(item.value)}" width="${xScale.bandwidth()}" height="${height - yScale(item.value)}" fill="#b30019"/>`
                });
                let res = `<g class="bars" transform="translate(${margin.left + 20},${margin.top})">${bars}</g>`;

                this.setState({
                    path: res
                });
            })
            .catch(e => console.log(e));
    };

    render() {
        return (
            <svg
                className="vis-container"
                width={this.props.width}
                height={this.props.height}
                dangerouslySetInnerHTML={{__html: this.state.path}}
            >
            </svg>
        );
    }
}

export default Gallery;
