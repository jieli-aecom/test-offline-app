export enum FacilitiesAction {
  BuildNew = "Build New",
  Renovate = "Renovate",
  Reconfigure = "Reconfigure",
  Demolish = "Demolish",
  Undefined = "Undefined",
}

export const FACILITIES_ACTIONS: FacilitiesAction[] = [
  FacilitiesAction.BuildNew,
  FacilitiesAction.Renovate,
  FacilitiesAction.Reconfigure,
  FacilitiesAction.Demolish,
  FacilitiesAction.Undefined,
];

export const COLOR_BY_FACILITIES_ACTION: Record<FacilitiesAction, string> = {
  [FacilitiesAction.BuildNew]: "#61CBF3",
  [FacilitiesAction.Renovate]: "#83E28E",
  [FacilitiesAction.Reconfigure]: "#EE6C9A",
  [FacilitiesAction.Demolish]: "#F55827",
  [FacilitiesAction.Undefined]: "#E5E5E5",
}