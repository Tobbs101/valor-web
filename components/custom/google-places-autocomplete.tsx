"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (
    value: string,
    placeDetails?: google.maps.places.PlaceResult,
  ) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    google: typeof google;
    initGooglePlaces: () => void;
  }
}

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search location",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [localValue, setLocalValue] = useState(value);

  // Sync local value with external value
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    // Check if Google Maps is already loaded
    if (window.google && window.google.maps && window.google.maps.places) {
      initAutocomplete();
      return;
    }

    // Load Google Maps script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      console.warn("Google Places API key not found");
      return;
    }

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      // Script already exists, wait for it to load
      window.initGooglePlaces = () => {
        initAutocomplete();
      };
      return;
    }

    // Create callback function
    window.initGooglePlaces = () => {
      initAutocomplete();
    };

    // Create and append script
    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initGooglePlaces`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, []);

  const initAutocomplete = () => {
    if (!inputRef.current || !window.google) return;

    // Restrict to Nigeria
    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: "ng" },
      types: ["geocode", "establishment"],
      fields: ["formatted_address", "geometry", "name", "place_id"],
    };

    autocompleteRef.current = new google.maps.places.Autocomplete(
      inputRef.current,
      options,
    );

    autocompleteRef.current.addListener("place_changed", () => {
      const place = autocompleteRef.current?.getPlace();
      if (place) {
        const address = place.formatted_address || place.name || "";
        // Use setTimeout to ensure the event completes before updating state
        setTimeout(() => {
          onChange(address, place);
        }, 0);
      }
    });

    // Prevent clicks on autocomplete dropdown from closing parent dialogs
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (
            node instanceof HTMLElement &&
            node.classList.contains("pac-container")
          ) {
            node.addEventListener("mousedown", (e) => {
              e.stopPropagation();
            });
            node.addEventListener("click", (e) => {
              e.stopPropagation();
            });
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
    };
  };

  // Add global styles for Google Places autocomplete dropdown z-index
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "google-places-autocomplete-styles";
    style.textContent = `
      .pac-container {
        z-index: 100000 !important;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        margin-top: 4px;
        font-family: inherit;
      }
      .pac-item {
        padding: 10px 12px;
        cursor: pointer;
        font-size: 14px;
      }
      .pac-item:hover {
        background-color: #f3f4f6;
      }
      .pac-item-query {
        font-size: 14px;
        color: #1f2937;
      }
      .pac-matched {
        font-weight: 600;
      }
    `;

    // Only add if not already present
    if (!document.getElementById("google-places-autocomplete-styles")) {
      document.head.appendChild(style);
    }

    return () => {
      // Don't remove on unmount as other instances may need it
    };
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10">
        <Icon icon="mdi:map-marker" className="text-lg" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={localValue}
        onChange={(e) => {
          const val = e.target.value;
          setLocalValue(val); // Update immediately for smooth typing
          onChange(val); // Notify parent immediately
        }}
        placeholder={placeholder}
        className="w-full placeholder:text-xs sm:placeholder:text-sm placeholder:font-[400] h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>
  );
};

export default GooglePlacesAutocomplete;
