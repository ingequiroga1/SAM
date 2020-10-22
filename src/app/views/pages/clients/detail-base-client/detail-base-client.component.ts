import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/core/auth';
import { AppState } from 'src/app/core/reducers';
import { ToolbarService } from 'src/app/views/services/toolbar.service';

@Component({
  selector: 'kt-detail-base-client',
  templateUrl: './detail-base-client.component.html',
  styleUrls: ['./detail-base-client.component.scss']
})
export class DetailBaseClientComponent implements OnInit, AfterViewChecked {

  constructor(private toolbarService:ToolbarService,
    private store: Store<AppState>,
    private authService: MsalService) { }

  ngOnInit() {

    this.authService.logout();
    this.store.dispatch(new Logout());

  }

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'},
    children:[ {name:'Clients', url:'/clients/list'},{name:'Detalle de Base del Client', url:'/clients/detail-base-client'}]});
  }

}
