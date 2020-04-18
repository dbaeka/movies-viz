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
import Store from "../flux/store";
import {Actions} from "../flux";

import * as d3 from "d3"
import Slider from "nouislider";
import wNumb from "wnumb";

class FIlterSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            path: "",
            filterIndex: Store.getFilterIndex(),
            sliderValue: Store.getSliderValue(),
        };

        this.drawOrdinal = this.drawOrdinal.bind(this);
        this.drawContinusous = this.drawContinusous.bind(this);
        this.reloadData = this.reloadData.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        const type = this.state.filterIndex;
        let func = (type === "0") ? this.drawOrdinal() : this.drawContinusous();
        window.addEventListener('resize', func);

        this.props.setClick(this.reloadData);

        var slider1 = this.refs.slider1;
        Slider.create(slider1, {
            start: [this.state.sliderValue.start, this.state.sliderValue.end],
            connect: [false, true, false],
            tooltips: true,
            format: wNumb({
                decimals: 0
            }),
            step: 1,
            range: {min: 0, max: 100}
        });

        slider1.noUiSlider.on('change', (e) => {
            let val = {start: e[0], end: e[1]};
            Actions.updateSliders(val);
        });

    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        const type = this.state.filterIndex;
        let func = (type === "0") ? this.drawOrdinal() : this.drawContinusous();
        window.removeEventListener('resize', func);
        Store.removeChangeListener(this.onChange);
    }

    onChange() {
        this.setState({
            ...this.state,
            filterIndex: Store.getFilterIndex(),
            sliderValue: Store.getSliderValue(),
        });
        // this.reloadData()
    }

    reloadData = () => {
        const type = Store.getFilterIndex();
        (type === "0") ? this.drawOrdinal() : this.drawContinusous();
    };

    getData = () => {
        // fetch data from the server
        // and transform into CSV format
        return new Promise((resolve, reject) => {
            d3.csv(this.props.src)
                .then(data => resolve(data))
                .catch(error => reject(error));
        });
    };


    drawOrdinal = () => {
        var parseDate = (dateString) => {
            var parseDate = d3.timeParse("%Y");
            var numFormat = new Intl.NumberFormat('en', {minimumFractionDigits: 0});
            return parseDate(numFormat.format(dateString).replace(/,\s?/g, ""));
        };

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
                    .entries(data)
                    .filter(k => k.key !== "");

                // set the dimensions and margins of the graph
                const margin = {top: 15, bottom: 15, left: -14, right: 18};
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

                const ymin = d3.min(groupByYear.map(d => d.value));
                const ymax = d3.max(groupByYear.map(d => d.value));
                // Add Y axis
                var yScale = d3.scaleLinear()
                    .domain([
                        ymin, ymax
                    ])
                    .range([height, 0]);

                const vals = {
                    start: d3.min(groupByYear.map(d => d.key)),
                    end: d3.max(groupByYear.map(d => d.key))
                };

                Actions.updateSliders(vals);

                let slider = this.refs.slider1;
                slider.noUiSlider.updateOptions({
                    start: [Store.getSliderValue().start, Store.getSliderValue().end],
                    step: 1,
                    range: {min: parseInt(Store.getSliderValue().start), max: parseInt(Store.getSliderValue().end)},
                    format: wNumb({
                        decimals: 0,
                    }),
                });

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

    drawContinusous = () => {
        this.getData()
            .then(data => { // renders the data table
                    const keys = Object.keys(data[0]);
                    const FIELDS = {
                        GROSS: 8, GENRES: 9, TITLES: 11, YEAR: 23, SCORE: 25, LIKES: 27, POSTERS: 28
                    };

                    const gross = keys[FIELDS.GROSS];
                    let filteredData = data
                        .filter(k => k[gross] !== "").map(d => {
                            return {
                                ...d,
                                gross: parseInt(d[gross])
                            }
                        })
                        .sort((e, f) => e[gross] - f[gross]);

                    // set the dimensions and margins of the graph
                    const margin = {top: 15, bottom: 15, left: -12, right: 18};
                    let {width, height} = this.props;
                    width -= (margin.left + margin.right);
                    height -= (margin.top + margin.bottom);
                    //X axis
                    var xScale = d3.scaleLinear()
                        .range([0, width])
                        .domain([
                            d3.min(filteredData.map(d => d[gross])),
                            d3.max(filteredData.map(d => d[gross]))
                        ]);

                    // // Add Y axis
                    var yScale = d3.scaleLinear()
                        .range([height, 0]);

                    const min = d3.min(filteredData.map(d => d[gross]));
                    const max = d3.max(filteredData.map(d => d[gross]));
                    const thresholds = d3.range(min, max, (max - min) / 100);

                    // set the parameters for the histogram
                    var histogram = d3.histogram()
                        .value(d => d[gross])
                        .domain(xScale.domain())  // then the domain of the graphic
                        .thresholds(thresholds);
                    // .thresholds(xScale.ticks(100)); // then the numbers of bins

                    // And apply this function to data to get the bins
                    var bins = histogram(filteredData);
                    // Y axis: update now that we know the domain
                    yScale.domain([0, d3.max(bins, d => d.length)]);   // d3.hist has to be called before the Y axis obviously

                    const steps = bins[0].x1 - bins[0].x0;

                    const vals = {
                        start: bins[0].x0,
                        end: bins[bins.length - 1].x1,
                    };

                    Actions.updateSliders(vals);

                    let slider = this.refs.slider1;
                    slider.noUiSlider.updateOptions({
                        start: [Store.getSliderValue().start, Store.getSliderValue().end],
                        step: steps,
                        range: {min: parseInt(Store.getSliderValue().start), max: parseInt(Store.getSliderValue().end)},
                        format: wNumb({
                            decimals: 0,
                            thousand: ',',
                            prefix: '$ ',
                        }),
                    });

                    let bars = ``;
                    bins.forEach((item) => {
                        bars += `<rect x="0" transform="translate(${xScale(item.x0)}, ${yScale(item.length)})" width="${xScale(item.x1) - xScale(item.x0)}" height="${height - yScale(item.length)}" fill="#b30019"/>`
                    });
                    let res = `<g class="bars" transform="translate(${margin.left + 20},${margin.top})">${bars}</g>`;

                    this.setState({
                        path: res
                    });
                }
            )
            .catch(e => console.log(e));
    };

    render() {
        return (
            <>
                <div className="filter-slider" ref="slider1"/>
                <svg
                    className="filter-container"
                    width={this.props.width}
                    height={this.props.height}
                    dangerouslySetInnerHTML={{__html: this.state.path}}
                >
                </svg>
            </>
        );
    }
}

export default FIlterSlider;
