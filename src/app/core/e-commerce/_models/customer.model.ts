import { BaseModel } from '../../_base/crud';

export class CustomerModel  extends BaseModel {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  gender: string;
  status: number; // 0 = Active | 1 = Suspended | Pending = 2
  dateOfBbirth: string;
  dob: Date;
  ipAddress: string;
  type: number; // 0 = Business | 1 = Individual
  
    clientId: number;
    clientNumber: string;
    clientName: string;
    changePassword: string;
    rfc: string;
    clientEmail: string;
    logo: string;
    pathLogo: string;
    clabe: number;
    statusId: string;
    contactName: string;
    contactSurname: string;
    contactLastname: string;
    street: string;
    interiorNumber: string;
    exteriorNumber: string;
    zipCode: string;
    neighborhood: string;
    state: string;
    city: string;
    createDate: Date;
    contactPhone: number;
    contactEmail: string;
    clientMobile: number;



  clear() {
    this.dob = new Date();
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.userName = '';
    this.gender = 'Female';
    this.ipAddress = '';
    this.type = 1;
    this.status = 1;
  }
}
