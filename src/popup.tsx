import React from "react";
import { createRoot } from "react-dom/client";
import './styles.css';
import { Button } from "@/components/ui/button"


const Popup = () => {
  return (
    <div className="popup">
      <h1>Welcome to the Popup!</h1>
      <Button onClick={() => alert("Button clicked!")}>Click Me</Button>
    </div>
  )
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
