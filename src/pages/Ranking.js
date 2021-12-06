import React from 'react';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import PropTypes from 'prop-types';
import './Ranking.css';

class Ranking extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ranking: [],
    };

    this.getRanking = this.getRanking.bind(this);
  }

  componentDidMount() {
    this.getRanking();
  }

  getRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const sortedRanking = this.rankingSorter(ranking);
    this.setState({
      ranking: sortedRanking,
    });
  }

  rankingSorter(ranking) {
    return ranking.sort((a, b) => b.score - a.score);
  }

  render() {
    const { ranking } = this.state;
    const { history } = this.props;
    return (
      <div>
        <Typography variant="h3" component="h1" className="ranking-title">
          Ranking
        </Typography>
        <List id="ranking-container">
          { ranking.map((person, index) => (
            <ListItem
              key={ index }
              className="ranking-person"
              divider
            >
              <Avatar
                src={ person.picture }
                alt="ranking person"
              />
              <Typography variant="h6" component="p" className="ranking-person-name">
                { person.name }
              </Typography>
              <Typography
                variant="h6"
                component="p"
                color="primary"
              >
                {person.score}
              </Typography>
              <Typography variant="body">
                { person.score === 1 ? 'ponto' : 'pontos' }
              </Typography>
            </ListItem>
          )) }
          <Button
            variant="contained"
            color="primary"
            onClick={ () => history.push('/') }
            id="play-again-button"
          >
            Jogar Novamente
            <ReplayRoundedIcon />
          </Button>
        </List>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.func,
    PropTypes.object,
  ])).isRequired,
};

export default Ranking;
