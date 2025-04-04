export interface MainViewProps {
  hasData: boolean;
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
    <div className="w-full h-full flex flex-col items-center overflow-y-auto gap-2">
      <div className="w-full">Table 1</div>
      <div className="w-full">Table 2</div>
      <div className="w-full">Table 3</div>
      <div className="w-full">Table 4</div>
    </div>
  );
}
