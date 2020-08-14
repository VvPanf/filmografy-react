import React, {Component} from 'react';

import {Card, Table, ButtonGroup, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class FilmList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            films : []
        };
    };

    componentDidMount() {
        this.findAllBooks()
    };

    findAllBooks = () => {
        axios.get("http://localhost:8080/films")
                    .then(response => response.data)
                    .then((data) => {
                        this.setState({films: data});
                    });
    };

    deleteFilm = (filmId) => {
        axios.delete("http://localhost:8080/films/" + filmId)
            .then(response => {
                if(response.data != null) {
                    this.setState({show: true});
                    setTimeout(()=>this.setState({show:false}), 3000);
                    this.setState({
                        films: this.state.films.filter(film => film.id !== filmId)
                    });
                }
                else
                {
                    this.setState({show: false});
                }
            });
    };

    render() {
        return (
        <div>
            <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show={this.state.show} message={"Film Deleted Successfully."} type={"danger"}/>
            </div>
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList}/> Film List</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Year</th>
                                    <th>Genre</th>
                                    <th>Watched</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.films.length === 0
                                ?
                                    <tr align="center">
                                        <td colSpan="6">No Films Available.</td>
                                    </tr>
                                :
                                this.state.films.map((film) => (
                                    <tr key={film.id}>
                                        <td>{film.title}</td>
                                        <td>{film.year}</td>
                                        <td>{film.genre}</td>
                                        <td>{film.watched?"+":"-"}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+film.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteFilm.bind(this, film.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}