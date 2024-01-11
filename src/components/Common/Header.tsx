import React from "react";

const Header: React.FC = () => {
  return (
    <div className="bg-purple-600 w-full h-200 border-b-2 border-solid border-gray-100 text-gray-100">
      <div className="mx-auto py-5 w-1/2 text-center">
        <img
        className=" relative top-0 left-1/3"
          src="https://see.fontimg.com/api/renderfont4/9Y2DK/eyJyIjoiZnMiLCJoIjo2NSwidyI6MTAwMCwiZnMiOjY1LCJmZ2MiOiIjRkZGRkZGIiwiYmdjIjoiI0ZGRkZGRiIsInQiOjF9/UGxheWxpc3QgVG8gR28/nature-beauty-personal-use.png"
          alt="Cursive fonts"
        />
      </div>
    </div>
  );
};

export default Header;
