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
  {
    id: 2,
    route: "/",
    label: "Meet The Pack",
    routes: [
      {
        id: 1,
        route: "/meet-dr-sylvester-awagu",
        label: "Meet Dr. Sylvester Awagu",
        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"healthicons:doctor-male-outline"}
            />
          ),
          iconClass: "bg-[#F7F3FF] text-[#5852E2]",
        },
      },
      {
        id: 2,
        route: "/meet-dr-patrick-moore",
        label: "Meet Dr. Patrick Moore",
        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"healthicons:doctor-male-outline"}
            />
          ),
          iconClass: "bg-[#FFF7F1] text-[#FFBA00]",
        },
      },
      {
        id: 3,
        route: "/meet-dr-donald-mills",
        label: "Meet Dr. Donald Mills",

        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"healthicons:doctor-male-outline"}
            />
          ),
          iconClass: "bg-[#F9FFEC] text-[#81B807]",
        },
      },
      {
        id: 4,
        route: "/meet-the-team",
        label: "Meet The Team",
        icon: {
          element: (
            <Icon className="text-[24px]" icon={"pepicons-pencil:people"} />
          ),
          iconClass: "bg-[#FFEBF7] text-[#90095A]",
        },
      },
      {
        id: 5,
        route: "/what-sets-us-apart",
        label: "What Sets Us Apart",
        icon: {
          element: (
            <Icon className="text-[20px]" icon={"fluent-mdl2:add-group"} />
          ),
          iconClass: "bg-[#F9FFEC] text-[#81B807]",
        },
      },
    ],
  },
  {
    id: 3,
    route: "/",
    label: "Visiting The Jungle",
    className: "lg:w-[500px]",
    routes: [
      {
        id: 1,
        route: "/office-visits",
        label: "Office Visits",
        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"mdi:office-building-marker-outline"}
            />
          ),
          iconClass: "bg-[#F7F3FF] text-[#5852E2]",
        },
      },
      {
        id: 2,
        route: "/financial-information",
        label: "Financial Information",
        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"arcticons:home-finance"}
            />
          ),
          iconClass: "bg-[#FFF7F1] text-[#FFBA00]",
        },
      },
      {
        id: 3,
        route: "/patient-forms",
        label: "Patient Forms",

        icon: {
          element: (
            <Icon
              strokeWidth={3}
              className="text-[24px]"
              icon={"clarity:form-line"}
            />
          ),
          iconClass: "bg-[#F9FFEC] text-[#81B807]",
        },
      },
      {
        id: 4,
        route: "/testimonials",
        label: "Testimonials",
        icon: {
          element: (
            <Icon className="text-[24px]" icon={"dashicons:testimonial"} />
          ),
          iconClass: "bg-[#FFEBF7] text-[#90095A]",
        },
      },
    ],
  },
  {
    id: 4,
    route: "/",
    label: "Pediatrics",
    className:
      "w-[300px] p-2 md:grid-cols-1 xl:grid-cols-2 md:w-[300px] lg:w-[300px] xl:w-[500px]",
    routes: [
      {
        id: 1,
        route: "/pediatric-dentistry",
        label: "Pediatric Dentistry",
        icon: {
          element: <Icon className="text-[30px]" icon={"bx:child"} />,
          iconClass: "bg-[#FFEBF7] text-[#90095A]",
        },
      },
      // {
      //   id: 2,
      //   route: "/practice-papers",
      //   label: "Practice Papers",
      //   icon: {
      //     element: <Icon className="text-[24px]" icon={"hugeicons:task-01"} />,
      //     iconClass: "bg-[#F7F3FF] text-[#5852E2]",
      //   },
      // },
      // {
      //   id: 3,
      //   route: "/lb-online",
      //   label: "LB 11+ Online",
      //   icon: {
      //     element: (
      //       <Icon
      //         className="text-[20px]"
      //         icon={"flowbite:laptop-file-outline"}
      //       />
      //     ),
      //     iconClass: "bg-[#FFF7F1] text-[#FFBA00]",
      //   },
      // },
      // {
      //   id: 4,
      //   route: "/online-clinic",
      //   label: "Online Clinic",

      //   icon: {
      //     element: (
      //       <Icon
      //         className="text-[22px]"
      //         icon={"flowbite:school-check-outline"}
      //       />
      //     ),
      //     iconClass: "bg-[#F7F3FF] text-[#5852E2]",
      //   },
      // },
      // {
      //   id: 5,
      //   route: "/free-resources",
      //   label: "Free Resources",
      //   icon: {
      //     element: <Icon className="text-[20px]" icon={"hugeicons:books-02"} />,
      //     iconClass: "bg-[#FFEBF7] text-[#90095A]",
      //   },
      // },
      // {
      //   id: 6,
      //   route: "/secondary",
      //   label: "Secondary",
      //   icon: {
      //     element: <Icon className="text-[20px]" icon={"ion:school-outline"} />,
      //     iconClass: "bg-[#F9FFEC] text-[#81B807]",
      //   },
      // },
    ],
  },
  {
    id: 5,
    route: "/",
    label: "Orthodontics",
    className:
      "w-[230px] p-2 md:grid-cols-1 xl:grid-cols-2 md:w-[230px] lg:w-[230px] xl:w-[500px]",
    routes: [
      {
        id: 1,
        route: "/about-orthodontics",
        label: "About Orthodontics",
        icon: {
          element: (
            <Icon className="text-[30px]" icon={"icon-park-outline:teeth"} />
          ),
          iconClass: "bg-[#FFEBF7] text-[#90095A]",
        },
      },
      // {
      //   id: 2,
      //   route: "/practice-papers",
      //   label: "Practice Papers",
      //   icon: {
      //     element: <Icon className="text-[24px]" icon={"hugeicons:task-01"} />,
      //     iconClass: "bg-[#F7F3FF] text-[#5852E2]",
      //   },
      // },
      // {
      //   id: 3,
      //   route: "/lb-online",
      //   label: "LB 11+ Online",
      //   icon: {
      //     element: (
      //       <Icon
      //         className="text-[20px]"
      //         icon={"flowbite:laptop-file-outline"}
      //       />
      //     ),
      //     iconClass: "bg-[#FFF7F1] text-[#FFBA00]",
      //   },
      // },
      // {
      //   id: 4,
      //   route: "/online-clinic",
      //   label: "Online Clinic",

      //   icon: {
      //     element: (
      //       <Icon
      //         className="text-[22px]"
      //         icon={"flowbite:school-check-outline"}
      //       />
      //     ),
      //     iconClass: "bg-[#F7F3FF] text-[#5852E2]",
      //   },
      // },
      // {
      //   id: 5,
      //   route: "/free-resources",
      //   label: "Free Resources",
      //   icon: {
      //     element: <Icon className="text-[20px]" icon={"hugeicons:books-02"} />,
      //     iconClass: "bg-[#FFEBF7] text-[#90095A]",
      //   },
      // },
      // {
      //   id: 6,
      //   route: "/secondary",
      //   label: "Secondary",
      //   icon: {
      //     element: <Icon className="text-[20px]" icon={"ion:school-outline"} />,
      //     iconClass: "bg-[#F9FFEC] text-[#81B807]",
      //   },
      // },
    ],
  },
  {
    id: 6,
    route: "/contact-us",
    label: "Contact Us",
    className: "w-[300px] p-2 md:w-[300px] lg:w-[300px]",
  },
];
