import React from "react";
import { Spinner } from "../ui/spinner";

function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <Spinner className="size-12 text-gray-800" />
    </div>
  );
}

export default Loader;