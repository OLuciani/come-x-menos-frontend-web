export interface Discount {
    title: string;
    description: string;
    normalPrice: string;
    discountAmount: string;
    imageURL: string | File | null;
    businessName: string;
    businessId: string;
    businessType: string;
    isActive: boolean;
    validityPeriod: number;
    businessLocationLatitude: number;
    businessLocationLongitude: number;
  }

  export interface DiscountsList {
    businessId: string;
    userToken: string;
    title: string;
    description: string;
    discountAmount: string;
    imageURL: string;
    normalPrice: string;
    priceWithDiscount: number;
    _id: string;
    isDeleted: string;
    validityPeriod: number;
    startDateTime: Date;
    expirationDate: Date;
    generatedDiscounts: number;
    usedDiscounts: number;
    discountViews: number;
    salesValue?: number;
  }

  export interface DiscountDetail {
    title: string;
    description: string;
    normalPrice: string;
    discountAmount: string;
    //imageURL: File | null;
    imageURL: string;
    businessName: string;
    businessId: string;
    businessType: string;
    isActive: boolean;
    priceWithDiscount: string;
    validityPeriod: number;
    startDateTime: Date;
    businessLocationLatitude: number;
    businessLocationLongitude: number;
    expirationDate?: Date;
  }