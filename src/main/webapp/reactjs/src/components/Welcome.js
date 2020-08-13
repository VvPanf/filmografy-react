import React, {Component} from 'react';

import {Jumbotron} from 'react-bootstrap';

export default class Welcome extends Component {
    render () {
        return (
            <Jumbotron className="bg-dark text-white">
              <h1>Welcome to Filmography!</h1>
              <blockquote className="blockquote mb-0">
                  <p>
                        When people ask me if I went to film school I tell them, ‘no, I went to films’.
                  </p>
                  <footer className="blockquote-footer">
                    Quentin Tarantino
                  </footer>
              </blockquote>
            </Jumbotron>
        );
    }
}