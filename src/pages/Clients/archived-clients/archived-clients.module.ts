import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ArchivedClientsPage } from './archived-clients';

@NgModule({
  declarations: [
    ArchivedClientsPage,
  ],
  imports: [
    IonicPageModule.forChild(ArchivedClientsPage),
  ],
})
export class ArchivedClientsPageModule {}
