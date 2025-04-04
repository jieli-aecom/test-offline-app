import { EnhancedTable } from "../../../components/app-table/enhanced-table";
import {
  defenseColumnDefinitions,
  DefenseRecord,
  facilitiesColumnDefinitions,
  FacilitiesRecord,
  priorityColumnDefinitions,
  PriorityRecord,
  supportColumnDefinitions,
  SupportRecord,
} from "../types/records";

export interface MainViewProps {
  hasData: boolean;
  priorityData: PriorityRecord[];
  defenseData: DefenseRecord[];
  supportData: SupportRecord[];
  facilitiesData: FacilitiesRecord[];
  handleUpdatePriorityData: (
    rowId: number,
    key: keyof PriorityRecord,
    value: any
  ) => void;
  handleUpdateDefenseData: (
    rowId: number,
    key: keyof DefenseRecord,
    value: any
  ) => void;
  handleUpdateSupportData: (
    rowId: number,
    key: keyof SupportRecord,
    value: any
  ) => void;
  handleUpdateFacilitiesData: (
    rowId: number,
    key: keyof FacilitiesRecord,
    value: any
  ) => void;
}

export function MainView(props: MainViewProps) {
  if (!props.hasData === true) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2">
        Data not loaded
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col overflow-auto gap-2 p-4">
      <div className="w-[115rem] overflow-x-auto flex flex-col">
        <div className="w-full pl-[14rem]">
          <EnhancedTable
            hasData={props.hasData}
            dataLength={props.priorityData?.length ?? 0}
            tableView={props.priorityData ?? []}
            columnDefinitions={priorityColumnDefinitions}
            handleUpdateTableAttribute={props.handleUpdatePriorityData}
            hideFooter={true}
            disableSelect={true}
          />
        </div>
        <div className="w-full">
          <EnhancedTable
            hasData={props.hasData}
            dataLength={props.defenseData?.length ?? 0}
            tableView={props.defenseData ?? []}
            columnDefinitions={defenseColumnDefinitions}
            handleUpdateTableAttribute={props.handleUpdateDefenseData}
            hideFooter={true}
            disableSelect={true}
          />
        </div>
        <div className="w-full">
        <EnhancedTable
            hasData={props.hasData}
            dataLength={props.supportData?.length ?? 0}
            tableView={props.supportData ?? []}
            columnDefinitions={supportColumnDefinitions}
            handleUpdateTableAttribute={props.handleUpdateSupportData}
            hideFooter={true}
            disableSelect={true}
          />
        </div>
        <div className="w-full">
        <EnhancedTable
            hasData={props.hasData}
            dataLength={props.facilitiesData?.length ?? 0}
            tableView={props.facilitiesData ?? []}
            columnDefinitions={facilitiesColumnDefinitions}
            handleUpdateTableAttribute={props.handleUpdateFacilitiesData}
            hideFooter={true}
            disableSelect={true}
          />
        </div>
      </div>
    </div>
  );
}
