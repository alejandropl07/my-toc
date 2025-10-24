const CardProgrammes = () => {
  const PURPLE_DARK = "#7E1E9B";

  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-bold text-purple-800 mb-1">Programmes</h2>

        <p className="text-sm text-gray-600 mb-4">
          Sets of activities we deliver
        </p>

        <p className="text-gray-700 text-base space-y-2">
          Programmes displayed here are synced with your main Programmes list.
          To add or make changes, please visit the
          <span className="text-purple-700 font-semibold"> Programmes </span>
          section.
        </p>
      </div>

      <div
        className="bg-purple-600 text-white text-xs text-center py-2 rounded-b-md"
        style={{ backgroundColor: PURPLE_DARK }}
      >
        Zone of control
      </div>
    </div>
  );
};

export default CardProgrammes;
