import {
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
    <div className="w-full flex flex-col gap-2">
      <FormControl sx={{ mt: 2, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small-label">{props.title}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={props.selectedValue}
          label={props.title}
          onChange={handleChange}
          onClick={(e) => e.stopPropagation()}
          onFocus={(e) => e.stopPropagation()}
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
  );
};
