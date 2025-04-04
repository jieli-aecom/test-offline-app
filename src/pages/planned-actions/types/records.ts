import {
  AppTableRow,
  TableColumnDefinition,
} from "../../../components/app-table/types";
import {
  COLOR_BY_DEFENSE_ACTION,
  DEFENSE_ACTIONS,
  DefenseAction,
} from "../consts/defense-actions";
import {
  COLOR_BY_FACILITIES_ACTION,
  FACILITIES_ACTIONS,
  FacilitiesAction,
} from "../consts/facilities-actions";
import { Location } from "../consts/locations";
import { COLOR_BY_PRIORITY, PRIORITIES, Priority } from "../consts/priorities";
import {
  COLOR_BY_SUPPORT_ACTION,
  SUPPORT_ACTIONS,
  SupportAction,
} from "../consts/support-actions";

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
  Location.Ramsund,
];

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

export const actionFields: (keyof (
  | DefenseRecord
  | SupportRecord
  | FacilitiesRecord
))[] = [
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
  Location.Ramsund,
];

export const priorityColumnDefinitions: TableColumnDefinition<PriorityRecord>[] =
  [
    {
      id: Location.NSRota,
      label: "NS Rota",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSANaples,
      label: "NSA Naples",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },

    {
      id: Location.NASSigonella,
      label: "NAS Sigonella",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSASoudaBay,
      label: "NSA Souda Bay",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSFDeveselu,
      label: "NSF Deveselu",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSFRedzikowo,
      label: "NSF Redzikowo",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Lossiemouth,
      label: "Lossiemouth",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Crombie,
      label: "Crombie",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Keflavik,
      label: "Keflavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Grindavik,
      label: "Grindavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Evenes,
      label: "Evenes",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.Ramsund,
      label: "Ramsund",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
  ];

export const defenseColumnDefinitions: TableColumnDefinition<DefenseRecord>[] =
  [
    {
      id: "Item",
      label: "Category",
      numeric: false,
      width: "8rem",
      editable: false,
    },
    {
      id: "Priority",
      label: "Priority",
      numeric: false,
      width: "5rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSRota,
      label: "NS Rota",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.NSANaples,
      label: "NSA Naples",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },

    {
      id: Location.NASSigonella,
      label: "NAS Sigonella",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.NSASoudaBay,
      label: "NSA Souda Bay",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.NSFDeveselu,
      label: "NSF Deveselu",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.NSFRedzikowo,
      label: "NSF Redzikowo",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Lossiemouth,
      label: "Lossiemouth",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Crombie,
      label: "Crombie",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Keflavik,
      label: "Keflavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Grindavik,
      label: "Grindavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Evenes,
      label: "Evenes",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
    {
      id: Location.Ramsund,
      label: "Ramsund",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: DEFENSE_ACTIONS,
      color: (value: string) =>
        COLOR_BY_DEFENSE_ACTION[value as DefenseAction] || "#E5E5E5",
    },
  ];

export const supportColumnDefinitions: TableColumnDefinition<SupportRecord>[] =
  [
    {
      id: "Item",
      label: "Category",
      numeric: false,
      width: "8rem",
      editable: false,
    },
    {
      id: "Priority",
      label: "Priority",
      numeric: false,
      width: "5rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSRota,
      label: "NS Rota",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.NSANaples,
      label: "NSA Naples",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },

    {
      id: Location.NASSigonella,
      label: "NAS Sigonella",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.NSASoudaBay,
      label: "NSA Souda Bay",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.NSFDeveselu,
      label: "NSF Deveselu",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.NSFRedzikowo,
      label: "NSF Redzikowo",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Lossiemouth,
      label: "Lossiemouth",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Crombie,
      label: "Crombie",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Keflavik,
      label: "Keflavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Grindavik,
      label: "Grindavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Evenes,
      label: "Evenes",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
    {
      id: Location.Ramsund,
      label: "Ramsund",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: SUPPORT_ACTIONS,
      color: (value: string) =>
        COLOR_BY_SUPPORT_ACTION[value as SupportAction] || "#E5E5E5",
    },
  ];

export const facilitiesColumnDefinitions: TableColumnDefinition<FacilitiesRecord>[] =
  [
    {
      id: "Item",
      label: "Category",
      numeric: false,
      width: "8rem",
      editable: false,
    },
    {
      id: "Priority",
      label: "Priority",
      numeric: false,
      width: "5rem",
      editable: true,
      dropdown: true,
      dropdownOptions: PRIORITIES,
      color: (value: string) =>
        COLOR_BY_PRIORITY[value as Priority] || "#E5E5E5",
    },
    {
      id: Location.NSRota,
      label: "NS Rota",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.NSANaples,
      label: "NSA Naples",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },

    {
      id: Location.NASSigonella,
      label: "NAS Sigonella",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.NSASoudaBay,
      label: "NSA Souda Bay",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.NSFDeveselu,
      label: "NSF Deveselu",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.NSFRedzikowo,
      label: "NSF Redzikowo",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Lossiemouth,
      label: "Lossiemouth",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Crombie,
      label: "Crombie",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Keflavik,
      label: "Keflavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Grindavik,
      label: "Grindavik",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Evenes,
      label: "Evenes",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
    {
      id: Location.Ramsund,
      label: "Ramsund",
      numeric: false,
      width: "8rem",
      editable: true,
      dropdown: true,
      dropdownOptions: FACILITIES_ACTIONS,
      color: (value: string) =>
        COLOR_BY_FACILITIES_ACTION[value as FacilitiesAction] || "#E5E5E5",
    },
  ];
