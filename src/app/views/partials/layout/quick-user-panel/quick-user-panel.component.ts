// Angular
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
// Layout
import { OffcanvasOptions } from '../../../../core/_base/layout';
import { AppState } from '../../../../core/reducers';
import { currentUser, Logout, User } from '../../../../core/auth';
import { MsalService } from '@azure/msal-angular';

import { HttpClient } from '@angular/common/http';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

@Component({
  selector: 'kt-quick-user-panel',
  templateUrl: './quick-user-panel.component.html',
  styleUrls: ['./quick-user-panel.component.scss']
})
export class QuickUserPanelComponent implements OnInit {
  user$: Observable<User>;
  profile;
  // Public properties
  offcanvasOptions: OffcanvasOptions = {
    overlay: true,
    baseClass: 'offcanvas',
    placement: 'right',
    closeBy: 'kt_quick_user_close',
    toggleBy: 'kt_quick_user_toggle'
  };

  constructor(private store: Store<AppState>, private authService: MsalService, private http: HttpClient) {

  }

  /**
   * On init
   */
  ngOnInit(): void {
    this.user$ = this.store.pipe(select(currentUser));

    this.getProfile();
  }

  getProfile() {
    this.http.get(GRAPH_ENDPOINT )
      .toPromise().then(profile => {
        debugger;
        this.profile = profile;
      });
  }

  /**
   * Log out
   */
  logout() {
    debugger;
    this.authService.logout();
    this.store.dispatch(new Logout());
    
  }
}
