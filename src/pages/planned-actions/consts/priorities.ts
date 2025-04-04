export enum Priority {
  Low = "Low",
  Moderate = "Moderate",
  High = "High",
  ExtremelyHigh = "Extremely High",
  Exclude = "Exclude",
}

export const PRIORITIES: Priority[] = [Priority.Low, Priority.Moderate, Priority.High, Priority.ExtremelyHigh];

export const COLOR_BY_PRIORITY: Record<Priority, string> = {
  [Priority.Low]: "#FFFF99",
  [Priority.Moderate]: "#83E28E",
  [Priority.High]: "#F1A983",
  [Priority.ExtremelyHigh]: "#BE5014",
  [Priority.Exclude]: "#bbbbbb",
};