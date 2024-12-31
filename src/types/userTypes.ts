export interface User {
    _id: string;
    name: string;
    lastName: string;
    businessName: string;
    phone: string;
    email: string;
    password: string;
    repeatPassword?: string;
    businessType: string;
    //token: string;
    /*  businessId: string;
    originalEmail: string;
    pdfBusinessRegistration: string;
    role: string;
    status: string; */
  }


  export interface BusinessEmployee {
    name?: string;
    lastName?: string;
    email: string;
    phone?: string;
    password?: string;
    businessId?: string;
    token?: string;
  }


  export interface ExtraBusinessAdminUser {
    name?: string;
    lastName?: string;
    email: string;
    phone?: string;
    password?: string;
    businessId?: string;
    token?: string;
  }


  export interface ActiveBusinessAdminUser {
    _id: string;
    name: string;
    lastName: string;
    businessName: string;
    phone: string;
    email: string;
    password: string;
    repeatPassword?: string;
    businessType: string;
    //token: string;
    businessId: string;
    originalEmail: string;
    pdfBusinessRegistration: string;
    role: string;
    status: string;
    business: object | null;
  }
  

  export interface UserPending {
    _id: string;
    name: string;
    lastName: string;
    businessName: string;
    phone: string;
    email: string;
    password: string;
    repeatPassword?: string;
    businessType: string;
    //token: string;
    businessId: string;
    originalEmail: string;
    pdfBusinessRegistration: string;
    role: string;
    status: string;
    business: object | null;
  }


  export interface ActiveUser {
    _id: string;
    name: string;
    lastName: string;
    businessName?: string;
    phone: string;
    email: string;
    //password: string;
    //repeatPassword?: string;
    businessType?: string;
    //token: string;
    businessId?: string;
    originalEmail?: string;
    pdfBusinessRegistration?: string;
    role?: string;
    status?: string;
    business?: object | null;
  }