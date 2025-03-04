// import { useState } from "react";
import FormatTime from "./FormatTime";
export default function NameMusic({ songIndex, songArr }) {
  return (
    <>
      <p>
        {songArr.length > 0 && songIndex !== null && songArr[songIndex].name } 
      </p>
    </>
  );
}
