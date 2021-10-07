import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { PokeState } from 'src/app/modules/pokemon/reducers';
import { PokemonListItem } from 'src/app/modules/pokemon/interfaces/pokemon-list-item';
import { getFavoritePokemonList } from 'src/app/modules/pokemon/selectors/pokemon.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomeComponent implements OnInit {
  favoritePokemonList$: Observable<PokemonListItem[]>;

  constructor(private store: Store<PokeState>) {}

  ngOnInit(): void {
    this.favoritePokemonList$ = this.store.select(getFavoritePokemonList);
  }
}
