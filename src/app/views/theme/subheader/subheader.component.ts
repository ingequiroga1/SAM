// Angular
import { Component, OnInit , Input } from '@angular/core';
// Layout
import { LayoutConfigService } from '../../../core/_base/layout';
// Object-Path
import * as objectPath from 'object-path';
import {HtmlClassService} from '../html-class.service';
import {ActivatedRoute, Router , ActivationEnd} from '@angular/router';
import {ToolbarService} from '../../services/toolbar.service';
@Component({
  selector: 'kt-subheader',
  templateUrl: './subheader.component.html',
})
export class SubheaderComponent implements OnInit {
  // Public properties
  // subheader layout
  layout = 'subheader-v1';
  width = 'fluid';
  clear = false;
  displayDesc = false;
  displayDaterangepicker = true;
  fixed = true;
  style = 'solid';
  subheaderClasses = 'kt_subheader';
  subheaderContainerClasses = '';
  @Input() isDashboard;
  /**
   * Component constructor
   *
   * @param layoutConfigService: LayoutConfigService
   * @param uiService: HtmlClassService
   */

  routeData = {};
  constructor(
      private layoutConfigService: LayoutConfigService,
      private uiService: HtmlClassService,
      private _router: Router,
      private _route: ActivatedRoute,
      private toolbarService: ToolbarService ) {
  }

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit(): void {
    this.toolbarService.toolbarDataEvent.subscribe((data) => {
      this.routeData = data;
    })
    const config = this.layoutConfigService.getConfig();
    this.layout = objectPath.get(config, 'subheader.layout');
    this.fixed = objectPath.get(config, 'subheader.fixed');
    this.clear = objectPath.get(config, 'subheader.clear');
    this.style = objectPath.get(config, 'subheader.style');
    this.displayDesc = objectPath.get(config, 'subheader.displayDesc');
    this.displayDaterangepicker = objectPath.get(config, 'subheader.displayDaterangepicker');
    this.subheaderClasses = this.uiService.getClasses('subheader', true).toString();
    this.subheaderContainerClasses = this.uiService.getClasses('subheader_container', true).toString()
  }
}
