import { LinkProp } from "@/types";
import { Icon } from "@iconify/react";

// export const NAVIGATION_LINKS: LinkProp[] = [
//   { id: 1, route: "/", label: "Home" },
//   { id: 2, route: "/about-us", label: "About Us" },
//   {
//     id: 3,
//     route: "/",
//     routes: [
//       {
//         id: 1,
//         route: "/initial-assessment",
//         label: "Initial Assessment",
//       },
//       {
//         id: 2,
//         route: "/practice-papers",
//         label: "Practice Papers",
//       },
//       {
//         id: 3,
//         route: "/lb-online",
//         label: "LB 11+ Online",
//       },
//       {
//         id: 4,
//         route: "/online-clinic",
//         label: "Online Clinic",
//       },
//       {
//         id: 5,
//         route: "/free-resources",
//         label: "Free Resources",
//       },
//       {
//         id: 5,
//         route: "/secondary",
//         label: "Secondary",
//       },
//     ],
//     label: "Products",
//   },
//   { id: 4, route: "/schools", label: "Schools" },
//   {
//     id: 5,
//     route: "/local-education-authority",
//     label: "Local Education Authority",
//   },

//   { id: 6, route: "/blog", label: "Blog" },
//   { id: 7, route: "/contact-us", label: "Contact Us" },
// ];

export const NAVIGATION_LINKS: LinkProp[] = [
  { id: 1, route: "/", label: "Home" },
  { id: 2, route: "/search", label: "Rent a Car" },
  {
    id: 3,
    route: "/become-a-host",
    label: "Become a Host",
  },
  {
    id: 4,
    route: "/about-us",
    label: "About Us",
    className: "lg:w-[500px]",
  },

  {
    id: 5,
    route: "/contact-us",
    label: "Contact Us",
    className:
      "w-[230px] p-2 md:grid-cols-1 xl:grid-cols-2 md:w-[230px] lg:w-[230px] xl:w-[500px]",
  },
  {
    id: 6,
    route: "/blog",
    label: "Blog",
    className: "w-[300px] p-2 md:w-[300px] lg:w-[300px]",
  },
];
