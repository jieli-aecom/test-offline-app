export enum SupportAction {
  Upgrade = "Upgrade",
  Maintain = "Maintain",
  AddCapacity = "Add Capacity",
}

export const SUPPORT_ACTIONS: SupportAction[] = [
  SupportAction.Upgrade,
  SupportAction.Maintain,
  SupportAction.AddCapacity,
];

export const COLOR_BY_SUPPORT_ACTION: Record<SupportAction, string> = {
  [SupportAction.Upgrade]: "#61CBF3",
  [SupportAction.Maintain]: "#83E28E",
  [SupportAction.AddCapacity]: "#EE6C9A",
}