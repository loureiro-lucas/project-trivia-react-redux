import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core//TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SettingsIcon from '@material-ui/icons/Settings';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { fetchTokenTrivia } from '../services';
import { resetUserData } from '../redux/actions';
import './Login.css';
import logo from '../trivia.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      nameError: false,
      emailError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSettings = this.handleSettings.bind(this);
    this.renderInputs = this.renderInputs.bind(this);
  }

  componentDidMount() {
    const { resetUser } = this.props;
    resetUser();
  }

  validateForm() {
    const { name, email } = this.state;
    this.setState({
      nameError: false,
      emailError: false,
    });

    if (name.length === 0) {
      this.setState({ nameError: true });
    }
    if (email.length === 0) {
      this.setState({ emailError: true });
    }
    if (name && email) {
      return true;
    } return false;
  }

  handleChange({ target: { name, value } }) {
    this.setState({
      [name]: value,
    });
  }

  handleSettings() {
    const { history } = this.props;
    history.push('/settings');
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (this.validateForm()) {
      const token = await fetchTokenTrivia();
      localStorage.setItem('token', token);

      const { name, email: gravatarEmail } = this.state;
      const player = {
        player: {
          name,
          assertions: 0,
          score: 0,
          gravatarEmail,
        },
      };
      localStorage.setItem('state', JSON.stringify(player));

      const { history } = this.props;
      history.push('/game');
    }
  }

  renderInputs() {
    const { name, email, nameError, emailError } = this.state;
    return (
      <div className="login-inputs">
        <TextField
          id="input-player-name"
          name="name"
          label="Nome"
          variant="outlined"
          size="small"
          value={ name }
          onChange={ this.handleChange }
          error={ nameError }
          helperText={ nameError && 'Campo obrigatório' }
          required
        />
        <TextField
          id="input-gravatar-email"
          name="email"
          label="Email"
          variant="outlined"
          size="small"
          type="email"
          value={ email }
          onChange={ this.handleChange }
          error={ emailError }
          helperText={ emailError && 'Campo obrigatório' }
          required
        />
      </div>
    );
  }

  render() {
    return (
      <div className="login-form-container">
        <img src={ logo } alt="trivia-logo" className="login-logo" />

        <form
          noValidate
          onSubmit={ this.handleSubmit }
          className="login-form"
        >

          { this.renderInputs() }

          <div className="login-buttons">
            <ButtonGroup variant="contained">
              <Button
                type="submit"
                color="primary"
                endIcon={ <SportsEsportsIcon /> }
              >
                Jogar
              </Button>
              <Button
                color="secondary"
                onClick={ this.handleSettings }
                endIcon={ <SettingsIcon /> }
              >
                Configurações
              </Button>
            </ButtonGroup>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetUser: () => dispatch(resetUserData()),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  resetUser: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
