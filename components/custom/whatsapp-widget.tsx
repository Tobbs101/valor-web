import React from "react";
import { Icon } from "@iconify/react";

const WhatsappWidget = () => {
  return (
    <div className="fixed bottom-5 right-5 z-[999]">
      <a
        href="https://wa.me/447832314114?text=Hi%20Limit%20Breakers%20Support!"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
      >
        <Icon icon="logos:whatsapp-icon" className="w-6 h-6" />
      </a>
    </div>
  );
};

export default WhatsappWidget;
