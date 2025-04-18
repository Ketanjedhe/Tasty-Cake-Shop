import React from "react";

const Card = ({ title, price, image, description }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg hover:shadow-xl transition duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
        loading="lazy"
      />
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-green-600 font-bold">₹{price}</p>
        <p className="text-gray-600 text-sm mt-1 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
