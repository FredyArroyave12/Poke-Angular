import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { PokemonListItem } from './interfaces/pokemon-list-item';
import { PokemonCardEntityService } from './services/pokemon-card-entity.service';
import { PokemonContainerComponent } from './components/pokemon-container/pokemon-container.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { pokemonReducer } from './reducers';
import { PokemonListResolver } from './services/pokemon-list.resolver';
import { PokemonListDataService } from './services/pokemon-list-data.service';
import { PokemonInfoComponent } from './components/pokemon-info/pokemon-info.component';
import { PokemonListEntityService } from './services/pokemon-list-entity.service';
import { PokemonCardDataService } from './services/pokemon-card-data.service';
import { PokemonCardComponent } from './components/pokemon-card/pokemon-card.component';
import { PokemonCardHeaderComponent } from './components/pokemon-card-header/pokemon-card-header.component';
import { PokemonCardChartComponent } from './components/pokemon-card-chart/pokemon-card-chart.component';
import { PokemonFavoriteComponent } from './components/pokemon-favorite/pokemon-favorite.component';

export const pokemonListRoutes: Routes = [
  {
    path: '',
    component: PokemonContainerComponent,
    resolve: {
      pokemonListItems: PokemonListResolver,
    },
  },
];

const entityMetadata: EntityMetadataMap = {
  PokemonList: {
    selectId: (item: PokemonListItem) => item.name,
    filterFn: (pokemonList: PokemonListItem[], search: string) =>
      pokemonList.filter((pokemon) => pokemon.name.includes(search)),
  },
  Pokemon: {},
};

@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonContainerComponent,
    PokemonCardComponent,
    PokemonInfoComponent,
    PokemonCardHeaderComponent,
    PokemonCardChartComponent,
    PokemonFavoriteComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ChartsModule,
    InfiniteScrollModule,
    SharedModule,
    RouterModule.forChild(pokemonListRoutes),
    StoreModule.forFeature('pokemonListState', pokemonReducer),
  ],
  providers: [
    PokemonListEntityService,
    PokemonListDataService,
    PokemonCardEntityService,
    PokemonCardDataService,
    PokemonListResolver,
  ],
})
export class PokemonModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    pokemonListDataService: PokemonListDataService,
    pokemonCardDataService: PokemonCardDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('PokemonList', pokemonListDataService);
    entityDataService.registerService('Pokemon', pokemonCardDataService);
  }
}
