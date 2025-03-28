import { useEffect, useRef } from "react"
import vegaEmbed from "vega-embed"
import { VisualizationSpec } from "vega-embed";

export const VegaChart = ({ spec }: { spec: VisualizationSpec }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    vegaEmbed(containerRef.current!, spec).catch(console.error);
  }, [spec]);

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}