"use client"

import * as React from "react"
import {
  CalendarDays,
  Bot,
  Search,
  FileText,
  FlaskConical,
  Home,
  Inbox,
  Receipt,
  Settings2,
  Stethoscope,
  Pill,
  LogOut,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Patient Jane",
    email: "jane.doe@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Example Clinic", logo: Home, plan: "Patient" },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        { title: "Overview", url: "/dashboard" },
      ],
    },
    {
      title: "AI Symptom Checker",
      url: "/booking/symptoms",
      icon: Bot,
      items: [
        { title: "New Check", url: "/booking/symptoms" },
        { title: "History", url: "/booking/symptoms/history" },
      ],
    },
    {
      title: "Browse Providers",
      url: "/providers",
      icon: Search,
      items: [
        { title: "All Providers", url: "/providers" },
        { title: "Specialties", url: "/providers/specialties" },
      ],
    },
    {
      title: "Appointments",
      url: "/dashboard/appointments",
      icon: CalendarDays,
      items: [
        { title: "Upcoming", url: "/dashboard/appointments" },
        { title: "History", url: "/dashboard/appointments/history" },
      ],
    },
    {
      title: "Messages",
      url: "/dashboard/messages",
      icon: Inbox,
      items: [
        { title: "Inbox", url: "/dashboard/messages" },
        { title: "Compose", url: "/dashboard/messages/compose" },
      ],
    },
    {
      title: "Lab Results",
      url: "/dashboard/labs",
      icon: FlaskConical,
      items: [
        { title: "Recent", url: "/dashboard/labs" },
        { title: "All Results", url: "/dashboard/labs/all" },
      ],
    },
    {
      title: "Medications",
      url: "/dashboard/medications",
      icon: Pill,
      items: [
        { title: "Active", url: "/dashboard/medications" },
        { title: "Refills", url: "/dashboard/medications/refills" },
      ],
    },
    {
      title: "Documents",
      url: "/dashboard/documents",
      icon: FileText,
      items: [
        { title: "Forms", url: "/dashboard/documents/forms" },
        { title: "Records", url: "/dashboard/documents/records" },
      ],
    },
    {
      title: "Billing",
      url: "/dashboard/billing",
      icon: Receipt,
      items: [
        { title: "Statements", url: "/dashboard/billing" },
        { title: "Payments", url: "/dashboard/billing/payments" },
      ],
    },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        { title: "Profile", url: "/dashboard/settings/profile" },
        { title: "Preferences", url: "/dashboard/settings/preferences" },
      ],
    },
    {
      title: "Logout",
      url: "/logout",
      icon: LogOut,
      items: [],
    },
  ],
  projects: [
    { name: "Care Plan", url: "#", icon: Stethoscope },
  ],
}

export function PatientSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}


