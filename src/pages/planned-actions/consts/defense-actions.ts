export enum DefenseAction {
  MoveFrom = "Move From",
  KeepSteady = "Keep Steady",
  Surge = "Surge",
  Undefined = "Undefined",
}

export const DEFENSE_ACTIONS: DefenseAction[] = [
  DefenseAction.MoveFrom,
  DefenseAction.KeepSteady,
  DefenseAction.Surge,
  DefenseAction.Undefined,
];

export const COLOR_BY_DEFENSE_ACTION: Record<DefenseAction, string> = {
  [DefenseAction.MoveFrom]: "#61CBF3",
  [DefenseAction.KeepSteady]: "#83E28E",
  [DefenseAction.Surge]: "#EE6C9A",
  [DefenseAction.Undefined]: "#E5E5E5",
}