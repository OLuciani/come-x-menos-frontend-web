export interface UsersDiscountsList {
    businessId: string;
    businessName: string;
    userId: string;
    offeredDiscountId: string;
    discountDetails: string;
    createdAt: Date;
    isValid: boolean;
    isUsed: boolean;
    expirationDate: Date;
  }