import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusSquare, faSave, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Film extends Component {

    initialState = {id:'', title:'', year:'', genre:'', watched:'' };

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.filmChange = this.filmChange.bind(this);
        this.submitFilm = this.submitFilm.bind(this);

    };

    componentDidMount() {
        const filmId = +this.props.match.params.id;
        if(filmId) {
            this.findFilmById(filmId)
        }
    };

    findFilmById = filmId => {
        axios.get("http://localhost:8080/films/"+filmId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        title: response.data.title,
                        year: response.data.year,
                        genre: response.data.genre,
                        watched: response.data.watched
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });
    }

    resetFilm = () => {
        this.setState(() => this.initialState);
    };

    submitFilm = event => {
        event.preventDefault();

        const film = {
          title: this.state.title,
          year: this.state.year,
          genre: this.state.genre,
          watched: this.state.watched
        };

        axios.post("http://localhost:8080/films", film)
            .then(response => {
                if(response.data != null) {
                    this.setState({show: true, method: "post"});
                    setTimeout(()=>this.setState({show:false}), 3000);
                }
                else
                {
                    this.setState({show: false});
                }
            });
    };

    updateFilm = event => {
        event.preventDefault();

                const film = {
                  id: this.state.id,
                  title: this.state.title,
                  year: this.state.year,
                  genre: this.state.genre,
                  watched: this.state.watched
                };

                axios.put("http://localhost:8080/films", film)
                    .then(response => {
                        if(response.data != null) {
                            this.setState({show: true, method: "put"});
                            setTimeout(()=>this.setState({show:false}), 3000);
                            setTimeout(()=>this.filmList(), 3000);
                        }
                        else
                        {
                            this.setState({show: false});
                        }
                    });
    };

    filmChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    filmList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {title, year, genre, watched} = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "Film Updated Successfully." : "Film Saved Successfully."} type={"success"}/>
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        <FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare}/> {this.state.id ? "Update Film" : "Add New Film"}
                    </Card.Header>
                    <Form onReset={this.resetFilm} onSubmit={this.state.id ? this.updateFilm : this.submitFilm} id="filmFormId">
                        <Card.Body>
                              <Form.Row>
                                  <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="title"
                                        value={title}
                                        onChange={this.filmChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Title" />
                                  </Form.Group>
                                  <Form.Group as={Col} controlId="formGridYear">
                                    <Form.Label>Year</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="year"
                                        value={year}
                                        onChange={this.filmChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Year" />
                                  </Form.Group>
                              </Form.Row>
                              <Form.Row>
                                  <Form.Group as={Col} controlId="formGridGenre">
                                    <Form.Label>Genre</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="genre"
                                        value={genre}
                                        onChange={this.filmChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Genre" />
                                  </Form.Group>
                                  <Form.Group as={Col} controlId="formGridWatched">
                                    <Form.Label>Watched</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="text" name="watched"
                                        value={watched}
                                        onChange={this.filmChange}
                                        className="bg-dark text-white"
                                        placeholder="Enter Watched" />
                                  </Form.Group>
                              </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave}/> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo}/> Reset
                            </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.filmList.bind()}>
                                <FontAwesomeIcon icon={faList}/> Film List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}