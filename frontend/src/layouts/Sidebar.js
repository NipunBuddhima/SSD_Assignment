
import React, { useState } from "react";
import { Button, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import useCookie from "../hooks/useCookies";
import { BranchManagerRoutes } from "../routes/all_user.routes"; // Import routes variables to create order button


const Sidebar = ({navigation}) => {

  // Get cookie to show create order button
  let [getCookie, setCookie] = useCookie();

  const [dropdownOpen, setDropdownOpen] = useState({});
  const toggleDropdown = (index) => {
    setDropdownOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();


  // Create an order button appear conditions - check branch manager role id
  let buttonAppear = 'none';
  let roleId = getCookie('user-role-id'); // Get user role ID by cookies

  if(roleId == 2){
    buttonAppear = 'display';
  }

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <span className="ms-auto d-lg-none">
          <Button
            close
            size="sm"
            className="ms-auto d-lg-none"
            onClick={() => showMobilemenu()}
          ></Button>
        </span>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              {navi.subItems ? (
                <Dropdown nav isOpen={dropdownOpen[index]} toggle={() => toggleDropdown(index)}>
                  <DropdownToggle nav caret className="text-secondary py-3">
                    <i className={navi.icon}></i>
                    <span className="ms-3 d-inline-block">{navi.title}</span>
                  </DropdownToggle>
                  <DropdownMenu>
                    {navi.subItems.map((subItem, subIndex) => (
                      <DropdownItem key={subIndex}>
                        <Link
                          to={subItem.href}
                          className={
                            location.pathname === subItem.href
                              ? "text-primary nav-link py-3"
                              : "nav-link text-secondary py-3"
                          }
                        >
                          <i className={subItem.icon}></i>
                          <span className="ms-3 d-inline-block">{subItem.title}</span>
                        </Link>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              ) : (
                <Link 
                  to={navi.href}
                  className={
                    location.pathname === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </Link>
              )}
            </NavItem>
          ))}
          <Button
            style={{ display: (buttonAppear)}}
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href= {BranchManagerRoutes.addOrder}
          >
            Create an order
          </Button>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;



// Commented out router without dropdown - Ashan


// import React, { useState } from "react";
// import { Button, Nav, NavItem, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
// import Logo from "./Logo";
// import { Link, useLocation } from "react-router-dom";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: "bi bi-speedometer2",
//   },
//   {
//     title: "Order Management",
//     icon: "bi bi-box",
//     subItems: [
//       {
//         title: "Add a New Order",
//         href: "#",
//         icon: "bi bi-plus",
//       },
//       {
//         title: "All Orders",
//         href: "#",
//         icon: "bi bi-inbox",
//       },
//       {
//         title: "Received Orders",
//         href: "#",
//         icon: "bi bi-box-arrow-in-down-left",
//       },
//       {
//         title: "Track Orders",
//         href: "#",
//         icon: "bi bi-geo-alt",
//       },
//     ],
//   },
//   {
//     title: "Branch Management",
//     icon: "bi bi-house",
//     subItems: [
//       {
//         title: "Add a New Branch",
//         href: "#",
//         icon: "bi bi-house-add",
//       },
//       {
//         title: "All Branches",
//         href: "#",
//         icon: "bi bi-house-check",
//       },
//     ],
//   },
//   // {
//   //   title: "Alert",
//   //   href: "/alerts",
//   //   icon: "bi bi-bell",
//   // },
//   // {
//   //   title: "Components",
//   //   icon: "bi bi-layers",
//   //   subItems: [
//   //     {
//   //       title: "Badges",
//   //       href: "/badges",
//   //       icon: "bi bi-patch-check",
//   //     },
//   //     {
//   //       title: "Buttons",
//   //       href: "/buttons",
//   //       icon: "bi bi-hdd-stack",
//   //     },
//   //     {
//   //       title: "Cards",
//   //       href: "/cards",
//   //       icon: "bi bi-card-text",
//   //     },
//   //     {
//   //       title: "Grid",
//   //       href: "/grid",
//   //       icon: "bi bi-columns",
//   //     },
//   //     {
//   //       title: "Table",
//   //       href: "/table",
//   //       icon: "bi bi-layout-split",
//   //     },
//   //     {
//   //       title: "Forms",
//   //       href: "/forms",
//   //       icon: "bi bi-textarea-resize",
//   //     },
//   //     {
//   //       title: "Breadcrumbs",
//   //       href: "/breadcrumbs",
//   //       icon: "bi bi-link",
//   //     },
//   //   ],
//   // },
//   // {
//   //   title: "About",
//   //   href: "/about",
//   //   icon: "bi bi-people",
//   // },
// ];

// const Sidebar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   let location = useLocation();

//   return (
//     <div className="p-3">
//       <div className="d-flex align-items-center">
//         <Logo />
//         <span className="ms-auto d-lg-none">
//           <Button
//             close
//             size="sm"
//             className="ms-auto d-lg-none"
//             onClick={() => showMobilemenu()}
//           ></Button>
//         </span>
//       </div>
//       <div className="pt-4 mt-2">
//         <Nav vertical className="sidebarNav">
//           {navigation.map((navi, index) => (
//             <NavItem key={index} className="sidenav-bg">
//               {navi.subItems ? (
//                 <Dropdown nav isOpen={dropdownOpen} toggle={toggleDropdown}>
//                   <DropdownToggle nav caret className="text-secondary py-3">
//                     <i className={navi.icon}></i>
//                     <span className="ms-3 d-inline-block">{navi.title}</span>
//                   </DropdownToggle>
//                   <DropdownMenu>
//                     {navi.subItems.map((subItem, subIndex) => (
//                       <DropdownItem key={subIndex}>
//                         <Link
//                           to={subItem.href}
//                           className={
//                             location.pathname === subItem.href
//                               ? "text-primary nav-link py-3"
//                               : "nav-link text-secondary py-3"
//                           }
//                         >
//                           <i className={subItem.icon}></i>
//                           <span className="ms-3 d-inline-block">{subItem.title}</span>
//                         </Link>
//                       </DropdownItem>
//                     ))}
//                   </DropdownMenu>
//                 </Dropdown>
//               ) : (
//                 <Link
//                   to={navi.href}
//                   className={
//                     location.pathname === navi.href
//                       ? "text-primary nav-link py-3"
//                       : "nav-link text-secondary py-3"
//                   }
//                 >
//                   <i className={navi.icon}></i>
//                   <span className="ms-3 d-inline-block">{navi.title}</span>
//                 </Link>
//               )}
//             </NavItem>
//           ))}
//           <Button
//             color="danger"
//             tag="a"
//             target="_blank"
//             className="mt-3"
//             href="#"
//           >
//             Create an order
//           </Button>
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;





// import { Button, Nav, NavItem } from "reactstrap";
// import Logo from "./Logo";
// import { Link, useLocation } from "react-router-dom";

// const navigation = [
//   {
//     title: "Dashboard",
//     href: "/dashboard",
//     icon: "bi bi-speedometer2",
//   },
//   {
//     title: "Order Management",
//     href: "#",
//     icon: "bi bi-box",
//   },
//   {
//     title: "Alert",
//     href: "/alerts",
//     icon: "bi bi-bell",
//   },
//   {
//     title: "Badges",
//     href: "/badges",
//     icon: "bi bi-patch-check",
//   },
//   {
//     title: "Buttons",
//     href: "/buttons",
//     icon: "bi bi-hdd-stack",
//   },
//   {
//     title: "Cards",
//     href: "/cards",
//     icon: "bi bi-card-text",
//   },
//   {
//     title: "Grid",
//     href: "/grid",
//     icon: "bi bi-columns",
//   },
//   {
//     title: "Table",
//     href: "/table",
//     icon: "bi bi-layout-split",
//   },
//   {
//     title: "Forms",
//     href: "/forms",
//     icon: "bi bi-textarea-resize",
//   },
//   {
//     title: "Breadcrumbs",
//     href: "/breadcrumbs",
//     icon: "bi bi-link",
//   },
//   {
//     title: "About",
//     href: "/about",
//     icon: "bi bi-people",
//   },
// ];

// const Sidebar = () => {
//   const showMobilemenu = () => {
//     document.getElementById("sidebarArea").classList.toggle("showSidebar");
//   };
//   let location = useLocation();

//   return (
//     <div className="p-3">
//       <div className="d-flex align-items-center">
//         <Logo />
//         <span className="ms-auto d-lg-none">
//         <Button
//           close
//           size="sm"
//           className="ms-auto d-lg-none"
//           onClick={() => showMobilemenu()}
//         ></Button>
//         </span>
//       </div>
//       <div className="pt-4 mt-2">
//         <Nav vertical className="sidebarNav">
//           {navigation.map((navi, index) => (
//             <NavItem key={index} className="sidenav-bg">
//               <Link
//                 to={navi.href}
//                 className={
//                   location.pathname === navi.href
//                     ? "text-primary nav-link py-3"
//                     : "nav-link text-secondary py-3"
//                 }
//               >
//                 <i className={navi.icon}></i>
//                 <span className="ms-3 d-inline-block">{navi.title}</span>
//               </Link>
//             </NavItem>
//           ))}
//           <Button
//             color="danger"
//             tag="a"
//             target="_blank"
//             className="mt-3"
//             href="#"
//           >
//             Create an order
//           </Button>
//         </Nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
