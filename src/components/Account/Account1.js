import React from "react";
import {Container, Row, Col, Form, Button, Card, Adder, ProgressBar} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import UpdatePassword from './UpdatePassword';
import DeleteAccount from './DeleteAccount';
import { SocialIcon } from 'react-social-icons';
import axios from 'axios';

class Account1 extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleTechAdder = this.handleTechAdder.bind(this);
        this.handleLangAdder = this.handleLangAdder.bind(this);
        this.handleFieldAdder = this.handleFieldAdder.bind(this);
        this.handleInterestAdder = this.handleInterestAdder.bind(this);

        this.handleSocial = this.handleSocial.bind(this);
        this.handleProfileChange = this.handleProfileChange.bind(this);
        this.handleLANGChange = this.handleLANGChange.bind(this);
        this.handleLANG2Change = this.handleLANG2Change.bind(this);
        this.handleINTChange = this.handleINTChange.bind(this);
        this.handleTECHChange = this.handleTECHChange.bind(this);
        this.handleTECH2Change = this.handleTECH2Change.bind(this);
        this.handleURLChange = this.handleURLChange.bind(this);
        this.handleFIELDChange = this.handleFIELDChange.bind(this);
        this.handleProfileSubmit = this.handleProfileSubmit.bind(this);
        this.handleRemoveURLForm = this.handleRemoveURLForm.bind(this);
        this.handleRemoveLANGForm = this.handleRemoveLANGForm.bind(this);
        this.handleRemoveFIELDForm = this.handleRemoveFIELDForm.bind(this);
        this.handleRemoveTECHForm = this.handleRemoveTECHForm.bind(this);
        this.handleRemoveINTERESTForm = this.handleRemoveINTERESTForm.bind(this);
        this.handleProfileCancel = this.handleProfileCancel.bind(this);
        
        this.state = {
          page: true,
          gender: "Male",
          username: "Anthony Xiang",
          educationLvl: "college",
          year: "2022",
          major: "art",
          school: "sbu",
          about: "about me goes here, any projects, what your goal is (looking to win)",
          url: ["http://linkedin.com/in/jaketrent", "http://twitter.com", 'a@gmail.com', 'github.com', 'facebook.com'],
          languages: [{name: "java", skill: 8}, {name: "python", skill: 3}],
          tech: [{name: "ML", skill: 8}, {name: "aws", skill: 3}],
          fields: ["health", "edu"],
          interests: ["ML", "else"],
          hackathons: 2,
          goals: 0,
          password: "",
          confirmPass: "", 
          langList: ["a", "b", "c", "d", "java"],
          techList: ['tech1', 'tech2'],
          langNot: [],
          selectedTeam: ""
        };
        this.baseState = this.state;
      }

      componentDidMount() {
        if(localStorage.auth_token){
          var config = {
            headers: {'Authorization': 'Bearer ' + localStorage.auth_token.toString()}
          };
          axios.get(`http://127.0.0.1:5000/auth/account`, config)
            .then(res => {
              console.log(res);
              console.log(res.data);
              var data = JSON.parse(res.data.user);
              console.log(data['preferences']['languages'])
              console.log(data['preferences']['technologies'])
              console.log(data['preferences']['interests'])
              console.log(data['preferences']['fields'])
              console.log(data['preferences']['languages'][0])
              this.setState({
                  gender: data['profile']['gender'],
                  username: data['firstname']+ ' '+data['lastname'],
                  year: data['profile']['gradYear'],
                  major: data['profile']['major'],
                  school: data['profile']['school'],
                  languages: data['preferences']['languages'] || [],
                   tech: data['preferences']['technologies'] || [],
                   fields: data['preferences']['fields'] || [],
                   interests: data['preferences']['interests'] || [],
                   hackathons: data['profile']['numOfHackathons'] || 0,
                   goals: data['preferences']['goals'] || 0
              });
            })
        }

      } 
      
      handleClick(event){
        this.setState({
          page: !this.state.page
        });
      };

    /// ********************** ADDERS
    handleLangAdder(event){
        if (this.state.languages.length < 5) {
            this.setState({ languages: this.state.languages.concat([{name: "C", skill: 1}]) });
            }
    };

    handleTechAdder(event){
        if (this.state.tech.length < 5) {
            this.setState({ tech: this.state.tech.concat([{name: "tester", skill: 1}]) });
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

    handleSocial(event){
        this.setState({ url: this.state.url.concat([""]) });
    };
    /// ********************** ADDERS

    // *****************REMOVE
    handleRemoveURLForm(index){
        let url = this.state.url.slice();  
        url.splice(index, 1);
        this.setState({url});  
         };

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

    handleProfileChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
    };

    handleProfileSubmit(event){
        event.preventDefault();
        console.log(this.state);
        var profile = {
          'gender': this.state.gender,
          'school': this.state.school,
          'major': this.state.major,
          'gradYear': this.state.year,
          'numOfHackathons': this.state.hackathons
        }
        var preferences = {
          'interests': this.state.interests,
          'fields': this.state.fields,
          'technologies': this.state.tech,
          'languages': this.state.languages,
          'goals': this.state.goals
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
        axios.post('http://127.0.0.1:5000/auth/account', postData, config).then(res => {
            console.log(res);
            console.log(res.data);
        }).then(res => {this.props.history.push("/account");})
        console.log(this.state)
    }

    handleProfileCancel(event){
        event.preventDefault();
        this.setState({
            page: !this.state.page
          });
        console.log(this.baseState)
    }
    
  render() {
    const {page} = this.state;


    const ColoredLine = ({ color }) => (
        <hr
            style={{
                color: color,
                backgroundColor: color,
                height: 2
            }}
        />
    );

    // MAPPINGS - In Edit: Form - url and hackathons, Keys - edit with 1-10 dropdown,  Adders
    // In View - Lists - view, Mapping - progress bar
    const SocialMedia = ({vals}) => (
        <div>
            {
            vals.map((item) => ( 
        <SocialIcon url={item} style={{ height: 35, width: 35}}/>
            ))
            }
        </div>
    );

    const MappingFormURL = ({vals}) => (
        <div>
        {
            vals.map((item) => ( 
                <div>
                <Form.Control placeholder={item} type="text" as="input"
                name={item}
                value={item}
                onChange={this.handleProfileChange} />
                <Button variant="danger" onClick={() => this.handleRemoveURLForm(item)}>-</Button>
                </div>           
            ))
        }
        </div>
    )


    const MappingList = ({vals}) => (
        <div>
        {
            vals.map((item, index) => ( 
            <p>{index+1}. {item}</p> 
            ))
        }
        </div>
    )

    const Mapping = ({vals}) => (
            <div>
            {

            vals.map((item, index) => ( 
                <p key={index}> {index+1}. {item.name} <ProgressBar now={item.skill} label={`${item.skill}/10`} max={10}/></p> 
                ))
            }
            </div>
    )

    const MappingKeysLANG = ({vals}) => (
        
        <div className="right">
        {
            vals.map((item, index) => ( 
            <p key={index}> 
                <Form.Group className="form-inline">
                <Form.Label>{index+1}. </Form.Label>
                {/* <Form.Control as="select" name={`languages-${index}`} id={`languages-${index}`} data-id={index}
                            value={vals[index].name} onChange={this.handleLANGChange} className="name">
                    <option>{item.name}</option>
                    <option>other</option>
                    <option>another</option>
                </Form.Control> */}
                
                <input type="text" name={`languages-${index}`} id={`languages-${index}`} data-id={index}
                            value={vals[index].name} onChange={this.handleLANGChange.bind(this,index)} className="name"></input>
                
                <Form.Control as="select" >
                    <option>{item.skill}</option>
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
            </p>
            
            ))
        }
        </div>
    )

    const MappingKeysTECH = ({vals}) => (
        
        <div className="right">
        {
            vals.map((item, index) => ( 
            <p key={index}> 
                <Form.Group className="form-inline">
                <Form.Label>{index+1}.</Form.Label>
                <Form.Control as="select" >
                    <option>{item.name}</option>
                    <option>other</option>
                    <option>another</option>
                </Form.Control>
                <Form.Control as="select" >
                    <option>{item.skill}</option>
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
            </p>
            
            ))
        }
        </div>
    )

    // const MappingKeysINTEREST = ({vals}) => (
        
    //     <div className="right">
    //     {
    //                     this.state.interests.map((interests, index)=> {
    //                         return (
    //                         <div key={index}>
    //                             <Form.Control
    //                             type="text"
    //                             onChange= {(e) => this.handleINTChange(e, index)}
    //                             id={interests}
    //                             value={interests} 
    //                             className="name"
    //                             />
    //                         </div>
    //                         )
    //                     })
    //     }
    //     </div>
    // )

    // const MappingKeysFIELD = ({vals}) => (
        
    //     <div className="right">
    //     {
    //         vals.map((item, index) => ( 
    //         <p key={index}> 
    //             <Form.Group className="form-inline">
    //             <Form.Label>{index+1}.</Form.Label>
    //             <Form.Control as="select" >
    //                 <option>{item}</option>
    //                 <option>other</option>
    //                 <option>another</option>
    //             </Form.Control>
    //             <Button variant="danger" onClick={() => this.handleRemoveFIELDForm(index)}>-</Button>
    //             </Form.Group>
    //         </p>
            
    //         ))
    //     }
    //     </div>
    // )

    // This is default
    if (page === true) {

        return (
            
        <div className="account">
              {console.log(this.state) } 
        <Container className="boxes">      
            <Row >
                <Col className="info" sm={4}>
                    {/* <div className="accent">Interests</div> */}
                    <img
                        alt="propic"
                        src={require("./assets/favicon.jpg")}
                        className="avatar"
                    />
                    <h1 >{this.state.username}</h1>
                    <SocialMedia vals={this.state.url}/>
                    <Button variant="primary" onClick = {this.handleClick}>Edit Profile</Button>
                    
                </Col>

                <Col className ="about">
                    <div className="texts">
                    <h4 className="left">Education:  {this.state.educationLvl}</h4><h4 className="right">Year: {this.state.year}</h4>​
                    <h3></h3>
                    <h4 className="left">Major:  {this.state.major}</h4><h4 className="right">School: {this.state.school}</h4>​
                    
                    <ColoredLine color="black"/>
                    
                        {this.state.about}
                    </div>
                    
                </Col>
            </Row>

            <Row>
                <Col sm={4}>
                    <Card className="center w-75">
                    <Card.Header><strong>Languages</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Mapping vals={this.state.languages}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Technologies</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <Mapping vals={this.state.tech}/>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Hackathons</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {this.state.hackathons}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col className="preferences">
                <div className="accent">Interests</div>
                    <MappingList vals={this.state.interests}/>
                </Col>
                <Col className="preferences">
                <div className="accent">Fields</div>
                <MappingList vals={this.state.fields}/>
                    
                </Col>
            </Row>
        </Container>

            <div className="bottom"></div>

    </div>
        );
    }
        // ***************************
        // EDIT PROFILE 
        // ***************************
    else if (page === false) {  // this is edit profile
        return (
            
            <div className="account">
                <Container className="boxes">      
                    <Row >
                        <Col className="info" sm={4}>
                            <img
                            alt="propic"
                            src={require("./assets/favicon.jpg")}
                            className="avatar"
                            />
                            <h1 >{this.state.username}</h1>
                            
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                    Upload
                                    </span>
                                </div>
                                <div className="custom-file">
                                    <form>
                                    <div class="form-group">
                                        <label for="exampleFormControlFile1"></label>
                                        <input type="file" class="form-control-file" id="exampleFormControlFile1"></input>
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </Col>

                            <Col className ="about">
                                <div className="texts">
                                <Form.Row>
                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Education Level: </Form.Label>
                                    <Form.Control as="select" name="educationLvl" value={this.state.educationLvl} onChange={this.handleProfileChange}>
                                        <option>{this.state.educationLvl}</option>
                                        <option>High School</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Graduation Year: </Form.Label>
                                    <Form.Control as="select" name="year" value={this.state.year} onChange={this.handleProfileChange}>
                                        <option>{this.state.year}</option>
                                        <option>2012</option>
                                    </Form.Control>
                                    </Form.Group>
                                </Form.Row>
                                
                                <Form.Row>
                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Label>Major: </Form.Label>
                                    <Form.Control as="select" name="major" value={this.state.major} onChange={this.handleProfileChange}>
                                        <option>{this.state.major}</option>
                                        <option>Business</option>
                                    </Form.Control>
                                    </Form.Group>

                                    <Form.Group as={Col}  className="form-inline">
                                        <Form.Label >School:</Form.Label>
                                            <Form.Control placeholder={this.state.school} 
                                            type="text"
                                            name="school"
                                            value={this.state.school} 
                                            onChange={this.handleProfileChange}/>
                                    </Form.Group>
                                </Form.Row>
                                <ColoredLine color="black"/>
                                
                                    <Form.Label >About: </Form.Label>
                                    <textarea className="form-control" rows="5"
                                    type="text"
                                    name="about"
                                    value={this.state.about} 
                                    onChange={this.handleProfileChange}
                                    >{this.state.about}</textarea>
                                
                             </div>
                
                                
                            </Col>
                        </Row>
            
            <Row>
                {/****************** SOCIAL MEDIA LANGUAGES FIELDS AND HACKATHONS */}
                
                <Col sm={4}>
                    <Card className="center w-75">
                    <Card.Header><strong>Social Media</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                
                                    {
                                    this.state.url.map((url, index)=> {
                                        return (
                                        <div key={index}>
                                            <Form.Group className="form-inline">
                                            <Form.Label>{index+1}.</Form.Label>
                                            <Form.Control
                                            type="text"
                                            placeholder="Linkedin, Github, etc."
                                            onChange= {(e) => this.handleURLChange(e, index)}
                                            id={url}
                                            value={url} 
                                            className="name"
                                            />
                                            
                                            <Button variant="danger" onClick={() => this.handleRemoveURLForm(index)}>-</Button>
                                            </Form.Group>
                                        </div>
                                        )
                                    })
                                    }


                                <br></br>
                            
                            <Button variant="outline-primary" onClick={this.handleSocial}>Add Link</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br></br>

                    <Card className="center w-75">
                    <Card.Header><strong>Languages</strong> <span>(max 5)</span></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {
                                    this.state.languages.map((languages, index)=> {
                                        return (
                                        <div key={index}>
                                            <Form.Group className="form-inline">
                                            <Form.Label>{index+1}.</Form.Label>
                                            <Form.Control
                                            as="select"
                                            type="text"
                                            onChange= {(e) => this.handleLANGChange(e, index)}
                                            id={languages.name}
                                            value={languages.name} 
                                            className="name"
                                            >
                                                <option>{languages.name}</option>
                                                <option>other</option>
                                                <option>another</option>
                                            </Form.Control>
                                            <Form.Control
                                            as="select"
                                            type="text"
                                            onChange= {(e) => this.handleLANG2Change(e, index)}
                                            id={languages.skill}
                                            value={languages.skill} 
                                            className="name"
                                            >
                                                <option>{languages.skill}</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </Form.Control>
                                            
                                            <Button variant="danger" onClick={() => this.handleRemoveLANGForm(index)}>-</Button>
                                            </Form.Group>
                                        </div>
                                        )
                                    })
                                    }
                            <Button variant="outline-primary" onClick={this.handleLangAdder}>Add Languages</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Technologies</strong> <span>(max 5)</span></Card.Header>
                        <Card.Body>
                            <Card.Text>
                            {
                                this.state.tech.map((tech, index)=> {
                                    return (
                                    <div key={index}>
                                        <Form.Group className="form-inline">
                                        <Form.Label>{index+1}.</Form.Label>
                                        <Form.Control
                                        as="select"
                                        type="text"
                                        onChange= {(e) => this.handleTECHChange(e, index)}
                                        id={tech.name}
                                        value={tech.name} 
                                        className="name"
                                        >
                                            <option>{tech.name}</option>
                                            <option>other</option>
                                            <option>another</option>
                                        </Form.Control>
                                        <Form.Control
                                        as="select"
                                        type="text"
                                        onChange= {(e) => this.handleTECH2Change(e, index)}
                                        id={tech.skill}
                                        value={tech.skill} 
                                        className="name"
                                        >
                                            <option>{tech.skill}</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </Form.Control>
                                        
                                        <Button variant="danger" onClick={() => this.handleRemoveTECHForm(index)}>-</Button>
                                        </Form.Group>
                                    </div>
                                    )
                                })
                                }
                        
                            <Button variant="outline-primary" onClick={this.handleTechAdder}>Add Technologies</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <br></br>
                    <Card className="center w-75">
                    <Card.Header><strong>Hackathons</strong></Card.Header>
                        <Card.Body>
                            <Card.Text>
                                    <Form.Group as={Col} className="form-inline">
                                    <Form.Control as="select" name="hackathons" value={this.state.hackathons} onChange={this.handleProfileChange}>
                                        <option>{this.state.hackathons}</option>
                                        <option>1</option>
                                        <option>3</option>
                                        <option>5</option>
                                    </Form.Control>
                                    </Form.Group>
                            <br></br>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    
                </Col>

                <Col className="preferences">
                <div className="accent">Interests <span>(max 5)</span></div>
                    {
                        this.state.interests.map((interests, index)=> {
                            return (
                            <div key={index}>
                                <Form.Group className="form-inline">
                                <Form.Label>{index+1}.</Form.Label>
                                <Form.Control
                                as="select"
                                type="text"
                                onChange= {(e) => this.handleINTChange(e, index)}
                                id={interests}
                                value={interests} 
                                className="name"
                                >
                                    <option>{interests}</option>
                                    <option>other</option>
                                    <option>another</option>
                                </Form.Control>
                                
                                <Button variant="danger" onClick={() => this.handleRemoveINTERESTForm(index)}>-</Button>
                                </Form.Group>
                            </div>
                            )
                        })
                        }

                    <br/>
                    <Button variant="outline-primary" onClick={this.handleInterestAdder}>Add Interest</Button>
                </Col>

                <Col className="preferences">
                <div className="accent">Fields <span>(max 5)</span></div>  
                    {
                        this.state.fields.map((fields, index)=> {
                            return (
                            <div key={index}>
                                <Form.Group className="form-inline">
                                <Form.Label>{index+1}.</Form.Label>
                                <Form.Control
                                as="select"
                                type="text"
                                onChange= {(e) => this.handleFIELDChange(e, index)}
                                id={fields}
                                value={fields} 
                                className="name"
                                >
                                    <option>{fields}</option>
                                    <option>other</option>
                                    <option>another</option>
                                </Form.Control>
                                
                                <Button variant="danger" onClick={() => this.handleRemoveFIELDForm(index)}>-</Button>
                                </Form.Group>
                            </div>
                            )
                        })
                        }


                    <br/>
                    <Button variant="outline-primary" onClick={this.handleFieldAdder}>Add Fields</Button>

                </Col>
            </Row>

            <Row>
                <Col >
                    <br/>
                    <Button variant="failure" onClick = {this.handleProfileCancel}>Cancel</Button>
                    <Button variant="success" onClick = {this.handleProfileSubmit}>Update Profile</Button>
                </Col>
            </Row>

            <Row>
                <Col >
                    <br/>
                    <ColoredLine color="blue"/>
                </Col>
            </Row>

            <Row>
                <Col >
                    <div >
                        <UpdatePassword />
                    </div>
                </Col>
                
                <Col >
                    <div >
                        <DeleteAccount />
                    </div>
                </Col>
            </Row>

        </Container>

        <div className="bottom">
            
        </div>
        </div>
            
    );
    }
    }
}

export default withRouter(Account1);