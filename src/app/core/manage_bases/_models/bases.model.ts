import { BaseModel } from '../../_base/crud';

export class BasesModel extends BaseModel {

  contactName: string;
  contactSurname: string;
  contactLastname: string;
  contactPhone: number;
  contactEmail: string;
  street: string;
  interiorNumber: string;
  exteriorNumber: string;
  zipCode: string;
  neighborhood: string;
  state: string;
  city: string;
  baseName: string;
  statusId: string;
  clientId: number;
  baseId: number;
  name: string;
  baseNumber: string;
  contactId: number;
  addressId: number;
  clientNumber: string;


  
  clear() {
    this.contactName = '';
    this.contactSurname = '';
    this.contactLastname = '';
    this.contactPhone = 0;
    this.contactEmail = '';
    this.street = '';
    this.interiorNumber = '';
    this.exteriorNumber = '';
    this.zipCode = '';
    this.neighborhood = '';
    this.state = '';
    this.city = '';
    this.baseName = '';
    this.statusId = '';
    this.clientId = 0;
    this.baseId = 0;
    this.name = '';
    this.clientNumber = '';
    this.baseNumber = '';
    this.contactId = 0;
    this.addressId = 0;
  }

}
