export enum DefenseAction {
  MoveFrom = "Move From",
  KeepSteady = "Keep Steady",
  Surge = "Surge",
}

export const DEFENSE_ACTIONS: DefenseAction[] = [
  DefenseAction.MoveFrom,
  DefenseAction.KeepSteady,
  DefenseAction.Surge,
];

export const COLOR_BY_DEFENSE_ACTION: Record<DefenseAction, string> = {
  [DefenseAction.MoveFrom]: "#61CBF3",
  [DefenseAction.KeepSteady]: "#83E28E",
  [DefenseAction.Surge]: "#EE6C9A",
}