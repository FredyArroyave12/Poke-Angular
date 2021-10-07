import { Component, Input, OnInit } from '@angular/core';
import { PokemonListItem } from 'src/app/modules/pokemon/interfaces/pokemon-list-item';
import { PokemonResources } from 'src/app/utils/pokemon/pokemon-resources';

@Component({
  selector: 'app-favorite-pokemon-banner',
  templateUrl: './favorite-pokemon-banner.component.html',
  styleUrls: ['./favorite-pokemon-banner.component.css'],
})
export class FavoritePokemonBannerComponent implements OnInit {
  @Input() favoritePokemonList: PokemonListItem[];
  pokemonImages: string[];
  pokemonNames: string[];

  constructor() {}

  ngOnInit(): void {
    this.pokemonImages = this.favoritePokemonList.map((pokemon) =>
      this.getImage(pokemon.url)
    );
    this.pokemonNames = this.favoritePokemonList.map((pokemon) =>
      pokemon.name.toUpperCase()
    );
  }

  getImage(url: string): string {
    return PokemonResources.getPokemonImageUrl(parseInt(url.split('/')[6], 10));
  }
}
