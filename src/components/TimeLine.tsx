import {
  UsersIcon,
  ClipboardDocumentListIcon,
  DocumentCheckIcon,
  GlobeAltIcon
} from "@heroicons/react/24/outline";

const CircleIcon = ({ IconComponent }: any) => (
  <div
    className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-purple-600 bg-white shadow-lg mx-8 transition duration-300 hover:scale-105 mt-2"
    style={{ color: "#7E1E9B" }}
  >
    <IconComponent className="h-8 w-8" />
  </div>
);

const TimeLine = () => {
  return (
    <div className="relative w-full py-10">
      <div
        className="absolute top-1/2 left-0 w-full h-3 bg-purple-600 z-0 transform -translate-y-1/2"
        style={{ backgroundColor: "#7E1E9B" }}
      ></div>

      <div
        className="relative flex justify-around items-center z-10"
        style={{ color: "#7E1E9B" }}
      >
        <CircleIcon IconComponent={UsersIcon} />
        <CircleIcon IconComponent={ClipboardDocumentListIcon} />
        <CircleIcon IconComponent={DocumentCheckIcon} />
        <CircleIcon IconComponent={GlobeAltIcon} />
      </div>
    </div>
  );
};

export default TimeLine;
