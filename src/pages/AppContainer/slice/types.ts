import { ReviewModel } from '../../Products/Model';

export interface AppContainerStates {
  pingResponse: string;
  productLoading: boolean;
  productList: any[];
  wishlistLoading: boolean;
  wishList: any[];
  cartLoading: boolean;
  cart: any[];
  reviews: any[];
  reviewLoading: boolean;
}

export interface wishlistCreation {
  productId: string;
  userId: string;
}

export interface wishlistDeletion {
  wishlistId: string;
  userId: string;
}

export interface cartItemCreation {
  productId: string;
  userId: string;
}

export interface cartDeletion {
  cartId: string;
  userId: string;
}

// export interface reviewAdd {
//   body: ReviewModel;
// }
