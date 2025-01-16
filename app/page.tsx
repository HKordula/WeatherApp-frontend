import { Button } from "@/components/ui/button";
import WeatherTable from "@/components/table/WeatherTable";


export default function Home() {
  return (
    <div>
      <h1 className="text-white text-3xl underline">Weather App</h1>
      <Button>Click me</Button>
      <WeatherTable />
    </div>
  );
}
