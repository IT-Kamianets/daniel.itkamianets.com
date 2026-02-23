import { useState, useEffect } from "react";

export function useRestaurantStatus() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Europe/Kyiv",
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      };
      const formatter = new Intl.DateTimeFormat([], options);
      const timeString = formatter.format(now);

      const [hours] = timeString.split(":").map(Number);

      if (hours >= 11 && hours < 23) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
}
