import { SidebarLayout } from "../../components/sidebar-layout";
import { Sidebar } from "./components/sidebar";

export const CapabilityAssessment = () => {


  return (
    <SidebarLayout
      sidebarContent={<Sidebar />}
      mainContent={<div>Capability Assessment</div>}
    />
  );
};
