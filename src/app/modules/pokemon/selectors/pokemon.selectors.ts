import { PokemonListItem } from '../interfaces/pokemon-list-item';
import { createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokeState } from '../reducers/index';
import { State } from 'src/app/reducers';
import { Pokemon } from '../interfaces/pokemon';

export const selectPokemonState =
  createFeatureSelector<PokeState>('pokemonListState');

export const getCurrentPokemon = createSelector(
  selectPokemonState,
  (state) => state.currentPokemon
);
export const getFavoritePokemonList = createSelector(
  selectPokemonState,
  (state) => state.favoritePokemonList
);

export const getComparisonPokemon = createSelector(
  selectPokemonState,
  (state) => state.comparisonPokemon
);

export const getIsComparing = createSelector(
  selectPokemonState,
  (state) => !!state.isComparing
);

export const pokemonAdapter = createEntityAdapter<Pokemon>();
export const pokemonListAdapter = createEntityAdapter<PokemonListItem>();
export const selectEntityCache = createFeatureSelector<State>('entityCache');
export const { selectAll: selectAllPokemon } = pokemonAdapter.getSelectors();
export const { selectAll: selectAllPokemonList } =
  pokemonListAdapter.getSelectors();
export const selectPokemonCollection = createSelector(
  selectEntityCache,
  (state) => state['Pokemon']
);

export const selectPokemonEntities = createSelector(
  selectPokemonCollection,
  selectAllPokemon
);

export const selectPokemonListCollection = createSelector(
  selectEntityCache,
  (state) => state['PokemonList']
);

export const selectPokemonListEntities = createSelector(
  selectPokemonListCollection,
  selectAllPokemonList
);

export const selectPokemonByName = createSelector(
  selectPokemonEntities,
  (pokemonList: Pokemon[], props: { pokemonName: string }) =>
    pokemonList.find((pokemon) => pokemon.name === props.pokemonName)
);
