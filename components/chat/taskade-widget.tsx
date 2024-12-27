"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    TaskadeEmbed: {
      AgentPublicChatPopup: {
        init: (config: { publicAgentId: string }) => void;
      };
    };
  }
}

export function TaskadeWidget() {
  useEffect(() => {
    // Initialize widget after script loads
    const initWidget = () => {
      if (window.TaskadeEmbed) {
        window.TaskadeEmbed.AgentPublicChatPopup.init({
          publicAgentId: '01JFP5XB8SSD0RCVA5C813JBSS',
        });
      }
    };

    // Add event listener for script load
    window.addEventListener('load', initWidget);
    return () => window.removeEventListener('load', initWidget);
  }, []);

  return (
    <>
      <Script 
        src="https://assets.taskade.com/embeds/latest/embed.iife.js"
        strategy="afterInteractive"
      />
    </>
  );
}