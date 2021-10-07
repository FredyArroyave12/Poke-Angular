import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  getComparisonPokemon,
  getCurrentPokemon,
  getFavoritePokemonList,
  getIsComparing,
} from '../../selectors/pokemon.selectors';
import { PokeState } from '../../reducers';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonListItem } from '../../interfaces/pokemon-list-item';

@Component({
  selector: 'pokemon-container',
  templateUrl: './pokemon-container.component.html',
  styleUrls: ['./pokemon-container.component.css'],
})
export class PokemonContainerComponent implements OnInit {
  constructor(
    private pokemonListService: PokemonListEntityService,
    private store: Store<PokeState>
  ) {}
  pokemonList$: Observable<PokemonListItem[]>;
  favoritePokemonList$: Observable<PokemonListItem[]>;
  currentPokemon$: Observable<PokemonListItem>;
  comparisonPokemon$: Observable<PokemonListItem>;
  isComparing$: Observable<boolean>;

  ngOnInit(): void {
    this.updateFilter();
    this.pokemonList$ = this.pokemonListService.filteredEntities$;
    this.favoritePokemonList$ = this.store.select(getFavoritePokemonList);
    this.currentPokemon$ = this.store.select(getCurrentPokemon);
    this.comparisonPokemon$ = this.store.select(getComparisonPokemon);
    this.isComparing$ = this.store.select(getIsComparing);
  }

  updateFilter(search: string = ''): void {
    this.pokemonListService.setFilter(search);
  }
}
