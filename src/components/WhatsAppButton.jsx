import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import {whatsappLink} from "@/utils/helpers"

const WhatsAppButton = () => {

  return (
    <div className="whatsapp-float" onClick={whatsappLink}>
      <FaWhatsapp size={28} />
    </div>
  );
};

export default WhatsAppButton;