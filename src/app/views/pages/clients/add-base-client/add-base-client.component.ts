import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/views/services/toolbar.service';

@Component({
  selector: 'kt-add-base-client',
  templateUrl: './add-base-client.component.html',
  styleUrls: ['./add-base-client.component.scss']
})
export class AddBaseClientComponent implements OnInit , AfterViewChecked {

  constructor(private toolbarService:ToolbarService) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'},
    children:[ {name:'Clients', url:'/clients/list'},{name:'Alta de Base del Cliente', url:'/clients/add-base-client'}]});
  }
}
