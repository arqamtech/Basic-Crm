import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientTimelinePage } from './client-timeline';

@NgModule({
  declarations: [
    ClientTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientTimelinePage),
  ],
})
export class ClientTimelinePageModule {}
