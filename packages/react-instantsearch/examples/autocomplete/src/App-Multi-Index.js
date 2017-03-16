import React from 'react';
import {InstantSearch, Configure, Index} from 'react-instantsearch/dom';
import {connectAutoComplete} from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';
import 'react-instantsearch-theme-algolia/style.css';

const App = () =>
  <InstantSearch
    appId="latency"
    apiKey="6be0576ff61c053d5f9a3225e2a90f76"
    indexName="ikea">
    <AutoComplete />
    <Configure hitsPerPage={1} />
    <Index indexName="bestbuy">
      <VirtualAutoComplete />
    </Index>
    <Index indexName="airbnb">
      <VirtualAutoComplete />
    </Index>
  </InstantSearch >;

const VirtualAutoComplete = connectAutoComplete(() => null);

const AutoComplete = connectAutoComplete(({hits, query, refine}) => <Autosuggest
  suggestions={hits}
  multiSection={true}
  onSuggestionsFetchRequested={({value}) => refine(value)}
  onSuggestionsClearRequested={() => refine('')}
  getSuggestionValue={hit => hit.name}
  renderSuggestion={hit =>
    <div>
      <div>{hit.name}</div>
    </div>
  }
  inputProps={{
    placeholder: 'Type a product',
    value: query,
    onChange: () => {
    },
  }}
  renderSectionTitle={section => section.index}
  getSectionSuggestions={section => section.hits}
/>);

export default App;

