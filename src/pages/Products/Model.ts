export interface Product {
  id: string;
  title: string;
  description: string;
  vendor: string;
  category: string;
  images: string[];
  variants: Variant[];
  // can add any details about the product in key value pairs
  productDetails: {};
  // Added to have a calculation for delievery price.x
  shipping: {
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
    shippingClass: string;
  };

  tags: [string]; // Store product tags/keywords in an array
}

export interface Variant {
  size: string;
  color: string;
  quantity: number;
  price: number;
  discountPercentage: number;
}

export interface ReviewModel {
  productId: string;
  review: string;
  stars: string;
  userName: string;
}
