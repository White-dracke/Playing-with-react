import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';
import './bootstrap.min.css';
import PropTypes from 'prop-types';

function Hero() {
    return (
        <div className="row">
            <div className="jumbotron col-10 offset-1">
                <h1>Author Quiz</h1>
                <p>Select the book written by the author shown</p>
            </div>
        </div>
    );
}

function Book({title, onClick}) {
  return (<div className="answer" onClick={() => {onClick(title);}}>
    <h4>{title}</h4>
  </div>)
} 

Book.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

function Turn({author, books, highlight, onAnswerSelected}) {
    function highlightToBgColor(highlight) {
        const mapping = {
            'none' : '',
            'correct' : 'green',
            'wrong' : 'red',
        };
        return mapping[highlight];
    }

    return (
        <div
            className="row turn"
            style={{
            backgroundColor: highlightToBgColor(highlight)
        }}>
            <div className="col-4 offset-1">
                <img src={author.imageUrl} className="authorimage" alt="Author"/>
            </div>
            <div className="col-6">
                {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected} />)}
            </div>
        </div>
    );
}

Turn.propTypes = {
  author: PropTypes.shape({
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      imageSource: PropTypes.string.isRequired,
      books: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  books: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlight: PropTypes.string.isRequired,
  onAnswerSelected: PropTypes.func.isRequired,
};

function Continue({ show, onContinue}) {
    return (
    <div className="row continue">
    { show ? <div className="col-11">
        <button className="btn btn-primary btn-lg float right" onClick={onContinue}>Continue</button>
        </div>
        : null
    }
    </div>);
}

Continue.propTypes = {
    show: PropTypes.bool.isRequired,
    onContinue: PropTypes.func.isRequired,
}

function Footer() {
    return (
        <div id="footer" className="row">
            <div className="col-12">
                <p className="text-muted credot">
                    All images are from &nbsp;<a href="https://commons.wikimedia.org/wiki/Main_Page">Wikimedia Commons</a>&nbsp; and are in the public domain
                </p>
            </div>
        </div>
    );
}

function AuthorQuiz({turnData, highlight, onAnswerSelected, onContinue}) {
    return (
        <div className="container-fluid">
            <Hero/>
            <Turn {...turnData} highlight={highlight} onAnswerSelected={onAnswerSelected} />
            <Continue show={highlight === 'correct'} onContinue={onContinue}/>
            <p><Link to="/add">Add an author</Link></p>
            <Footer/>
        </div>
    );
}

AuthorQuiz.propTypes = {
  turnData: PropTypes.object,
  highlight: PropTypes.string,
  onAnswerSelected: PropTypes.func,
  onContinue: PropTypes.func
};

export default AuthorQuiz;
