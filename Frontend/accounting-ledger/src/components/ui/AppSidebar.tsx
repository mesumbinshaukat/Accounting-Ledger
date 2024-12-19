import React from "react"
import { ArrowRightLeft, Home, NotebookPen, Search, Settings, User2, ChevronUp } from "lucide-react"
import { Link } from "react-router-dom"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/Sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/Dropdown-menu"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Create Ledger",
    url: "/dashboard/create-account",
    icon: NotebookPen,
  },
  {
    title: "Create Transaction",
    url: "/dashboard/create-transaction",
    icon: ArrowRightLeft,
  },
]

export function AppSidebar() {
  return (
    <Sidebar className="dark" side="left" variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>DASHBOARD</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton className="text-white" asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="text-white">
                    <User2 /> Username
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}



// import React from "react";
// import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuItem } from "@/components/ui/Sidebar";
// import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
// import { useSidebar } from "./SidebarContext";

// const items = [
//   { title: "Home", url: "#", icon: Home },
//   { title: "Inbox", url: "#", icon: Inbox },
//   { title: "Calendar", url: "#", icon: Calendar },
//   { title: "Search", url: "#", icon: Search },
//   { title: "Settings", url: "#", icon: Settings },
// ];

// export function AppSidebar() {
//   const { isOpen } = useSidebar(); // Access context here

//   return (
//     <Sidebar
//       className={`fixed top-0 left-0 h-full w-64 transform ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } transition-transform duration-300 ease-in-out`}
//     >
//       <SidebarContent>
//         <SidebarMenu>
//           {items.map((item) => (
//             <SidebarMenuItem key={item.title}>
//               <item.icon className="mr-2" />
//               {item.title}
//             </SidebarMenuItem>
//           ))}
//         </SidebarMenu>
//       </SidebarContent>
//     </Sidebar>
//   );
// }
