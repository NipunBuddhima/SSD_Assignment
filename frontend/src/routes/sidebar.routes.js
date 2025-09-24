import { BranchManagerRoutes, DeliveryPersonRoutes, TransportAgentRoutes, ManagerRoutes, ClientRoutes} from "./all_user.routes.js";

let SidebarRoutes = {};

// Branch Manager
SidebarRoutes.branchManagerRoutes = [
    {
      title: "Dashboard",
      href: BranchManagerRoutes.dashboard,
      icon: "bi bi-speedometer2",
    },
    {
      title: "Client Management",
      icon: "bi bi-person",
      subItems: [
        {
          title: "Add a New Client",
          href: BranchManagerRoutes.addClient,
          icon: "bi bi-person-add",
        },
        {
          title: "All Clients",
          href: BranchManagerRoutes.viewClients,
          icon: "bi bi-person",
        },
      ],
    },
    {
      title: "Order Management",
      icon: "bi bi-box",
      subItems: [
        {
          title: "Add a New Order",
          href: BranchManagerRoutes.addOrder,
          icon: "bi bi-plus",
        },
        {
          title: "Outgoing Orders",
          href: BranchManagerRoutes.viewOrders,
          icon: "bi bi-inbox",
        },
        {
          title: "Incoming Orders",
          href: BranchManagerRoutes.incomingOrders,
          icon: "bi bi-box-arrow-in-down-right",
        },
        {
          title: "Received Orders",
          href: BranchManagerRoutes.viewReceivedOrders,
          icon: "bi bi-box-arrow-in-down-left",
        },
        {
          title: "Track Orders",
          href: BranchManagerRoutes.trackOrder,
          icon: "bi bi-geo-alt",
        },
      ],
    },
    {
      title: "Delivery Management ",
      icon: "bi bi-airplane",
      subItems: [
        {
          title: "Add a Delivery Person",
          href: BranchManagerRoutes.addDeliveryPerson,
          icon: "bi bi-person-add",
        },
        {
          title: "All Delivery Persons",
          href: BranchManagerRoutes.viewDeliveryPersons,
          icon: "bi bi-person",
        },
      ],
    },
    {
      title: "C. Affair Management ",
      icon: "bi bi-telephone-inbound",
      subItems: [
        {
          title: "Add a New Ticket",
          href: BranchManagerRoutes.addTicket,
          icon: "bi bi-envelope-plus",
        },
        {
          title: "All Tickets",
          href:BranchManagerRoutes.viewTicket,
          icon: "bi bi-envelope",
        },
      ],
    },
    {
      title: "Quality Management ",
      icon: "bi bi-star",
      subItems: [
        {
          title: "Add a Feedback",
          href: BranchManagerRoutes.addFeedback,
          icon: "bi bi-star",
        },
        {
          title: "All Feedbacks",
          href: BranchManagerRoutes.viewFeedback,
          icon: "bi bi-star-half",
        },
      ],
    },
    // {
    //   title: "Components",
    //   icon: "bi bi-layers",
    //   subItems: [
    //     {
    //       title: "Badges",
    //       href: "/branch-manager/badges",
    //       icon: "bi bi-patch-check",
    //     },
    //     {
    //       title: "Buttons",
    //       href: "/branch-manager/buttons",
    //       icon: "bi bi-hdd-stack",
    //     },
    //     {
    //       title: "Cards",
    //       href: "/branch-manager/cards",
    //       icon: "bi bi-card-text",
    //     },
    //     {
    //       title: "Grid",
    //       href: "/branch-manager/grid",
    //       icon: "bi bi-columns",
    //     },
    //     {
    //       title: "Table",
    //       href: "/branch-manager/table",
    //       icon: "bi bi-layout-split",
    //     },
    //     {
    //       title: "Forms",
    //       href: "/branch-manager/forms",
    //       icon: "bi bi-textarea-resize",
    //     },
    //     {
    //       title: "Breadcrumbs",
    //       href: "/branch-manager/breadcrumbs",
    //       icon: "bi bi-link",
    //     },
    //   ],
    // },
  ];

