import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { saveGravatarUrlImage, saveUserName } from '../redux/actions';
import { getGravatarImage } from '../services';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.handleGravatarImage = this.handleGravatarImage.bind(this);
  }

  componentDidMount() {
    this.handleGravatarImage();
  }

  handleGravatarImage() {
    const getStateStorage = JSON.parse(localStorage.getItem('state'));
    const { player: { gravatarEmail, name } } = getStateStorage;
    const urlImage = getGravatarImage(gravatarEmail);
    const { urlGravatarImage, saveName } = this.props;
    urlGravatarImage(urlImage);
    saveName(name);
  }

  render() {
    const { urlImage, userName, score, styleClass } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Avatar
            src={ urlImage }
            alt="profile-img"
          />
          <Typography variant="h6" className={ styleClass }>
            { userName }
          </Typography>
          <Typography>
            { score }
            {' '}
            pontos!
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = ({ game: { score, urlImage, userName } }) => ({
  score,
  urlImage,
  userName,
});

const mapDispatchToProps = (dispatch) => ({
  urlGravatarImage: (url) => dispatch(saveGravatarUrlImage(url)),
  saveName: (name) => dispatch(saveUserName(name)),
});

Header.propTypes = {
  score: PropTypes.number.isRequired,
  urlImage: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  urlGravatarImage: PropTypes.func.isRequired,
  saveName: PropTypes.func.isRequired,
  styleClass: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
