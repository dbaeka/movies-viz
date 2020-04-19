import React from "react";
import classnames from "classnames";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Label,
    FormGroup,
    Form,
    Input,
    FormText,
    NavItem,
    NavLink,
    Nav,
    Table,
    TabContent,
    TabPane,
    Container,
    Row,
    Col,
    UncontrolledTooltip,
    UncontrolledCarousel
} from "reactstrap";

// core components
import ExamplesNavbar from "../../components/Navbars/ExamplesNavbar.js";

class WriteUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        document.body.classList.toggle("profile-page");
    }

    componentWillUnmount() {
        document.body.classList.toggle("profile-page");
    }

    render() {
        return (
            <>
                <ExamplesNavbar/>
                <div className="wrapper">
                    <div className="writeup">
                        <Container className="align-items-center">
                            <h2>Movie Interaction Tool</h2>
                            <p>
                                The movie interactive tool was inspired by the need for movie watchers like myself to
                                get a tool that is visually pleasing and gives the user freedom to mix and match filters
                                to see what movies are available. An added feature of this tool is the inclusion of
                                posters to stimulate the users when they hover over a movie. An additional question that
                                might be investigated is how poster designs relate to gross and the year.

                                The original data is taken from the <a
                                href="https://www.kaggle.com/carolzhangdc/imdb-5000-movie-dataset">
                                Kaggle IMdb Movie Dataset
                            </a> and the poster links are
                                crawled from <a href="http://imdb.com/">IMdb</a>.
                            </p>
                            <br/>
                            <h3>Design Decision</h3>
                            <Row>
                                <Col className="" lg="6" md="6">
                                    <Card className="card-plain">
                                        <CardHeader>
                                            <h4>Visual Encodings</h4>
                                        </CardHeader>
                                        <CardBody>
                                            The visual encoding for the dataset lies across multi dimensions. The tool
                                            provides a filter for year and gross and displays the distribution using a
                                            bar chart to give the user an idea where the movies are concentrated.
                                            <br/><br/>
                                            The movies are displayed dynamically using posters sourced from IMdb to the
                                            added data. Positional encoding across the area shows a sorted and filtered
                                            list of the top 100 movies matching the set criteria. Users can use a filter
                                            slider to set the year range and gross range of the movie while being able
                                            to see the distribution of where the movie data is. The user can toggle
                                            between gross and year which updates the screen instantly.
                                            <br/><br/>
                                            Posters were chosen because it is the most natural way users interact with
                                            movies in a list. Bar charts were chosen to show distribution of movies over
                                            the selected categories.
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" md="6">
                                    <Card className="card-plain">
                                        <CardHeader>
                                            <h4>Alternative Designs</h4>
                                        </CardHeader>
                                        <CardBody>
                                            Rather than use bar charts to show the data distribution, the year and gross
                                            could have been drawn on one scatter plot to show how each dimension affects
                                            the other to give the user a better view.<br/>
                                            Using a scatter plot would need more estate to visualize properly and would
                                            be unnatural to read at first. Also to include a filter slider based on
                                            specific dimensions of the data, it was best to show the dimension
                                            distributions separately rather as a bar chart. This gives the user
                                            instantaneous information about the movie data.
                                            <br/><br/>
                                            Movies could have been organised by category as grouped bubbles based on an
                                            ordinal category like genre rather than positional in an order. The same
                                            bubbles could be made interactive to show posters when hovered on.<br/>
                                            This choice of interaction would require a huge estate to visualize data
                                            clearly as bubbles within the same category might be crowded. Also most
                                            movies have more than one genre and it would be difficult to discriminate
                                            which category to place them in. Repeated visuals will detract from the goal
                                            of being able to search for a movie based on selected criteria.
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                            <h3>Overview of Development Process</h3>
                            <Row>
                                <Col className="" lg="6" md="6">
                                    <Card className="card-plain">
                                        <CardBody>
                                            <h4>Processing Data</h4>
                                            The data sourced from Kaggle lacked the poster links, so a web scraper was
                                            written in Python to find the posters from the page html given the IMdb
                                            links in the original dataset. The poster links were appended as a column in
                                            the csv data.
                                            <h4 className="mt-4">Web Page Development</h4>
                                            The website is built using <strong>ReactJS</strong> with reactstrap as the
                                            main library for
                                            views. D3.js is the tool used to process the csv data and render the
                                            visualizations.
                                            <h4 className="mt-4">Visualisation Development</h4>
                                            Due to ReactJS's interaction with a Virtual DOM, a different
                                            approach rather than using D3's DOM interaction was used. The SVG elements
                                            were generated as strings using Javascript functions and injected into the
                                            Virtual DOM on render changes.<br/><br/>
                                            Each bar chart was drawn using svg rects and the data and scales processed
                                            using D3. For the year distribution an Ordinal scale was used and a Linear
                                            scale was used for the gross distribution. Most of the development time was
                                            spent calibrating the sliders to fit and model the steps of change over the
                                            underlying distribution visuals. Coordinated interaction between all the
                                            visualizations and the selectors was facilitated with the use of flux which
                                            allows data to be instantly sent to the needed components.
                                            <br/><br/>
                                            Overall development took about 34 hours over 3 days.
                                            <h4 className="mt-4">Future Development</h4>
                                            Given extra time, the tool can incorporate genres as a side filter that
                                            shows the distribution of data in matching the criteria. The genres could be
                                            made buttons that highlight the movie posters that match the category and
                                            dim the rest that do not match.
                                            Most time was spent integrating D3 and React to display the visuals as well
                                            as time spent crawling IMdb for the poster links.
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </>
        );
    }
}

export default WriteUp;
