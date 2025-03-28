import { ChangeEvent, useState } from 'react'
import './App.css'
import { VegaChart } from './components/VegaChart'
import { makeVegaChartSpec } from './utils/makeChartSpec'

function App() {
  const [data, setData] = useState<number[]>([])
  const spec = makeVegaChartSpec(data)

  const handleCsvUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      // Read the numbers of the first column
      // named "data" and resulting in an array of numbers
      const text = reader.result as string;
      const lines = text.split('\n');
      const numbers = lines.map(line => {
        const parts = line.split(',');
        return parseFloat(parts[0]);
      }).filter(num => !isNaN(num));
      setData(numbers);
    }

    reader.readAsText(file);
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
    }
  }

  return (
    <>
      <input type="file" accept=".csv" onChange={handleCsvUpload} />
      <VegaChart spec={spec}></VegaChart>
    </>
  )
}

export default App
