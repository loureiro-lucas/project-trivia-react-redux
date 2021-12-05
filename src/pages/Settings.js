import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import DoneIcon from '@material-ui/icons/Done';
import { getSettings } from '../redux/actions';
import { fetchCategories } from '../services';
import './Settings.css';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      category: '',
      difficulty: '',
      questionsType: '',
    };
    this.renderCategoriesOptions = this.renderCategoriesOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderCategoriesSelect = this.renderCategoriesSelect.bind(this);
    this.renderDifficultySelect = this.renderDifficultySelect.bind(this);
    this.renderTypeSelect = this.renderTypeSelect.bind(this);
  }

  componentDidMount() {
    this.renderCategoriesOptions();
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { category, difficulty, questionsType } = this.state;
    const { setPreferences } = this.props;
    setPreferences([category, difficulty, questionsType]);
    const { history } = this.props;
    history.push('/');
  }

  async renderCategoriesOptions() {
    const categories = await fetchCategories();
    this.setState({
      categories,
    });
  }

  renderCategoriesSelect() {
    const { categories, category } = this.state;
    return (
      <FormControl
        variant="outlined"
        size="small"
        fullWidth="true"
      >
        <InputLabel id="category">Categorias</InputLabel>
        <Select
          labelId="category"
          id="category-select"
          name="category"
          label="Categorias"
          value={ category }
          onChange={ this.handleChange }
        >
          <MenuItem value="">Todas</MenuItem>
          {categories.map(({ id, name }) => (
            <MenuItem key={ id } value={ id }>{ name }</MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  renderDifficultySelect() {
    const { difficulty } = this.state;
    return (
      <FormControl
        variant="outlined"
        size="small"
        fullWidth="true"
      >
        <InputLabel id="difficulty">Dificuldade</InputLabel>
        <Select
          labelId="difficulty"
          id="difficulty-select"
          name="difficulty"
          label="Dificuldade"
          value={ difficulty }
          onChange={ this.handleChange }
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
    );
  }

  renderTypeSelect() {
    const { questionsType } = this.state;
    return (
      <FormControl
        variant="outlined"
        size="small"
        fullWidth="true"
      >
        <InputLabel id="questionsType">Tipo de pergunta</InputLabel>
        <Select
          labelId="questionsType"
          id="questionsType-select"
          name="questionsType"
          label="Tipo de pergunta"
          value={ questionsType }
          onChange={ this.handleChange }
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="multiple">Múltipla escolha</MenuItem>
          <MenuItem value="boolean">Verdadeiro ou falso</MenuItem>
        </Select>
      </FormControl>
    );
  }

  render() {
    return (
      <div className="settings-container">
        <Typography variant="h4" component="h1">
          Configurações
        </Typography>
        <form
          noValidate
          onSubmit={ this.handleSubmit }
          className="settings-form"
        >
          { this.renderCategoriesSelect() }
          { this.renderDifficultySelect() }
          { this.renderTypeSelect() }
          <Button
            variant="contained"
            type="submit"
            color="primary"
            endIcon={ <DoneIcon /> }
          >
            Salvar
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setPreferences: (state) => dispatch(getSettings(state)),
});

Settings.propTypes = {
  setPreferences: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Settings);
