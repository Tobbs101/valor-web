"use client";

import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

interface PlaceDetails {
  formatted_address?: string;
  name?: string;
  place_id?: string;
  geometry?: {
    location?: {
      lat: () => number;
      lng: () => number;
    };
  };
}

interface GooglePlacesAutocompleteProps {
  value: string;
  onChange: (value: string, placeDetails?: PlaceDetails) => void;
  placeholder?: string;
  className?: string;
}

declare global {
  interface Window {
    google: typeof google;
    googleMapsLoaded: boolean;
    googleMapsCallbacks: (() => void)[];
  }
}

// Promisified script loader with async loading
const loadGoogleMapsScript = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Already loaded
    if (window.google?.maps?.places) {
      resolve();
      return;
    }

    // Script is loading, add callback
    if (window.googleMapsCallbacks) {
      window.googleMapsCallbacks.push(resolve);
      return;
    }

    // Initialize callback queue
    window.googleMapsCallbacks = [resolve];

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey) {
      reject(new Error("Google Places API key not found"));
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    // Use async loading as recommended by Google
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
    script.async = true;

    script.onload = () => {
      // Wait for Google Maps to be fully initialized
      const checkReady = setInterval(() => {
        if (window.google?.maps?.places) {
          clearInterval(checkReady);
          window.googleMapsLoaded = true;
          window.googleMapsCallbacks.forEach((cb) => cb());
          window.googleMapsCallbacks = [];
        }
      }, 50);
    };

    script.onerror = () => {
      reject(new Error("Failed to load Google Maps script"));
    };

    document.head.appendChild(script);
  });
};

const GooglePlacesAutocomplete: React.FC<GooglePlacesAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Search location",
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onChangeRef = useRef(onChange);
  const [localValue, setLocalValue] = useState(value);
  const isSelectingRef = useRef(false);

  // Keep onChange ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  // Only sync from parent when not actively selecting
  useEffect(() => {
    if (!isSelectingRef.current) {
      setLocalValue(value);
    }
  }, [value]);

  useEffect(() => {
    let mounted = true;

    const initAutocomplete = async () => {
      try {
        await loadGoogleMapsScript();
        if (!mounted || !inputRef.current || !window.google) return;

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
            const placeDetails: PlaceDetails = {
              formatted_address: place.formatted_address || "",
              name: place.name || "",
              place_id: place.place_id || "",
              geometry: place.geometry?.location
                ? {
                    location: {
                      lat: () => place.geometry!.location!.lat(),
                      lng: () => place.geometry!.location!.lng(),
                    },
                  }
                : undefined,
            };

            const address =
              placeDetails.formatted_address || placeDetails.name || "";

            // Mark as selecting to prevent parent value sync from overwriting
            isSelectingRef.current = true;
            setLocalValue(address);
            onChangeRef.current(address, placeDetails);

            // Reset the flag after a short delay
            setTimeout(() => {
              isSelectingRef.current = false;
            }, 100);
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
      } catch (error) {
        console.error("Error initializing Google Places:", error);
      }
    };

    initAutocomplete();

    return () => {
      mounted = false;
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add global styles for Google Places autocomplete dropdown
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "google-places-autocomplete-styles";
    style.textContent = `
      .pac-container {
        z-index: 1000000 !important;
        border-radius: 12px;
        border: 1px solid #e5e7eb;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
        margin-top: 4px;
        font-family: inherit;
        background-color: #ffffff;
        pointer-events: auto !important;
        position: absolute !important;
      }
      .pac-item {
        padding: 10px 12px;
        cursor: pointer !important;
        font-size: 14px;
        border-top: 1px solid #f3f4f6;
        background-color: #ffffff;
        pointer-events: auto !important;
      }
      .pac-item:first-child {
        border-top: none;
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
      .pac-icon {
        display: none;
      }
      .pac-item-selected {
        background-color: #f3f4f6;
      }
    `;

    // Remove existing styles first to ensure latest styles are applied
    const existingStyle = document.getElementById(
      "google-places-autocomplete-styles",
    );
    if (existingStyle) {
      existingStyle.remove();
    }
    document.head.appendChild(style);

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
          setLocalValue(val);
          onChangeRef.current(val);
        }}
        placeholder={placeholder}
        className="w-full placeholder:text-xs sm:placeholder:text-sm placeholder:font-[400] h-[50px] rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
    </div>
  );
};

export default React.memo(GooglePlacesAutocomplete);
