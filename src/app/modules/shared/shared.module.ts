import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertMessageComponent } from './components/favorite-message/alert-message.component';
import { InfoMessageComponent } from './components/comparing-message/info-message.component';
import { SearchComponent } from './components/search/search.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AlertMessageComponent, InfoMessageComponent, SearchComponent],
  imports: [CommonModule, MatIconModule],
  exports: [AlertMessageComponent, InfoMessageComponent, SearchComponent],
})
export class SharedModule {}
