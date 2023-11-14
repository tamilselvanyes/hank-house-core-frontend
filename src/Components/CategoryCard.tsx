import React from 'react';
import categoryimg from '../assets/images/category-men.png';
import { useNavigate } from 'react-router-dom';

import { FaChevronRight } from 'react-icons/fa';

export interface CategoryCardProps {
  categoryId:number;
  categoryName: string;
  categoryImg: string;
}

const CategoryCard = (props: CategoryCardProps) => {
  const navigate = useNavigate();
  return (
    <div className="w-72 h-fit mt-10  px-1 rounded-lg bg-[#f4f6f4] flex flex-col items-center gap-2 cursor-pointer" onClick={()=>{navigate(`/products/${props.categoryId}`)}} >
      {/* <p className="text-white">{props.categoryName}</p> */}
      <img
        src={props.categoryImg}
        alt="category"
        className="object-contain w-11/12 h-[200px] rounded-lg mt-4"
      />
      <div className="mb-5 mt-4 flex items-center gap-2">
        {props.categoryName}
        <FaChevronRight className="inline " />
      </div>
    </div>
  );
};

export default CategoryCard;
