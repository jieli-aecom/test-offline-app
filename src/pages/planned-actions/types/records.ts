import { AppTableRow, TableColumnDefinition } from "../../../components/app-table/types"
import { DEFENSE_ACTIONS, DefenseAction } from "../consts/defense-actions";
import { FACILITIES_ACTIONS, FacilitiesAction } from "../consts/facilities-actions";
import { Location } from "../consts/locations"
import { PRIORITIES, Priority } from "../consts/priorities"
import { SUPPORT_ACTIONS, SupportAction } from "../consts/support-actions";

export interface PriorityRecord extends AppTableRow {
  [Location.NSRota]: Priority;
  [Location.NSANaples]: Priority;
  [Location.NASSigonella]: Priority;
  [Location.NSASoudaBay]: Priority;
  [Location.NSFDeveselu]: Priority;
  [Location.NSFRedzikowo]: Priority;
  [Location.Lossiemouth]: Priority;
  [Location.Crombie]: Priority;
  [Location.Keflavik]: Priority;
  [Location.Grindavik]: Priority;
  [Location.Evenes]: Priority;
  [Location.Ramsund]: Priority;
}

export const priorityFields: (keyof PriorityRecord)[] = [
  Location.NSRota,
  Location.NSANaples,
  Location.NASSigonella,
  Location.NSASoudaBay,
  Location.NSFDeveselu,
  Location.NSFRedzikowo,
  Location.Lossiemouth,
  Location.Crombie,
  Location.Keflavik,
  Location.Grindavik,
  Location.Evenes,
  Location.Ramsund
]

export interface DefenseRecord extends AppTableRow {
  Id: number;
  Selected: number;
  Item: string;
  Priority: Priority;
  [Location.NSRota]: DefenseAction;
  [Location.NSANaples]: DefenseAction;
  [Location.NASSigonella]: DefenseAction;
  [Location.NSASoudaBay]: DefenseAction;
  [Location.NSFDeveselu]: DefenseAction;
  [Location.NSFRedzikowo]: DefenseAction;
  [Location.Lossiemouth]: DefenseAction;
  [Location.Crombie]: DefenseAction;
  [Location.Keflavik]: DefenseAction;
  [Location.Grindavik]: DefenseAction;
  [Location.Evenes]: DefenseAction;
  [Location.Ramsund]: DefenseAction;
}

export interface SupportRecord extends AppTableRow {
  Id: number;
  Selected: number;
  Item: string;
  Priority: Priority;
  [Location.NSRota]: SupportAction;
  [Location.NSANaples]: SupportAction;
  [Location.NASSigonella]: SupportAction;
  [Location.NSASoudaBay]: SupportAction;
  [Location.NSFDeveselu]: SupportAction;
  [Location.NSFRedzikowo]: SupportAction;
  [Location.Lossiemouth]: SupportAction;
  [Location.Crombie]: SupportAction;
  [Location.Keflavik]: SupportAction;
  [Location.Grindavik]: SupportAction;
  [Location.Evenes]: SupportAction;
  [Location.Ramsund]: SupportAction;
}

export interface FacilitiesRecord extends AppTableRow {
  Id: number;
  Selected: number;
  Item: string;
  Priority: Priority;
  [Location.NSRota]: FacilitiesAction;
  [Location.NSANaples]: FacilitiesAction;
  [Location.NASSigonella]: FacilitiesAction;
  [Location.NSASoudaBay]: FacilitiesAction;
  [Location.NSFDeveselu]: FacilitiesAction;
  [Location.NSFRedzikowo]: FacilitiesAction;
  [Location.Lossiemouth]: FacilitiesAction;
  [Location.Crombie]: FacilitiesAction;
  [Location.Keflavik]: FacilitiesAction;
  [Location.Grindavik]: FacilitiesAction;
  [Location.Evenes]: FacilitiesAction;
  [Location.Ramsund]: FacilitiesAction;
}

