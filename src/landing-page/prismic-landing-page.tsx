"use client";

import React from "react";
import { KeyTextField, ImageField } from "@prismicio/client";
import HeroMd from "./components/hero-md";
import Welcome from "./components/welcome";
import CarSelection from "./components/car-selection";
import AppFeatures from "./components/app-features";

// ─── Types ──────────────────────────────────────────────────────────────────

interface HowItWorksStep {
  step_title?: KeyTextField;
  step_description?: KeyTextField;
}

export interface LandingPageData {
  // Hero
  hero_title?: KeyTextField;
  hero_subtitle?: KeyTextField;
  hero_image?: ImageField;
  hero_cta_text?: KeyTextField;

  // Popular Rides
  popular_rides_title?: KeyTextField;
  popular_rides_cta_text?: KeyTextField;

  // Car Selection
  car_selection_title?: KeyTextField;
  car_selection_description?: KeyTextField;
  what_valor_gives_title?: KeyTextField;
  what_valor_gives_description?: KeyTextField;

  // App Features
  app_features_title?: KeyTextField;
  app_features_subtitle?: KeyTextField;
  safe_transactions_title?: KeyTextField;
  safe_transactions_description?: KeyTextField;
  verified_vehicles_title?: KeyTextField;
  verified_vehicles_description?: KeyTextField;
  trip_tracking_title?: KeyTextField;
  trip_tracking_description?: KeyTextField;
  how_it_works_title?: KeyTextField;
  how_it_works_steps?: HowItWorksStep[];
  rental_options_title?: KeyTextField;
  rental_options_description?: KeyTextField;
  experience_valor_title?: KeyTextField;
  experience_valor_description?: KeyTextField;

  // SEO
  meta_title?: KeyTextField;
  meta_description?: KeyTextField;
  meta_keywords?: KeyTextField;
  og_image?: ImageField;
}

interface PrismicLandingPageProps {
  data: LandingPageData;
}

const PrismicLandingPage = ({ data }: PrismicLandingPageProps) => {
  return (
    <>
      <HeroMd
        heroTitle={data.hero_title || undefined}
        heroSubtitle={data.hero_subtitle || undefined}
        heroImage={data.hero_image?.url || undefined}
        heroCtaText={data.hero_cta_text || undefined}
      />
      <Welcome
        sectionTitle={data.popular_rides_title || undefined}
        ctaText={data.popular_rides_cta_text || undefined}
      />
      <CarSelection
        sectionTitle={data.car_selection_title || undefined}
        sectionDescription={data.car_selection_description || undefined}
        whatValorTitle={data.what_valor_gives_title || undefined}
        whatValorDescription={data.what_valor_gives_description || undefined}
      />
      <AppFeatures
        appFeaturesTitle={data.app_features_title || undefined}
        appFeaturesSubtitle={data.app_features_subtitle || undefined}
        safeTransactionsTitle={data.safe_transactions_title || undefined}
        safeTransactionsDescription={
          data.safe_transactions_description || undefined
        }
        verifiedVehiclesTitle={data.verified_vehicles_title || undefined}
        verifiedVehiclesDescription={
          data.verified_vehicles_description || undefined
        }
        tripTrackingTitle={data.trip_tracking_title || undefined}
        tripTrackingDescription={data.trip_tracking_description || undefined}
        howItWorksTitle={data.how_it_works_title || undefined}
        howItWorksSteps={data.how_it_works_steps}
        rentalOptionsTitle={data.rental_options_title || undefined}
        rentalOptionsDescription={data.rental_options_description || undefined}
        experienceValorTitle={data.experience_valor_title || undefined}
        experienceValorDescription={
          data.experience_valor_description || undefined
        }
      />
    </>
  );
};

export default PrismicLandingPage;
