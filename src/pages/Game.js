import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { updateScoreAction } from '../redux/actions';
import { fetchQuestionsTrivia, fetchQuestionsWithPreferences } from '../services';
import './Game.css';

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      index: 0,
      randomAnswers: [],
      correctId: 'correct',
      wrongId: 'wrong',
      isAnswersDisabled: false,
      counter: 30,
      isButtonShow: false,
      intervalId: '',
    };
    this.getQuestions = this.getQuestions.bind(this);
    this.setQuestionsinState = this.setQuestionsinState.bind(this);
    this.createRandomArray = this.createRandomArray.bind(this);
    this.handleClickAnswer = this.handleClickAnswer.bind(this);
    this.setAnswerAsWrong = this.setAnswerAsWrong.bind(this);
    this.setTimeLimitToAnswer = this.setTimeLimitToAnswer.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
    this.renderCounter = this.renderCounter.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
    this.setTimeLimitToAnswer();
  }

  setQuestionsinState(results) {
    const { index } = this.state;
    this.setState({
      questions: results,
    });
    const { correct_answer: correct,
      incorrect_answers: incorrects } = results[index];
    this.createRandomArray(correct, incorrects);
  }

  async getQuestions() {
    const token = localStorage.getItem('token');
    const { category, difficulty, type } = this.props;
    if (category !== '' || difficulty !== '' || type !== '') {
      const { results } = (
        await fetchQuestionsWithPreferences(category, difficulty, type, token));
      this.setQuestionsinState(results);
    } else {
      const { results } = await fetchQuestionsTrivia(token);
      this.setQuestionsinState(results);
    }
  }

  setAnswerAsWrong() {
    this.setState({ isAnswersDisabled: true, isButtonShow: true });
  }

  setTimeLimitToAnswer() {
    const SECOND = 1000;
    const intervalId = setInterval(() => {
      this.setState((current) => ({
        counter: current.counter > 0 ? current.counter - 1 : 0,
      }), () => {
        const { counter } = this.state;
        if (counter === 0) {
          this.setAnswerAsWrong();
        }
      });
    }, SECOND);
    this.setState({ intervalId });
  }

  createRandomArray(correctAnswer, incorrectAnswers) {
    const answers = [
      { text: correctAnswer, type: 'correct' },
      ...(incorrectAnswers
        .map((answer, index) => ({ text: answer, type: 'wrong', index }))),
    ];
    const CHANGE_INDEX = -1;
    const CONTROL_PROBABILITY = 0.5;
    // Código baseado no link: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array resposta do usuário yuval.bl
    const randomArray = answers.sort(() => (Math.random() > CONTROL_PROBABILITY
      ? 1
      : CHANGE_INDEX));
    this.setState({ randomAnswers: randomArray });
  }

  handleClickAnswer({ currentTarget }) {
    const points = { hard: 3, medium: 2, easy: 1 };
    const { questions, index, counter } = this.state;
    const { difficulty } = questions[index];
    const { id } = currentTarget;
    const { player } = JSON.parse(localStorage.getItem('state'));
    if (id === 'correct') {
      const BASE_SCORE = 10;
      const currentScore = player.score + BASE_SCORE + (counter * points[difficulty]);
      const currentAssertions = player.assertions + 1;
      const scoreStorage = JSON.stringify({ player: { ...player,
        score: currentScore,
        assertions: currentAssertions } });
      localStorage.setItem('state', scoreStorage);
      const { updateScore } = this.props;
      updateScore(currentScore);
    }
    this.setState({
      correctId: 'correct-answered',
      wrongId: 'wrong-answered',
      isButtonShow: true,
    });
  }

  returnNextButton() {
    return (
      <Button
        variant="contained"
        color="primary"
        onClick={ this.handleClickNext }
      >
        Próxima pergunta
      </Button>
    );
  }

  handleClickNext() {
    const { index, intervalId } = this.state;
    const { history } = this.props;
    const LAST_QUESTION = 4;
    if (index === LAST_QUESTION) {
      history.push('/feedback');
    } else {
      this.setState({
        index: index + 1,
        correctId: 'correct',
        wrongId: 'wrong',
        counter: 30,
        isButtonShow: false,
        isAnswersDisabled: false,
      }, () => {
        const { index: index2, questions } = this.state;
        const { correct_answer: correct,
          incorrect_answers: incorrects } = questions[index2];
        this.createRandomArray(correct, incorrects);
        this.setTimeLimitToAnswer();
      });
    }
    clearInterval(intervalId);
  }

  renderCounter() {
    const { counter } = this.state;
    const SECONDS_TO_PERCENTAGE = 3.33;
    return (
      <div className="counter-container">
        <LinearProgress
          variant="determinate"
          color="secondary"
          value={ counter * SECONDS_TO_PERCENTAGE }
        />
        <Typography
          variant="h5"
          color="secondary"
          id="counter-text"
        >
          {counter}
        </Typography>
      </div>
    );
  }

  render() {
    const {
      questions,
      index,
      randomAnswers,
      correctId,
      wrongId,
      isAnswersDisabled,
      isButtonShow,
    } = this.state;
    return (
      <div className="game-page-container">
        { questions.length > 0
        && (
          <>
            { this.renderCounter() }
            <Typography variant="overline" id="question-category">
              Categoria:
              { ` ${questions[index].category}` }
            </Typography>
            <div className="questions-container">
              <Typography variant="body1">
                { questions[index].question
                  .replace(/&quot;/g, '"').replace(/&#039;/g, '\'') }
              </Typography>
              <div className="buttons-container">
                <ButtonGroup variant="contained" size="small">
                  {randomAnswers.map((answer) => (
                    <Button
                      key={ answer.text }
                      id={ answer.type === 'correct' ? correctId : wrongId }
                      onClick={ this.handleClickAnswer }
                      disabled={ isAnswersDisabled }
                    >
                      { answer.text.replace(/&quot;/g, '"') }
                    </Button>
                  ))}
                </ButtonGroup>
              </div>
            </div>
            { isButtonShow && this.returnNextButton() }
          </>
        )}
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  updateScore: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  difficulty: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const mapStateToProps = ({ game }) => ({
  category: game.category,
  difficulty: game.difficulty,
  type: game.type,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score) => dispatch(updateScoreAction(score)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
