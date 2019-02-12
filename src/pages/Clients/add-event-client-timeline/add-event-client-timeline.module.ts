import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEventClientTimelinePage } from './add-event-client-timeline';

@NgModule({
  declarations: [
    AddEventClientTimelinePage,
  ],
  imports: [
    IonicPageModule.forChild(AddEventClientTimelinePage),
  ],
})
export class AddEventClientTimelinePageModule {}
