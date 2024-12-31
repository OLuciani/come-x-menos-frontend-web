export interface Business {
    ownerName: string;
    businessName: string;
    businessType: string;
    address: string;
    addressNumber: string;
    city: string;
    country: string;
    ownerId: string;
    imageURL: File | Blob | null; // Aqui originalmente es imageURL: File | null;
    _id: string;
    latitude?: number;
    longitude?: number;
    pdfBusinessRegistration: File | null; //Esta la agregué para enviar datos afipp
    logo?: File | Blob | null; //Para enviar logo
  }


  export interface PendingBusiness {
    address: string;
    addressNumber: string;
    businessName: string;
    businessType: string;
    city: string;
    country: string;
    latitude: number;
    longitude: number;
    imageURL: string;
    urlLogo: string;
    pdfBusinessRegistration: string;
  }