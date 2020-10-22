import { AfterViewChecked, Component, OnInit , ViewChild } from '@angular/core';
import { ToolbarService } from 'src/app/views/services/toolbar.service';
import {SiteModalComponent} from '../../../../commons/components/site-modal/site-modal.component';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from "@angular/router";
import { CustomerModel, selectCustomerById, selectCustomersActionLoading } from 'src/app/core/e-commerce';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { SubheaderService } from 'src/app/core/_base/layout';
import { LayoutUtilsService } from 'src/app/core/_base/crud';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { selectBaseById, selectBasesActionLoading } from 'src/app/core/manage_bases';
@Component({
  selector: 'kt-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, AfterViewChecked {

  customer: CustomerModel;
  customerDetailForm: FormGroup;
  loading$: Observable<boolean>;
  hasFormErrors = false;
  selectedTab = 0;
  ischecked = true;

  @ViewChild('modal',{read: SiteModalComponent}) modal:SiteModalComponent;


  constructor(
    private activatedRoute: ActivatedRoute,
    private subheaderService: SubheaderService,
    private userFB: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,
    private toolbarService: ToolbarService,
    private location: Location,
    private router: Router) { }
    private subscriptions: Subscription[] = [];
    
    ngOnInit() {

      this.loading$ = this.store.pipe(select(selectCustomersActionLoading));
      debugger;
      const routeSubscription =  this.activatedRoute.params.subscribe(params => {
        const id = params.id;
        if (id && id > 0) {
          this.store.pipe(select(selectCustomerById(id))).subscribe(res => {
            if (res) {
              debugger;
              this.customer = res;
              this.fillCustomer();
            }
          });
        } 
      });
      this.subscriptions.push(routeSubscription);
  
    }
              
 

    fillCustomer() {
      this.createForm();
      if (!this.customer.clientId) {
        this.subheaderService.setTitle('Create client');
        this.subheaderService.setBreadcrumbs([
          { title: 'Cliente',  page: `clients/list` },
          { title: 'Lista Clientes', page: `clients/list` }
        ]);
        return;
      }
      this.subheaderService.setTitle('Detalle base');
      this.subheaderService.setBreadcrumbs([
        { title: 'Clientes',  page: `clients/list` },
        { title: 'Detalle cliente', page: `clients/details`, queryParams: { id: this.customer.clientId } }
      ]);
    }

    createForm() {
      this.customerDetailForm = this.userFB.group({
      clientNumber: [this.customer.clientNumber],
      rfc:[this.customer.rfc],
      clientName:[this.customer.clientName],
      street:[this.customer.street],
      exteriorNumber:[this.customer.exteriorNumber],
      interiorNumber: [this.customer.interiorNumber],
      zipCode:[this.customer.zipCode],
      neighborhood:[this.customer.neighborhood],      
      state: [this.customer.state],
      city:[this.customer.city],
      clientMobile:[this.customer.clientMobile],
      clientEmail:[this.customer.clientEmail],
      //   statusId:[this.customer.statusId,Validators.compose([Validators.pattern('^[a-zA-Z0-9 ]*$'),
      //   Validators.minLength(3),Validators.maxLength(20), Validators.required])],
      contactName: [this.customer.contactName],
      contactSurname:[this.customer.contactSurname],
      contactLastname:[this.customer.contactLastname],
      contactPhone:[this.customer.contactPhone],
      contactEmail:[this.customer.contactEmail],
      clabe:[this.customer.clabe],
      });

      this.customerDetailForm.controls['clientNumber'].disable();
      this.customerDetailForm.controls['rfc'].disable();
      this.customerDetailForm.controls['clientName'].disable();
      this.customerDetailForm.controls['street'].disable();
      this.customerDetailForm.controls['exteriorNumber'].disable();
      this.customerDetailForm.controls['interiorNumber'].disable();
      this.customerDetailForm.controls['zipCode'].disable();
      this.customerDetailForm.controls['neighborhood'].disable();
      this.customerDetailForm.controls['state'].disable();
      this.customerDetailForm.controls['city'].disable();
      this.customerDetailForm.controls['clientMobile'].disable();
      this.customerDetailForm.controls['clientEmail'].disable();
      this.customerDetailForm.controls['contactName'].disable();
      this.customerDetailForm.controls['contactSurname'].disable();
      this.customerDetailForm.controls['contactLastname'].disable();
      this.customerDetailForm.controls['contactPhone'].disable();
      this.customerDetailForm.controls['contactEmail'].disable();
      this.customerDetailForm.controls['clabe'].disable();

    }

  ngAfterViewChecked(): void {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'},
    children:[ {name:'Detalle del Cliente', url:'/clients/list'}]});
  }

  openModal() {
   this.modal.openDialog();
  }

  closeModal() {
    this.modal.closeDialog();
  }

  back() {
    this.router.navigate(['/clients/list'])
  }
}
