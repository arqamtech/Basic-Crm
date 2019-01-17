import { Component } from '@angular/core';
import { DashboardPage } from '../../MainPages/dashboard/dashboard';
import { TimelinePage } from '../../MainPages/timeline/timeline';
import { ClientsPage } from '../../MainPages/clients/clients';
import { ProfilePage } from '../../MainPages/profile/profile';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = TimelinePage;
  tab3Root = ClientsPage;
  tab4Root = ProfilePage;

  constructor() {

  }
}
