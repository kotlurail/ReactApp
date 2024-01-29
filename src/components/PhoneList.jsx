// PhoneList.js
import React, { lazy, Suspense, useState } from "react";

const PhoneCard = lazy(() => import("./PhoneCard"));
const PhoneList = ({ phones }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {phones.map((phone) => (
        <PhoneCard  phone={phone} />
      ))}
    </div>
  );
};

export default PhoneList;
