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
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import Footer from "components/Footer/Footer.js";

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
                    <div className="page-header">
                        <Container className="align-items-center">
                            <Row>
                                <Col className="" lg="6" md="6">
                                    <h3>Design Decision</h3>
                                    <Card className="card-plain">
                                        <CardHeader>
                                            <h4>Visual Encodings</h4>
                                        </CardHeader>
                                        <CardBody>
                                            How did you choose your particular visual encodings and interaction
                                            techniques?
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="4" md="4">

                                </Col>
                            </Row>
                            <Row>
                                <Col lg="6" md="6">
                                    <Card className="card-plain">
                                        <CardHeader>
                                            <h4>Alternative Designs</h4>
                                        </CardHeader>
                                        <CardBody>
                                            What alternatives did you consider and how did you arrive at your ultimate
                                            choices?
                                            Discuss different design possibilities and why specific design decisions
                                            were made
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="4" md="4">

                                </Col>
                            </Row>
                            <Row>
                                <Col className="" lg="6" md="6">
                                    <h3>Overview of Development Process</h3>
                                    <Card className="card-plain">
                                        <CardBody>
                                            Include a commentary on the development process
                                            Roughly how much time did you spend developing your application (in hours)?
                                            What aspects took the most time?
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className="ml-auto" md="4">

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
