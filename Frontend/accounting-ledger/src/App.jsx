import { Outlet } from 'react-router-dom'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/Sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function App() {

  return (
    <>
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        
   <Outlet/>
      </main>
    </SidebarProvider>
    </>
  )
}

export default App
