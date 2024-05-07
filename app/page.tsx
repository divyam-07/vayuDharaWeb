import AddDevice from "@/components/AddDevice";
import DeviceList from "@/components/DeviceList";
import NavBar from "@/components/NavBar";
import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from "@heroicons/react/24/outline";
function HomePage() {
  return (
    <>
      <div className="flex flex-col space-y-4">
        <AddDevice />
        <DeviceList />
      </div>
    </>
  );
}

export default HomePage;
