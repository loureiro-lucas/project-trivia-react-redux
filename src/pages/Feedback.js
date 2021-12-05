import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import './Feedback.css';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      assertions: 0,
      score: 0,
    };
    this.restorePlayer = this.restorePlayer.bind(this);
  }

  componentDidMount() {
    this.restorePlayer();
    this.setRanking();
  }

  setRanking() {
    const { userName, urlImage, score } = this.props;
    const currentRanking = localStorage.getItem('ranking');
    const newRankingEntry = { name: userName, score, picture: urlImage };
    if (currentRanking === null) {
      localStorage.setItem('ranking', JSON.stringify([newRankingEntry]));
    } else {
      const currentRankingArray = JSON.parse(currentRanking);
      const newRanking = [...currentRankingArray, newRankingEntry];
      localStorage.setItem('ranking', JSON.stringify(newRanking));
    }
  }

  restorePlayer() {
    const { player } = JSON.parse(localStorage.getItem('state'));
    this.setState({ score: player.score, assertions: player.assertions });
  }

  returnFeedback(phrase) {
    const { score, assertions } = this.state;
    const { history } = this.props;
    return (
      <div className="feedback-inside-container">
        <Typography
          variant="h6"
        >
          { phrase }
        </Typography>
        <Typography
          variant="subtitle1"
          className="score-feedback"
        >
          { `Você acertou ${assertions} ${assertions === 1 ? 'questão' : 'questões'},` }
          <br />
          { ` um total de ${score} ${score === 1 ? 'ponto' : 'pontos'}!` }
        </Typography>
        <ButtonGroup
          variant="contained"
        >
          <Button
            color="primary"
            onClick={ () => history.push('/ranking') }
            id="open-ranking-button"
          >
            Ver Ranking
            <FormatListNumberedRoundedIcon />
          </Button>
          <Button
            color="primary"
            onClick={ () => history.push('/') }
            id="play-again-btn"
          >
            Jogar Novamente
            <ReplayRoundedIcon />
          </Button>
        </ButtonGroup>
      </div>
    );
  }

  render() {
    const MIN_QUESTIONS = 3;
    const { assertions } = this.state;
    return (
      <div className="feedback-container">
        { assertions < MIN_QUESTIONS
          ? (
            this.returnFeedback('Podia ser melhor...')
          )
          : (
            this.returnFeedback('Mandou bem!')
          )}
      </div>
    );
  }
}

const mapStateToProps = ({ game: { userName, urlImage, score } }) => ({
  userName,
  urlImage,
  score,
});

Feedback.propTypes = {
  userName: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
  ])).isRequired,
};

export default connect(mapStateToProps)(Feedback);
