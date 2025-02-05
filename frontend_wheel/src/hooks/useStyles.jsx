import { useState, useEffect } from "react";

export const useStyles = () => {
  let custom_color_styles =
    "bg-primary, bg-secondary, bg-accent, bg-neutral, bg-info, bg-success, bg-warning, bg-error, hover:bg-success, hover:bg-warning, hover:bg-error, hover:bg-primary, hover:bg-secondary, hover:bg-accent,hover:bg-neutral, hover:bg-info, border-primary, border-secondary, border-accent, border-neutral, border-info, border-success, border-warning, border-error, border-black, border-white, border-blue-500 border-red-500 border-yellow-500 border-orange-500 border-green-500 border-purple-500 border-gray-500";
  let borders = "border-2, border-4, border-6, border-8";
  let color_styles =
    "bg-black, bg-white, bg-blue-500 bg-red-500 bg-yellow-500 bg-orange-500 bg-green-500 bg-purple-500 bg-gray-500 hover:bg-black, hover:bg-white, hover:bg-blue-500 hover:bg-red-500 hover:bg-yellow-500 hover:bg-orange-500 hover:bg-green-500 hover:bg-purple-500 hover:bg-gray-500 hover:bg-black, hover:bg-white, text-black, text-white, hover:text-black, hover:text-white,";
  let font =
    "btn-sm btn-md btn-lg btn-xl text-blue-500 text-red-500 text-yellow-500 text-orange-500 text-green-500 text-purple-500 text-black text-white text-gray-500 text-primary, text-secondary, text-accent, text-neutral, text-info, text-success, text-warning, text-error, bg-[] bg-[radial-gradiant()] bg-[radial-gradient(ellipse_at_50%_75%,_${lightColor},_${color},_${darkColor})";

  let radial =
    " bg-radial-[at_50%_75%] from-white via-primary to-black to-90% bg-radial-[at_50%_75%] from-white via-secondary to-black to-90% bg-radial-[at_50%_75%] from-white via-accent to-black to-90% bg-radial-[at_50%_75%] from-white via-neutral to-black to-90% bg-radial-[at_50%_75%] from-white via-info to-black to-90% bg-radial-[at_50%_75%] from-white via-success to-black to-90% bg-radial-[at_50%_75%] from-white via-warning to-black to-90% bg-radial-[at_50%_75%] from-white via-error to-black to-90% bg-radial-[at_50%_75%] from-white via-blue-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-red-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-green-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-yellow-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-orange-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-purple-500 to-black to-90% bg-radial-[at_50%_75%] from-white via-gray-500 to-black to-90% ";
  let font2 =
    "group-hover:text-blue-500 group-hover:text-red-500 group-hover:text-yellow-500 group-hover:text-orange-500 group-hover:text-green-500 group-hover:text-purple-500 group-hover:text-black group-hover:text-white group-hover:text-gray-500 group-hover:text-primary, group-hover:text-secondary, group-hover:text-accent, group-hover:text-neutral, group-hover:text-info, group-hover:text-success, group-hover:text-warning, group-hover:text-error,";
  return {
    color_styles,
    borders,
  };
};
