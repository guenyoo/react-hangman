import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words';

const initialGameState = {
  nWrong: 0,
  guessed: new Set([]),
  answer: randomWord(),
};

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = initialGameState;
    this.handleGuess = this.handleGuess.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  restartGame() {
    initialGameState.guessed.clear();
    this.setState(initialGameState);
  }

  /** render: render game */
  render() {
    const isLost = this.state.nWrong >= 6;
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[isLost ? 6 : this.state.nWrong]} alt={`${this.state.nWrong} Guesses wrong so far`}/>
        <p className='Hangman-word'>
          {isLost ? this.state.answer : this.guessedWord()}
        </p>
        <p className="Hangman-wrong">
          Wrong answers: {this.state.nWrong}
        </p>
        <p className='Hangman-btns'>
          {isLost ? 'You Lost!' : this.generateButtons()}
        </p>
        {isLost && <button className="Hangman-restart" onClick={this.restartGame}>Restart game</button>}
      </div>
    );
  }
}

export default Hangman;
