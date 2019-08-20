import React from 'react';
import { Container, Col, Row} from 'react-bootstrap';
class UserCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name, 
            school: props.school, 
            major: props.major, 
            goals: props.goals, 
            tags: props.tags,
            propic: props.propic
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
                                        <h3 className="font-weight-light d-inline"><a className="text-dark card-btn" id="card-btn" href="" >{this.state.name}</a></h3>
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