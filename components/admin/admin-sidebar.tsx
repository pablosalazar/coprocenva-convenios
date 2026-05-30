"use client"

import {
  HandshakeIcon,
  LayoutDashboardIcon,
  NewspaperIcon,
  TrendingUpIcon,
  UsersIcon,
} from "lucide-react"

import { NavMain } from "@/components/admin/nav-main"
import { NavUser } from "@/components/admin/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

const navItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Convenios",
    url: "/admin/convenios",
    icon: <HandshakeIcon />,
    items: [
      { title: "Beneficios", url: "/admin/convenios/beneficios" },
      { title: "Categorías", url: "/admin/convenios/categorias" },
      { title: "Aliados", url: "/admin/convenios/aliados" },
    ],
  },
  {
    title: "Asociados",
    url: "/admin/asociados",
    icon: <UsersIcon />,
  },
  {
    title: "Balances",
    url: "/admin/balances",
    icon: <TrendingUpIcon />,
    items: [
      { title: "Bonos", url: "/admin/balances/bonos" },
      { title: "Votos / calificaciones", url: "/admin/balances/votos" },
    ],
  },
  {
    title: "Contenidos",
    url: "/admin/contenidos",
    icon: <NewspaperIcon />,
  },
]

// Placeholder — replace with real session data once auth is implemented
const currentUser = {
  name: "Administrador",
  email: "admin@coprocenva.com",
  avatar: "",
}

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground text-xs font-bold">
                CP
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Coprocenva</span>
                <span className="truncate text-xs text-muted-foreground">
                  Panel Admin
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain label="Gestión" items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
