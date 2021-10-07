import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Pokemon } from '../../interfaces/pokemon';
import { PokemonDialogData } from '../../interfaces/pokemon-dialog-data';
import { selectPokemonByName } from '../../selectors/pokemon.selectors';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokeState } from '../../reducers';
import { compare } from '../../actions/pokemon.actions';
import { PokemonListItem } from '../../interfaces/pokemon-list-item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
  favoritePokemonList: PokemonListItem[];
  currentPokemonInformation$: Observable<Pokemon>;
  comparisonPokemonInformation$: Observable<Pokemon>;

  constructor(
    public dialogRef: MatDialogRef<PokemonCardComponent>,
    @Inject(MAT_DIALOG_DATA) data: PokemonDialogData,
    private store: Store<PokeState>
  ) {
    this.isComparing = data.isComparing;
    this.currentPokemon = data.currentPokemon;
    this.comparisonPokemon = data.comparisonPokemon;
    this.favoritePokemonList = data.favoritePokemonList;
  }

  ngOnInit(): void {
    this.currentPokemonInformation$ = this.store.select(selectPokemonByName, {
      pokemonName: this.currentPokemon.name,
    });
    if (this.isComparing) {
      this.comparisonPokemonInformation$ = this.store.select(
        selectPokemonByName,
        { pokemonName: this.comparisonPokemon.name }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.isComparing) {
      this.store.dispatch(compare());
    }
  }
}
