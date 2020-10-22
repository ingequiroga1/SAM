import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { from, Observable, Subscription } from 'rxjs';
import { ToolbarService } from 'src/app/views/services/toolbar.service';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { BasesModel, selectBaseById, selectBasesActionLoading } from 'src/app/core/manage_bases';
import { CustomerModel, CustomersDataSource } from 'src/app/core/e-commerce';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { SubheaderService } from 'src/app/core/_base/layout';
@Component({
  selector: 'kt-base-detail',
  templateUrl: './base-detail.component.html',
  styleUrls: ['./base-detail.component.scss']
})
export class BaseDetailComponent implements OnInit , AfterViewChecked {

  dataSource: CustomersDataSource;
  base: BasesModel;
  BasesDetailForm: FormGroup;
  loading$: Observable<boolean>;
  hasFormErrors = false;
  selectedTab = 0;
  ischecked = true;
  customersResult: CustomerModel[] = [];
  selection = new SelectionModel<CustomerModel>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("sort1", { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  filterStatus = "";
  filterType = "";

  constructor(
    private toolbarService:ToolbarService,
    private activatedRoute: ActivatedRoute,
    private location:Location,
    private router: Router,
    private userFB: FormBuilder,
    private subheaderService: SubheaderService,
    private store: Store<AppState>) { }
    private subscriptions: Subscription[] = [];
    
  ngAfterViewChecked(): void {
    this.toolbarService.emit({ parent:{name:'Bases',url:'/bases/list'}, children:[ {name:'Detalle Alta de Base', url:'/bases/details'}]});
  }

  ngOnInit() {

    debugger
    this.loading$ = this.store.pipe(select(selectBasesActionLoading));
		
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectBaseById(id))).subscribe(res => {
					if (res) {
						this.base = res;
						this.fillBase();
					}
				});
			}
		});
    this.subscriptions.push(routeSubscription);
    
  }

  fillBase() {
		this.createForm();
		if (!this.base.baseId) {
			this.subheaderService.setTitle('Create client');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Base',  page: `bases/list` },
				{ title: 'Lista Bases', page: `bases/list` }
			]);
			return;
		}
		this.subheaderService.setTitle('Detalle base');
		this.subheaderService.setBreadcrumbs([
      { title: 'Bases',  page: `bases/list` },
			{ title: 'Detalle base', page: `bases/details`, queryParams: { id: this.base.baseId } }
		]);
	}


  createForm() {
		this.BasesDetailForm = this.userFB.group({
	  contactName: [this.base.contactName],
	  contactSurname:[this.base.contactSurname],
	  contactLastname:[this.base.contactLastname],
	  contactPhone:[this.base.contactPhone],
	  contactEmail:[this.base.contactEmail],
	  street: [this.base.street],
	  interiorNumber:[this.base.interiorNumber],
	  exteriorNumber:[this.base.exteriorNumber],      
	  zipCode: [this.base.zipCode],
	  neighborhood:[this.base.neighborhood],
	  state:[this.base.state],
	  city:[this.base.city],
	  baseName:[this.base.baseName],
    clientNumber:[this.base.clientNumber],
    baseNumber: [this.base.baseNumber]
    });
    
      this.BasesDetailForm.controls['contactName'].disable();
      this.BasesDetailForm.controls['contactSurname'].disable();
      this.BasesDetailForm.controls['contactLastname'].disable();
      this.BasesDetailForm.controls['contactPhone'].disable();
      this.BasesDetailForm.controls['contactEmail'].disable();
      this.BasesDetailForm.controls['street'].disable();
      this.BasesDetailForm.controls['interiorNumber'].disable();
      this.BasesDetailForm.controls['exteriorNumber'].disable();
      this.BasesDetailForm.controls['zipCode'].disable();
      this.BasesDetailForm.controls['neighborhood'].disable();
      this.BasesDetailForm.controls['state'].disable();
      this.BasesDetailForm.controls['city'].disable();
      this.BasesDetailForm.controls['baseName'].disable();
      this.BasesDetailForm.controls['clientNumber'].disable();
      this.BasesDetailForm.controls['baseNumber'].disable();

  }

  back() {
    this.router.navigate(['/bases/list'])
  }

}