// Delivery Person
  SidebarRoutes.deliveryPersonRoutes = [
    {
      title: "Dashboard",
      href: DeliveryPersonRoutes.dashboard,
      icon: "bi bi-speedometer2",
    },
    {
      title: "Show Deliveries",
      icon: "bi bi-box",
      href: DeliveryPersonRoutes.viewMyOrders,
    },
  ];
  
// Transport Agent
SidebarRoutes.transportAgentRoutes = [
  {
    title: "Dashboard",
    href: TransportAgentRoutes.dashboard,
    icon: "bi bi-speedometer2",
  },
  {
    title: "Show Transports",
    icon: "bi bi-box",
    href: TransportAgentRoutes.viewMyOrders,
  },
  {
    title: "View My Route",
    icon: "bi bi-box",
    href: TransportAgentRoutes.viewMyRoute,
  }
];

// Manager
SidebarRoutes.managerRoutes = [
  {
    title: "Dashboard",
    href: ManagerRoutes.dashboard,
    icon: "bi bi-speedometer2",
  },
  {
    title: "Branch Mangement",
    icon: "bi bi-box",
    subItems: [
      {
        title: "Add a Branch",
        icon: "bi bi-box",
        href: ManagerRoutes.addBranch,
      },
      {
        title: "View Branches",
        icon: "bi bi-box",
        href: ManagerRoutes.viewBranches,
      }
    ],
  },
  {
    title: "Transport Management",
    icon: "bi bi-box",
    subItems: [
      {
        title: "Add a Transport Agent",
        icon: "bi bi-box",
        href: ManagerRoutes.addTransportAgent 
      },
      {
        title: "View Transport Agents",
        icon: "bi bi-box",
        href: ManagerRoutes.viewTransportAgents
      }
    ]
  },
  {
    title: "Route Management",
    icon: "bi bi-box",
    subItems: [
      {
        title: "Add a Route",
        icon: "bi bi-box",
        href: ManagerRoutes.addRoute
      },
      {
        title: "View Routes",
        icon: "bi bi-box",
        href: ManagerRoutes.viewRoute
      }
    ]
  }
];

// Client
SidebarRoutes.clientRoutes = [
  {
    title: "Dashboard",
    href: ClientRoutes.dashboard,
    icon: "bi bi-speedometer2",
  },
  {
    title: "Order Management",
    icon: "bi bi-box",
    subItems: [
      {
        title: "View My Orders",
        href: ClientRoutes.myOrders,
        icon: "bi bi-box",
      },
      {
        title: "Track Order",
        href: ClientRoutes.trackOrder,
        icon: "bi bi-box",
      },
    ],
  },
  {
    title: "Profile Management",
    icon: "bi bi-person",
    subItems: [
      {
        title: "View Profile",
        icon: "bi bi-person",
        href: ClientRoutes.viewProfile,
      },
      {
        title: "Change Password",
        icon: "bi bi-person",
        href: ClientRoutes.updateProfilePassword,
      },
    ],
  },
  {
    title: "Customer Support",
    icon: "bi bi-person",
    subItems: [
      {
        title: "New Ticket",
        icon: "bi bi-ticket",
        href: ClientRoutes.addTicket,
      },
      {
        title: "View My Tickets",
        icon: "bi bi-ticket",
        href: ClientRoutes.viewMyTickets,
      },
    ],
  },
  {
    title: "Feedback",
    icon: "bi bi-star",
    subItems: [
      {
        title: "Provide Feedback",
        icon: "bi bi-person",
        href: ClientRoutes.addFeedback,
      },
      {
        title: "View My Feedbacks",
        icon: "bi bi-person",
        href: ClientRoutes.viewFeedback,
      }
    ],
  },
];

export default SidebarRoutes;