import "./App.css";
import { MainLayout, Page } from "./components/main-layout";
import { ReactNode, useState } from "react";
import { Introduction } from "./pages/introduction/introduction";
import { DataManager } from "./pages/data-manager/data-manager";
import { ScenarioParameters } from "./pages/scenario-parameters/scenario-parameters";
import { CapabilityReview } from "./pages/capability-review/capability-review";
import { CapabilityAssessment } from "./pages/capability-assessment/capability-assessment";
import { PlannedActions } from "./pages/planned-actions/planned-actions";
import { ManageScenarios } from "./pages/manage-scenarios/manage-scenarios";
import { Reports } from "./pages/reports/reports";

function App() {
  const [page, setPage] = useState<Page>(Page.PlannedActions);

  // Browser router cannot be used 
  // because this app is a static HTML page
  const pageComponent : ReactNode =
    page === Page.Introduction ? (
      <Introduction />
    ) : page === Page.ManageScenarios ? (
      <ManageScenarios />
    ) : page === Page.ScenarioParameters ? (
      <ScenarioParameters />
    ) : page === Page.CapabilityReview ? (
      <CapabilityReview />
    ) : page === Page.PlannedActions ? (
      <PlannedActions />
    ) : page === Page.CapabilityAssessment ? (
      <CapabilityAssessment />
    ) : page === Page.Reports ? (
      <Reports />
    ) : page === Page.DataManager ? (
      <DataManager />
    ) : null;
  return <MainLayout setPage={setPage}>{pageComponent}</MainLayout>;
}

export default App;
