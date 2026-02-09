"use client";

import React, { useEffect, useRef } from "react";
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
        onChange(address, place);
      }
    });
  };

  return (
    <div className={`relative ${className}`}>
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <Icon icon="mdi:map-marker" className="text-lg" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full placeholder:text-xs sm:placeholder:text-sm placeholder:font-[400] h-[50px] rounded-full border border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>
  );
};

export default GooglePlacesAutocomplete;
