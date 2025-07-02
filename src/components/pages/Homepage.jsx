import React from "react";
import { useSelector } from "react-redux";
import Home from "../home/Home";
import { Women } from "../data/Women.jsx";
import Cartslide from "../cartcaresol/Cartslide.jsx";
import Men from "../data/Men.jsx";
import { Lenga } from "../data/Lenga.jsx";
import { Dress } from "../data/Jeans.jsx";
import { selectNewArrivals } from "../Store";

const Homepage = () => {
  const newArrivals = useSelector(selectNewArrivals);

  return (
    <div>
      <Home />

      <div className="space-y-10 py-20 flex flex-col justify-center">
        {newArrivals && newArrivals.length > 0 && (
          <Cartslide data={newArrivals} sectionName={"New Arrivals"} />
        )}
        <Cartslide data={Men} sectionName={"Novels"} />
        <Cartslide data={Women} sectionName={"Medical"} />
        <Cartslide data={Lenga} sectionName={"B.tech"} />
      </div>
    </div>
  );
};

export default Homepage;
