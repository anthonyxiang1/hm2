import React from 'react';
import { Container, Col, Row} from 'react-bootstrap';
import "./UserCard.css";

class UserCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            firstname: (props.firstname != null) ? props.firstname: null, 
            lastname: (props.lastname != null) ? props.lastname: null, 
            school: (props.school != null) ? props.school: '',
            major: (props.major != null) ? props.major: '',
            // goals: (props.goals != null) ? props.goals: [],
            id: (props.id != null) ? props.id: "",
            tags: (props.tags != null) ? props.tags: [],
            propic: (props.propic != null) ? props.propic: require("./graysquare.png")
        };
      }

    render() {
        return (
            <div className="usercard" id="usercard">
            <Container>
                <Row>
                    <Col>
                        <div className="card shadow">
                            <div className="card-body">
                                <Row>
                                    <Col className="text-left">
                                        <Row>
                                            <img className="d-block mx-auto rounded-circle img-fluid" src={this.state.propic}></img>

                                        </Row>
                                        <Row >
                                            {this.state.goals}
                                        </Row>
                                    </Col>
                                    <Col className="text-left">
                                        <Row>
                                        <h3 className="font-weight-light d-inline"><a className="text-dark card-btn" id="card-btn" href={`/profile/${this.state.id}`} >{this.state.firstname} {this.state.lastname}</a></h3>
                                        </Row>
                                        <Row>
                                        <span>{this.state.school}</span>
                                        </Row>
                                        <Row>
                                        <span>{this.state.major}</span>
                                        </Row>
                                        <Row>
                                        <ul className="list-inline mt-3 tag-list">
                                                {this.state.tags.map((item, index) => ( 
                                                        <li className="list-inline-item">
                                                        <button  disabled className="btn btn-light">
                                                            {item}
                                                        </button>
                                                    </li>
                                                ))}
                                        </ul>
                                        </Row>
                                    </Col>
                                    </Row>  
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
                    )
    }

}

export default UserCard 