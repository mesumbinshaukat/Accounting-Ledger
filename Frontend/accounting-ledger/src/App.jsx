import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "./components/ui/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar"

function App() {
  const token = localStorage.getItem("token")
  if(!token) {
    console.log("Token not found")
    return <Outlet />
  }
  console.log("Token found")
  return <>
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="ml-0 transition-all duration-300 ease-in-out">
        <Outlet />
      </main>
    </SidebarProvider>
    </>
}

export default App;
