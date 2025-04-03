import {
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";

export interface FilterBoxProps {
  title: string;
  values: string[];
  selectedValue: string;
  onChange: (values: string) => void;
}

export const DropdownSelectBox = (props: FilterBoxProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    props.onChange(event.target.value);
  };

  return (
    <div className="border border-solid rounded border-slate-300 w-full">
      {/* Title section */}
      <div className="flex p-2 justify-between items-center">
        <h3 className="p-0 m-0 text-base">{props.title}</h3>
      </div>

      {/* Divider */}
      <Divider />

      <div className="w-full p-2 flex flex-col gap-2">
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small-label">{props.title}</InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={props.selectedValue}
            label={props.title}
            onChange={handleChange}
          >
            {props.values.map((value, index) => {
              return (
                <MenuItem key={index} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};
