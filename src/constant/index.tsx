import categoryMen from '../assets/images/category-men.png';
import categoryWomen from '../assets/images/category-women.png';
import categoryKid from '../assets/images/category-kid.jpeg';
import heroPoster from '../assets/images/hero-img2.png';
import PSherwani from '../assets/images/products/Sherwani.jpeg';
import Dothi from '../assets/images/products/Dothi&Pancha.jpeg';
import KanchivaramSaree from '../assets/images/products/image-login.jpg';
import Pagri from '../assets/images/products/Pagri& Kurta Pajamas.jpeg';

export const API_URLS = 'http://localhost:8000';

export const Categories: ICategoriesTypes[] = [
  {
    categoryId: 'Men',
    categoryName: 'Men',
    categoryImg: categoryMen,
  },
  {
    categoryId: 'Women',
    categoryName: 'Women',
    categoryImg: categoryWomen,
  },
  {
    categoryId: 'Kids',
    categoryName: 'Kids',
    categoryImg: categoryKid,
  },
];

export interface ICategoriesTypes {
  categoryId: string;
  categoryName: string;
  categoryImg: string;
}

export const Products: IProductsTypes[] = [
  {
    productCategoryId: '1',
    productTitle: 'Sharwani',
    productDesc: 'Traditional, long, coat-like garment',
    productImg: PSherwani,
    productPrice: 180,
  },
  {
    productCategoryId: '1',
    productTitle: 'Dothi & Pancha',
    productDesc: 'A traditional South Asian mens garment',
    productImg: Dothi,
    productPrice: 120,
  },
  {
    productCategoryId: '3',
    productTitle: 'Pagri',
    productDesc: 'crafted with intricate fabrics and tied',
    productImg: Pagri,
    productPrice: 80,
  },
  {
    productCategoryId: '2',
    productTitle: 'Kanchivaram Saree',
    productDesc:
      'A luxurious silk saree handwoven in Kanchipuram, Tamil Nadu',
    productImg: KanchivaramSaree,
    productPrice: 75,
  },
];

export interface IProductsTypes {
  productCategoryId: string;
  productTitle: string;
  productDesc: string;
  productImg: string;
  productPrice: number;
}
