import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "+919734166618"; // Your WhatsApp number (with country code)
  const message = "Hello, I want more information.";

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="whatsapp-float" onClick={handleClick}>
      <FaWhatsapp size={28} />
    </div>
  );
};

export default WhatsAppButton;