export const actionFields: (keyof (DefenseRecord | SupportRecord | FacilitiesRecord))[] = [
  "Item",
  "Priority",
  Location.NSRota,
  Location.NSANaples,
  Location.NASSigonella,
  Location.NSASoudaBay,
  Location.NSFDeveselu,
  Location.NSFRedzikowo,
  Location.Lossiemouth,
  Location.Crombie,
  Location.Keflavik,
  Location.Grindavik,
  Location.Evenes,
  Location.Ramsund
]

export const priorityColumnDefinitions : TableColumnDefinition<PriorityRecord>[] = [
  {
    id: Location.NSRota,
    label: "NS Rota",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSANaples,
    label: "NSA Naples",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },

  {
    id: Location.NASSigonella,
    label: "NAS Sigonella",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSASoudaBay,
    label: "NSA Souda Bay",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSFDeveselu,
    label: "NSF Deveselu",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSFRedzikowo,
    label: "NSF Redzikowo",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Lossiemouth,
    label: "Lossiemouth",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Crombie,
    label: "Crombie",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Keflavik,
    label: "Keflavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Grindavik,
    label: "Grindavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Evenes,
    label: "Evenes",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.Ramsund,
    label: "Ramsund",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  }
]

export const defenseColumnDefinitions : TableColumnDefinition<DefenseRecord>[] = [
  {
    id: "Item",
    label: "Category",
    numeric: false,
    width: "10rem",
    editable: true,
  },
  {
    id: "Priority",
    label: "Priority",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSRota,
    label: "NS Rota",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.NSANaples,
    label: "NSA Naples",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },

  {
    id: Location.NASSigonella,
    label: "NAS Sigonella",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.NSASoudaBay,
    label: "NSA Souda Bay",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.NSFDeveselu,
    label: "NSF Deveselu",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.NSFRedzikowo,
    label: "NSF Redzikowo",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Lossiemouth,
    label: "Lossiemouth",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Crombie,
    label: "Crombie",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Keflavik,
    label: "Keflavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Grindavik,
    label: "Grindavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Evenes,
    label: "Evenes",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  },
  {
    id: Location.Ramsund,
    label: "Ramsund",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: DEFENSE_ACTIONS,
  }
]

export const supportColumnDefinitions : TableColumnDefinition<SupportRecord>[] = [
  {
    id: "Item",
    label: "Category",
    numeric: false,
    width: "10rem",
    editable: true,
  },
  {
    id: "Priority",
    label: "Priority",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSRota,
    label: "NS Rota",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.NSANaples,
    label: "NSA Naples",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },

  {
    id: Location.NASSigonella,
    label: "NAS Sigonella",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.NSASoudaBay,
    label: "NSA Souda Bay",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.NSFDeveselu,
    label: "NSF Deveselu",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.NSFRedzikowo,
    label: "NSF Redzikowo",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Lossiemouth,
    label: "Lossiemouth",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Crombie,
    label: "Crombie",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Keflavik,
    label: "Keflavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Grindavik,
    label: "Grindavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Evenes,
    label: "Evenes",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  },
  {
    id: Location.Ramsund,
    label: "Ramsund",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: SUPPORT_ACTIONS,
  }
]

export const facilitiesColumnDefinitions : TableColumnDefinition<FacilitiesRecord>[] = [
  {
    id: "Item",
    label: "Category",
    numeric: false,
    width: "10rem",
    editable: true,
  },
  {
    id: "Priority",
    label: "Priority",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: PRIORITIES,
  },
  {
    id: Location.NSRota,
    label: "NS Rota",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.NSANaples,
    label: "NSA Naples",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },

  {
    id: Location.NASSigonella,
    label: "NAS Sigonella",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.NSASoudaBay,
    label: "NSA Souda Bay",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.NSFDeveselu,
    label: "NSF Deveselu",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.NSFRedzikowo,
    label: "NSF Redzikowo",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Lossiemouth,
    label: "Lossiemouth",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Crombie,
    label: "Crombie",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Keflavik,
    label: "Keflavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Grindavik,
    label: "Grindavik",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Evenes,
    label: "Evenes",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  },
  {
    id: Location.Ramsund,
    label: "Ramsund",
    numeric: false,
    width: "8rem",
    editable: true,
    dropdown: true,
    dropdownOptions: FACILITIES_ACTIONS,
  }
]