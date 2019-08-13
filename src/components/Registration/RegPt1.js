import React from "react";
import {Form, Button, Col, Row, Container, ProgressBar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


class RegPt1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.handleNextSubmit = this.handleNextSubmit.bind(this);
    this.handleRegChange = this.handleRegChange.bind(this);
    this.goBack = this.goBack.bind(this);
    this.state = {
      page: 1,
      progress: 67,
      gender: "",
      school: "",
      major: "",
      year: "",
      education: "",
      hackCount: "",
      language: {},
      tech: {},
      interest: [],
      field: [],
      url: {
        facebook: "",
        twitter: "",
        github: "",
        linkedin: "",
        email: "",
        website: "",
        instagram: "",
        phone: ""
      },
      similarInt: "",
      similarTech: "",
      similarLang: "",
      similarField: "",
    };
  }

  componentDidMount() {
    var url='http://localhost:5000/api/account';
    fetch(url, {
      method: 'GET',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json',
      // },
      // data: JSON.stringify({
      //   firstParam: 'yourValue',
      //   secondParam: 'yourOtherValue',
      // }),
    }).then(response =>{
      console.log(response);
    }).catch(err => {
      console.log(err);
    });
     /*ApiCall().then((data) => {
         this.setState({data, loading: false})
     })*/
  }

  render() {
    const {page} = this.state;

      if (page === 1) {
        return (
        <div className="registration">
          <Container>      
          <ProgressBar variant="success" animated now={1} />
          <br/>
          <h1>Register</h1>
          <br></br>
            <Col > 
              <Row >
              <Form className="reg" onSubmit={this.handleNextSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleRegChange}>
                          <option>Choose...</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>School</Form.Label>
                  <Form.Control placeholder="1234 Main St" name="school" value={this.state.school} onChange={this.handleRegChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Major</Form.Label>
                    <Form.Control as="select" name="major" value={this.state.major} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option>Computer Science</option>
                      <option>Mathematics</option>
                      <option>Biology</option>
                      <option>Art</option>
                    </Form.Control>
                </Form.Group>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Grad Year</Form.Label>
                    <Form.Control as="select"  name="year" value={this.state.year} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                     
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Education Level</Form.Label>
                    <Form.Control as="select" name="education" value={this.state.education} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option>High School</option>
                      <option>Undergraduate</option>
                      <option>Graduate</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Hackathons</Form.Label>
                    <Form.Control as="select" name="hackCount" value={this.state.hackCount} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option>This is my first!</option>
                      <option>2-5</option>
                      <option>5-10</option>
                      <option>10+</option>
                    </Form.Control>
                  </Form.Group>
                </Form.Row>

                <Button variant="primary" type="submit">
                  Next
                </Button>
              </Form> 
            </Row>
                
            </Col>
          </Container>
          <div className="bottom"></div>
        </div>
       
        );
      }

          // PART 2 **************************************************** social media, interests, fields




    else if (page === 2) {
      return (
        <div className="registration">
        <Container>      
        <ProgressBar variant="success" animated now={33} label={`${33}%`}/>
        <br/>
        <h1>Register</h1>
        <br></br>
          <Col > 
            <Row >
            <Form className="reg" onSubmit={this.handleNextSubmit}>
                <Form.Group controlId="formGridAddress1">
                      <Form.Label>Github</Form.Label>
                      <Form.Control placeholder="github link" name="github" value={this.state.url.github} onChange={this.handleRegChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Website</Form.Label>
                      <Form.Control placeholder="website link" name="website" value={this.state.url.website} onChange={this.handleRegChange} />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control placeholder="facebook link" name="facebook" value={this.state.url.facebook} onChange={this.handleRegChange} />
                    </Form.Group>

              <Form.Label>insert todolist for interests - one dropdown</Form.Label>
              <br></br>
              <Form.Label>insert todolist for fields - one dropdown</Form.Label>
              <br></br>
              <Button variant="primary" onClick={this.goBack}>
                Back
              </Button>
              <span>   </span>
              <Button variant="primary" type="submit">
                Next
              </Button>
            </Form> 
          </Row>
              
          </Col>
        </Container>
        <div className="bottom"></div>
      </div>

      )}
                // PART 3 **************************************************** languages, technologies, similar




    else if (page === 3) {
      return (
        <div className="registration">
        <Container>  
        <ProgressBar variant="success" animated now={this.state.progress} label={`${this.state.progress}%`}/>
        <br/>
        <h1>Register</h1>
        <br></br> 

          <Col > 
            <Row >
            <Form className="reg" onSubmit={this.handleRegSubmit}>
              <Form.Label><strong>Add information to help us match you better!</strong></Form.Label>

              <Form.Label>insert todolist for languages - two dropdowns</Form.Label>
              <br></br>
              <Form.Label>insert todolist for tech - two dropdowns</Form.Label>
              <br></br>
              <Form.Label>How much do you care about these when looking for a teammate?</Form.Label>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Similar Interests</Form.Label>
                      <Form.Control as="select" name="similarInt" value={this.state.similarInt} onChange={this.handleRegChange}>
                        <option>Choose...</option>
                        <option>Not important</option>
                        <option>A little important</option>
                        <option>Somewhat important</option>
                        <option>Pretty important</option>
                        <option>Most important</option>
                      </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Similar Languages</Form.Label>
                      <Form.Control as="select" name="similarLang" value={this.state.similarLang} onChange={this.handleRegChange}>
                        <option>Choose...</option>
                        <option>Not important</option>
                        <option>A little important</option>
                        <option>Somewhat important</option>
                        <option>Pretty important</option>
                        <option>Most important</option>
                      </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Similar Technologies</Form.Label>
                      <Form.Control as="select" name="similarTech" value={this.state.similarTech} onChange={this.handleRegChange}>
                        <option>Choose...</option>
                        <option>Not important</option>
                        <option>A little important</option>
                        <option>Somewhat important</option>
                        <option>Pretty important</option>
                        <option>Most important</option>
                      </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>Similar Fields</Form.Label>
                      <Form.Control as="select" name="similarField" value={this.state.similarField} onChange={this.handleRegChange}>
                        <option>Choose...</option>
                        <option>Not important</option>
                        <option>A little important</option>
                        <option>Somewhat important</option>
                        <option>Pretty important</option>
                        <option>Most important</option>
                      </Form.Control>
                  </Form.Group>

              <Button variant="primary" onClick={this.goBack}>
                Back
              </Button>
              <span>   </span>
              <Button variant="primary" type="submit" >
                Submit
              </Button>
            </Form> 
          </Row>
              
          </Col>
        </Container>
        <div className="bottom"></div>
      </div>

      )}
  }

  handleRegChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRegSubmit(event){
    event.preventDefault();
    this.setState({
      progress: 100
    });
    console.log("SEND TO BACKEND")
    console.log(this.state)
  };

  handleNextSubmit(event){
    event.preventDefault();
    this.setState({
      page: this.state.page+1
    });
    console.log(this.state)
    
  };

  goBack(event) {
    this.setState({
      page: this.state.page-1
    });

  }

}

export default withRouter(RegPt1);
