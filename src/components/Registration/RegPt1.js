import React from "react";
import {Form, Button, Col, Row, Container, ProgressBar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import { store } from '../../store.js'
import config from '../../config/client';
import { fetchItems } from '../../actions/items';
import decode from 'jwt-decode';
import axios from 'axios';

class RegPt1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegSubmit = this.handleRegSubmit.bind(this);
    this.handleNextSubmit = this.handleNextSubmit.bind(this);
    this.handleRegChange = this.handleRegChange.bind(this);
    this.handlePicChange = this.handlePicChange.bind(this);

    this.handleTechAdder = this.handleTechAdder.bind(this);
    this.handleLangAdder = this.handleLangAdder.bind(this);
    this.handleFieldAdder = this.handleFieldAdder.bind(this);
    this.handleInterestAdder = this.handleInterestAdder.bind(this);

    this.handleLANGChange = this.handleLANGChange.bind(this);
    this.handleLANG2Change = this.handleLANG2Change.bind(this);
    this.handleINTChange = this.handleINTChange.bind(this);
    this.handleTECHChange = this.handleTECHChange.bind(this);
    this.handleTECH2Change = this.handleTECH2Change.bind(this);
    this.handleURLChange = this.handleURLChange.bind(this);
    this.handleFIELDChange = this.handleFIELDChange.bind(this);

    this.handleRemoveLANGForm = this.handleRemoveLANGForm.bind(this);
    this.handleRemoveFIELDForm = this.handleRemoveFIELDForm.bind(this);
    this.handleRemoveTECHForm = this.handleRemoveTECHForm.bind(this);
    this.handleRemoveINTERESTForm = this.handleRemoveINTERESTForm.bind(this);

    this.goBack = this.goBack.bind(this);
    this.state = {
      page: 1,
      errMsg: false,
      progress: 67,
      gender: "",
      school: "",
      major: "",
      year: "",
      education: "",
      hackCount: -1,
      goal: 0,
      propic: "",
      languages: [],
      tech: [],
      interests: [],
      fields: [],
      url: ["", "", "", "", "", "", ""],
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

  /// ********************** ADDERS
    handleLangAdder(event){
        if (this.state.languages.length < 5) {
            this.setState({ languages: this.state.languages.concat([{name: "select", skill: 0}]) });
            }
    };

    handleTechAdder(event){
        if (this.state.tech.length < 5) {
            this.setState({ tech: this.state.tech.concat([{name: "select", skill: 0}]) });
            }
        };
        
    handleFieldAdder(event){
        if (this.state.fields.length < 5) {
            this.setState({ fields: this.state.fields.concat(["select field"]) });
            }
        };

    handleInterestAdder(event){

        if (this.state.interests.length < 5) {
        this.setState({ interests: this.state.interests.concat(["select interest"]) });
        }
    };
    /// ********************** ADDERS

    // *****************REMOVE

    handleRemoveLANGForm(index){
        let languages = this.state.languages.slice();  
         languages.splice(index, 1);
         this.setState({languages}); 
        };

    handleRemoveTECHForm(index){
        let tech = this.state.tech.slice();  
        tech.splice(index, 1);
         this.setState({tech}); 
        };
     
    handleRemoveFIELDForm(index){
        let fields = this.state.fields.slice();  
        fields.splice(index, 1);
         this.setState({fields}); 
    };

    handleRemoveINTERESTForm(index){
        let interests = this.state.interests.slice();  
        interests.splice(index, 1);
         this.setState({interests}); 
    };

    // *****************REMOVE

    handleLANGChange(e, index) {
        this.state.languages[index].name = e.target.value;
        this.setState({ languages: this.state.languages})
    }

    handleLANG2Change(e, index) {
        this.state.languages[index].skill = e.target.value;
        this.setState({ languages: this.state.languages})
    }

    handleINTChange(e, index) {
        this.state.interests[index] = e.target.value;
        this.setState({ interests: this.state.interests})
    }

    handleTECHChange(e, index) {
        this.state.tech[index].name = e.target.value;
        this.setState({ tech: this.state.tech})
    }

    handleTECH2Change(e, index) {
        this.state.tech[index].skill = e.target.value;
        this.setState({ tech: this.state.tech})
    }

    handleURLChange(e, index) {
        this.state.url[index] = e.target.value;
        this.setState({ url: this.state.url})
    }

    handleFIELDChange(e, index) {
        this.state.fields[index] = e.target.value;
        this.setState({ fields: this.state.fields})
    }


  render() {
    const {page, errMsg} = this.state;

      if (page === 1) {
        return (
        <div className="registration">
          <Container>      
          <ProgressBar variant="success" animated now={1} />
          <br/>
          <h1>Register</h1>
          <br></br>
          <small>{errMsg}</small>
          <br></br>
            <Col > 
              <Row >
              <Form className="reg" onSubmit={this.handleNextSubmit}>
                  <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Gender*</Form.Label>
                        <Form.Control as="select" name="gender" value={this.state.gender} onChange={this.handleRegChange}>
                          <option>Choose...</option>
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </Form.Control>
                    </Form.Group>
                

                <Form.Group controlId="formGridAddress1">
                  <Form.Label>School*</Form.Label>
                  <Form.Control placeholder="1234 Main St" name="school" value={this.state.school} onChange={this.handleRegChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Major*</Form.Label>
                    <Form.Control as="select" name="major" value={this.state.major} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option>Computer Science</option>
                      <option>Information Systems</option>
                      <option>Mathematics</option>
                      <option>Biology</option>
                      <option>Chemistry</option>
                      <option>Physics</option>
                      <option>Statistics</option>
                      <option>Health Sciences</option>
                      <option>Computer Engineering</option>
                      <option>Electrical Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Civil Engineering</option>
                      <option>Biomedical Engineering</option>
                      <option>Chemical Engineering</option>
                      <option>Finance</option>
                      <option>Economics</option>
                      <option>Business</option>
                      <option>Psychology</option>
                    </Form.Control>
                </Form.Group>

                <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Grad Year*</Form.Label>
                    <Form.Control as="select"  name="year" value={this.state.year} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                     
                      <option>2018</option>
                      <option>2019</option>
                      <option>2020</option>
                      <option>2021</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Education Level*</Form.Label>
                    <Form.Control as="select" name="education" value={this.state.education} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option>High School</option>
                      <option>Undergraduate</option>
                      <option>Graduate</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Hackathons*</Form.Label>
                    <Form.Control as="select" name="hackCount" value={this.state.hackCount} onChange={this.handleRegChange}>
                      <option>Choose...</option>
                      <option value="0">This is my first!</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
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

            <Form.Group as={Col} controlId="formGridState">
                    <Form.Label><strong>Languages</strong></Form.Label>
                    {
                      this.state.languages.map((languages, index)=> {
                          return (
                          <div key={index}>
                              <Form.Group className="form-inline">
                              <Form.Label>Language #{index+1}.</Form.Label>
                              <Form.Control
                              as="select"
                              type="text"
                              onChange= {(e) => this.handleLANGChange(e, index)}
                              id={languages.name}
                              value={languages.name} 
                              className="name"
                              >
                                  <option>{languages.name}</option>
                                  <option>Javascript</option>
                                  <option>Java</option>
                                  <option>PHP</option>
                                  <option>Android</option>
                                  <option>Python</option>
                                  <option>HTML</option>
                                  <option>CSS</option>
                                  <option>iOS</option>
                                  <option>Swift</option>
                                  <option>Ruby on Rails</option>
                                  <option>SQL</option>
                                  <option>C</option>
                                  <option>C++</option>
                                  <option>C#</option>
                                  <option>Go</option>
                              </Form.Control>
                              <Form.Label>   Familiarity: </Form.Label>
                              <Form.Control
                              as="select"
                              type="text"
                              onChange= {(e) => this.handleLANG2Change(e, index)}
                              id={languages.skill}
                              value={languages.skill} 
                              className="name"
                              >
                                  <option>{languages.skill}</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                              </Form.Control>
                              
                              <Button variant="danger" onClick={() => this.handleRemoveLANGForm(index)}>-</Button>
                              </Form.Group>
                          </div>
                          )
                      })
                      }
                        <br/>
                        <Button variant="outline-primary" onClick={this.handleLangAdder}>Add Language</Button>
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label><strong>Technologies</strong></Form.Label>
                    {
                      this.state.tech.map((tech, index)=> {
                          return (
                          <div key={index}>
                              <Form.Group className="form-inline">
                              <Form.Label>Technology #{index+1}.</Form.Label>
                              <Form.Control
                              as="select"
                              type="text"
                              onChange= {(e) => this.handleTECHChange(e, index)}
                              id={tech.name}
                              value={tech.name} 
                              className="name"
                              >
                                  <option>{tech.name}</option>
                                  <option>ReactJS</option>
                                  <option>RESTful API</option>
                                  <option>D3</option>
                                  <option>Flask</option>
                                  <option>Django</option>
                                  <option>MongoDB</option>
                                  <option>Node.js</option>
                                  <option>ASP.net</option>
                                  <option>Angular.js</option>
                                  <option>Json</option>
                                  <option>Pandas</option>
                                  <option>Bootstrap</option>
                                  <option>Azure</option>
                                  <option>Google Cloud</option>
                                  <option>Firebase</option>
                                  <option>Heroku</option>
                              </Form.Control>
                              <Form.Label>   Familiarity: </Form.Label>
                              <Form.Control
                              as="select"
                              type="text"
                              onChange= {(e) => this.handleTECH2Change(e, index)}
                              id={tech.skill}
                              value={tech.skill} 
                              className="name"
                              >
                                  <option>{tech.skill}</option>
                                  <option>1</option>
                                  <option>2</option>
                                  <option>3</option>
                                  <option>4</option>
                                  <option>5</option>
                                  <option>6</option>
                                  <option>7</option>
                                  <option>8</option>
                                  <option>9</option>
                                  <option>10</option>
                              </Form.Control>
                              
                              <Button variant="danger" onClick={() => this.handleRemoveTECHForm(index)}>-</Button>
                              </Form.Group>
                              
                          </div>
                          )
                      })
                      }
                        <br/>
                        <Button variant="outline-primary" onClick={this.handleTechAdder}>Add Technology</Button>
                  </Form.Group>
                
              <Form.Group as={Col} controlId="formGridState">
                    <Form.Label><strong>Interests (max 5)</strong></Form.Label>
                    {
                        this.state.interests.map((interests, index)=> {
                            return (
                                <Form.Group className="form-inline">
                                <Form.Control
                                as="select"
                                type="text"
                                onChange= {(e) => this.handleINTChange(e, index)}
                                id={interests}
                                value={interests} 
                                >
                                    <option>{interests}</option>
                                    <option>Artificial Intelligence</option>
                                    <option>Computer Vision</option>
                                    <option>Machine Learning</option>
                                    <option>Medical Imaging</option>
                                    <option>Theory</option>
                                    <option>Hardware</option>
                                    <option>Networks</option>
                                    <option>Graphics</option>
                                    <option>Human-Computer Interaction</option>
                                    <option>Game Development</option>
                                    <option>Data Visualization</option>
                                    <option>AR/VR</option>
                                    <option>UI/UX Design</option>
                                    <option>Data Science</option>
                                    <option>iOS Development</option>
                                    <option>Android Development</option>
                                    <option>Frontend Development</option>
                                    <option>Backend Development</option>
                                    <option>Fullstack Development</option>
                                </Form.Control>
                                <span>  </span>
                                <Button variant="danger" onClick={() => this.handleRemoveINTERESTForm(index)}>-</Button>
                                </Form.Group>
                            )
                        })
                        }
                        <br/>
                        <Button variant="outline-primary" onClick={this.handleInterestAdder}>Add Interest</Button>
                  </Form.Group>


                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label><strong>Fields (max 5)</strong></Form.Label>
                    {
                        this.state.fields.map((fields, index)=> {
                            return (
                            <div key={index}>
                                <Form.Group className="form-inline">
                                <Form.Control
                                as="select"
                                type="text"
                                onChange= {(e) => this.handleFIELDChange(e, index)}
                                id={fields}
                                value={fields} 
                                className="name"
                                >
                                    <option>{fields}</option>
                                    <option>Finance</option>
                                    <option>Health</option>
                                    <option>Education</option>
                                    <option>Environment</option>
                                    <option>Biology</option>
                                    <option>Chemistry</option>
                                    <option>Physics</option>
                                    <option>Mathematics</option>
                                    <option>Social Networking</option>
                                    <option>Astronomy</option>
                                    <option>Human Assistance</option>
                                    <option>Music</option>
                                    <option>Art</option>
                                    <option>Helping Developing Countries</option>
                                    <option>Cars</option>
                                    <option>Sports</option>
                                    <option>Social conflicts</option>
                                    <option>Disaster Relief</option>

                                    
                                </Form.Control>
                                
                                <Button variant="danger" onClick={() => this.handleRemoveFIELDForm(index)}>-</Button>
                                </Form.Group>
                            </div>
                            )
                        })
                        }
                        <br/>
                        <Button variant="outline-primary" onClick={this.handleFieldAdder}>Add Field</Button>
                  </Form.Group>
              
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
        <small>{errMsg}</small>
        <br></br>
          <Col > 
            <Row >
            <Form className="reg" onSubmit={this.handleRegSubmit}>
              

              <Form.Label><h3>Help hackers connect with you</h3></Form.Label>
              <br></br>

                  <Form.Group controlId="formGridAddress1">
                      <Form.Label>Github</Form.Label>
                        <Form.Control
                        type="text"
                        placeholder="Github link"
                        value={this.state.url[0]}
                        onChange= {(e) => this.handleURLChange(e,0)}
                        className="name"
                        />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Website</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Website link"
                          value={this.state.url[1]}
                          onChange= {(e) => this.handleURLChange(e,1)}
                          className="name"
                          />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Facebook link"
                          value={this.state.url[2]}
                          onChange= {(e) => this.handleURLChange(e,2)}
                          className="name"
                          />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Slack</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Slack link"
                          value={this.state.url[3]}
                          onChange= {(e) => this.handleURLChange(e,3)}
                          className="name"
                          />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Instagram</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Instagram link"
                            value={this.state.url[4]}
                            onChange= {(e) => this.handleURLChange(e,4)}
                            className="name"
                            />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Devpost</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Devpost link"
                            value={this.state.url[5]}
                            onChange= {(e) => this.handleURLChange(e,5)}
                            className="name"
                            />
                    </Form.Group>

                    <Form.Group controlId="formGridAddress1">
                      <Form.Label>Linkedin</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Linkedin link"
                            value={this.state.url[6]}
                            onChange= {(e) => this.handleURLChange(e,6)}
                            className="name"
                            />
                    </Form.Group>

                  <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">
                        Profile Picture
                        </span>
                    </div>
                    <div className="custom-file">
                        <form value={this.state.propic} onChange={this.handleRegChange}>
                        <div class="form-group">
                            <label for="exampleFormControlFile1"></label>
                            <Form.Control
                                  id="fileUpload"
                                  type="file"
                                  name="propic"
                                  onChange={this.handleRegChange}
                              />
                        </div>
                        </form>
                    </div>
                </div>
              <br></br>

              <Form.Label><h3>Add some more information to help us match you better!</h3></Form.Label>
              
              <Form.Label>How much do you care about these when looking for a teammate?*</Form.Label>
              <Form.Label><br></br></Form.Label>
                  <Form.Row>
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
                  </Form.Row>

                  <Form.Row>
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
                  </Form.Row>

                  <Form.Group as={Col} controlId="formGridState">
                      <Form.Label>How much do you care about winning?</Form.Label>
                      <Form.Control as="select" name="goal" value={this.state.goal} onChange={this.handleRegChange}>
                        <option>Choose...</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option>8</option>
                        <option>9</option>
                        <option>10</option>
                      </Form.Control>
                  </Form.Group>
                  

              <Button variant="primary" onClick={this.goBack}>
                Back
              </Button>
              <span>   </span>
              <Button variant="success" type="submit" >
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

  handlePicChange(event){
    this.setState({
      [event.target.name]: event.target.files[0]
    });
  };

  handleRegChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleRegSubmit(event){
    event.preventDefault();
    if (this.state.similarField !== "" && this.state.similarInt !== "" && this.state.similarLang !== "" && this.state.similarTech !== "" && this.state.goal !== 0){
    this.setState({
      progress: 100,
    });
    console.log(this.state)
    var profile = {
      'gender': this.state.gender,
      'school': this.state.school,
      'major': this.state.major,
      'gradYear': this.state.year,
      'numOfHackathons': this.state.hackCount
    }
    var preferences = {
      'interests': this.state.interests || [],
      'fields': this.state.fields || [],
      'technologies': this.state.tech || [],
      'languages': this.state.languages || [],
      'goals': this.state.goal
    }
    var postData = {
      'profile_pic': '',
      'profile': profile,
      'preferences': preferences
    }
    console.log(preferences);
    var config = {
      headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
    };
    axios.post('http://127.0.0.1:5000/auth/register', postData, config).then(res => {
        console.log(res);
        console.log(res.data);
    }).then(res => {this.props.history.push("/home");})
    } 
  else {
    alert("fill in all required fields")
  }
  };

  handleNextSubmit(event){
    event.preventDefault(); 
    if (this.state.school !== "" && this.state.gender !== "" 
        && this.state.major !== "" && this.state.year !== "" && this.state.education !== "" && this.state.hackCount !== "") {
    this.setState({
      page: this.state.page+1,
      errMsg: true
    });
  }
    else {
      alert("fill in all required fields")
    }
    
  };

  goBack(event) {
    this.setState({
      page: this.state.page-1
    });

  }

}

export default withRouter(RegPt1);
