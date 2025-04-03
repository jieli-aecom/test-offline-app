import { IconButton, Divider, Button } from "@mui/material";
import { FilterAltOff } from "@mui/icons-material";

export interface FilterBoxProps {
  title: string;
  values: string[];
  selectedValues: string[];
  onChange: (values: string[]) => void;
}

export const ButtonFilterBox = (props: FilterBoxProps) => {
  const handleClick = (value: string) => {
    const newSelectedValues = props.selectedValues.includes(value)
      ? props.selectedValues.filter((v) => v !== value)
      : [...props.selectedValues, value];
    props.onChange(newSelectedValues);
  };

  const handleClear = () => {
    props.onChange([]);
  };

  const hasNoSelectedValues = props.selectedValues?.length === 0;

  const filterColor = !hasNoSelectedValues ? "primary" : "disabled";

  return (
    <div className="border border-solid rounded border-slate-300 w-full">
      {/* Title section */}
      <div className="flex p-2 justify-between items-center">
        <h3 className="p-0 m-0 text-base">{props.title}</h3>
        <div className="flex gap-2 items-center">
          <IconButton
            sx={{ width: "2rem", height: "2rem" }}
            disabled={hasNoSelectedValues}
            aria-label="clear filter"
            title="Clear filter"
            onClick={handleClear}
          >
            <FilterAltOff color={filterColor} sx={{fontSize: 18}} />
          </IconButton>
        </div>
      </div>

      {/* Divider */}
      <Divider />

      <div className="w-full p-2 flex flex-col gap-2 max-h-56 overflow-y-auto">
        {props.values.map((value, index) => {
          const isSelected = props.selectedValues.includes(value);
          const variant = isSelected ? "contained" : "outlined";
          return (
            <Button
              key={index}
              size="small"
              variant={variant}
              color={"primary"}
              onClick={() => handleClick(value)}
            >
              <span className="normal-case"
              >{value}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
