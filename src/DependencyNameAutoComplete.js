import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { throttle, debounce } from "throttle-debounce";

function renderInputComponent(inputProps) {
  const { classes, inputRef = () => {}, ref, ...other } = inputProps;

  return (
    <TextField
      fullWidth
      InputProps={{
        inputRef: node => {
          ref(node);
          inputRef(node);
        },
        classes: {
          input: classes.input,
        },
      }}
      {...other}
    />
  );
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
  const matches = match(suggestion, query);
  const parts = parse(suggestion, matches);

  return (
    <MenuItem selected={isHighlighted} component="div">
      <div>
        {parts.map((part, index) =>
          part.highlight ? (
            <span key={String(index)} style={{ fontWeight: 500 }}>
              {part.text}
            </span>
          ) : (
            <strong key={String(index)} style={{ fontWeight: 300 }}>
              {part.text}
            </strong>
          ),
        )}
      </div>
    </MenuItem>
  );
}

function getSuggestionValue(suggestion) {
  console.log('Suggestion picked!')
  return suggestion;
}

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  container: {
    position: 'relative',
  },
  suggestionsContainerOpen: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  suggestion: {
    display: 'block',
  },
  suggestionsList: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
});

class IntegrationAutosuggest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        single: props.initialValue || '',
        suggestions: [],
    };

    this.autoCompleteSearchThrottled = throttle(500, this.autoCompleteSearch);
    this.autoCompleteSearchDebounced = debounce(500, this.autoCompleteSearch);
  }

  autoCompleteSearch = async (inputValue) => {
    const inputLength = inputValue.length;
    let suggestionsKept = 0;

    const response = await axios.get(`${window._env_.API_URL}/api/dependencies/names?nameRegex=${inputValue}`)
    
    // Only proces the results this was the latest request
    if (this.lastSearchValue === inputValue) {
      
      let suggestions = inputLength === 0
      ? []
      // If there were matches returned filter out all by the first few suggestions
      : response.data.filter(suggestion => {
          const keepSuggestion = suggestionsKept < 5;

          if (keepSuggestion) {
            suggestionsKept += 1;
          }

          return keepSuggestion;
        });

      this.setState({
        suggestions: suggestions,
      });
    }
  }

  handleSuggestionsFetchRequested = async ({ value }) => {
    const inputValue = deburr(value.trim()).toLowerCase();

    this.lastSearchValue = inputValue;

    // Throttle at the start to show some results so users knows things are working
    // debounce after that to reduce the quanity of requests
    if(inputValue.length < 5){
      await this.autoCompleteSearchThrottled(inputValue);
    } else {
      await this.autoCompleteSearchDebounced(inputValue);
    }
  };

  handleSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  handleChange = name => (event, { newValue }) => {
    this.setState({
      [name]: newValue,
    });
  };

  handleSuggestionSelected = (_event, data) =>{
      console.log(`Suggestion selected! ${data.suggestion}`);
      this.props.onDependencySelected(data.suggestion);
  } 

  render() {
    const { classes } = this.props;

    const autosuggestProps = {
      renderInputComponent,
      suggestions: this.state.suggestions,
      onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
      onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
      getSuggestionValue,
      renderSuggestion,
      onSuggestionSelected: this.handleSuggestionSelected
    };

    return (
      <div className={classes.root}>
        <Autosuggest
          {...autosuggestProps}
          inputProps={{
            classes,
            placeholder: 'Enter your dependency name (case sensitive)',
            value: this.state.single,
            onChange: this.handleChange('single'),
          }}
          theme={{
            container: classes.container,
            suggestionsContainerOpen: classes.suggestionsContainerOpen,
            suggestionsList: classes.suggestionsList,
            suggestion: classes.suggestion,
          }}
          renderSuggestionsContainer={options => (
          
            <Paper {...options.containerProps} square>
              {options.children}
            </Paper>
          )}
        />
      </div>
    );
  }
}

IntegrationAutosuggest.propTypes = {
  initialValue: PropTypes.string,
  classes: PropTypes.object.isRequired,
  onDependencySelected: PropTypes.func.isRequired
};

export default withStyles(styles)(IntegrationAutosuggest);