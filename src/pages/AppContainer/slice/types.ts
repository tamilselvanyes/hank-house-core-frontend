export interface AppContainerStates {
  pingResponse: string;
  productLoading: boolean;
  productList: any[];
  wishlistLoading: boolean;
  wishList: any[];
}

export interface wishlistCreation {
  productId: string;
  userId: string;
}

export interface wishlistDeletion {
  wishlistId: string;
  userId: string;
}
