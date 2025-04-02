import "./App.css";
import { DrawerAppBar, Page } from "./components/DrawerAppBar";
import { ReactNode, useState } from "react";

function App() {
  const [page, setPage] = useState<Page>(Page.Introduction);
  const pageComponent : ReactNode =
    page === Page.Introduction ? (
      <div>Introduction</div>
    ) : page === Page.ManageScenarios ? (
      <div>Manage Scenarios</div>
    ) : page === Page.ScenarioParameters ? (
      <div>Scenario Parameters</div>
    ) : page === Page.CapabilityReview ? (
      <div>Capability Review</div>
    ) : page === Page.PlannedActions ? (
      <div>Planned Actions</div>
    ) : page === Page.CapabilityAssessment ? (
      <div>Capability Assessment</div>
    ) : page === Page.Reports ? (
      <div>Reports</div>
    ) : page === Page.DataManager ? (
      <div>Data Manager</div>
    ) : null;
  return <DrawerAppBar setPage={setPage}>{pageComponent}</DrawerAppBar>;
}

export default App;
