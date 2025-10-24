import { useEffect, useState } from "react";
import {
  PencilIcon,
  TrashIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const initialOutcomes = [
  { id: 1, text: "Students enhance their digital skills" },
  { id: 2, text: "Students learn to use productivity tools effectively" },
  { id: 3, text: "Curriculum is updated with modern digital practices" },
  { id: 4, text: "Faculty participation in digital training increases by 20%" },
];

const OutcomeItem = ({ outcome, isHighlight, onUpdate, onDelete }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(outcome.text);

  const handleSave = () => {
    if (editText.trim() !== "") {
      onUpdate(outcome.id, editText.trim());
      setIsEditing(false);
    } else {
      setEditText(outcome.text);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div
      key={outcome.id}
      className={`flex items-start p-3 my-2 rounded-lg transition duration-150 ease-in-out ${
        isHighlight ? "bg-purple-50/70 border border-purple-200" : ""
      }`}
    >
      <DocumentCheckIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />

      <div className="flex-grow">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full text-gray-800 text-base border-b border-purple-500 focus:outline-none"
            autoFocus
          />
        ) : (
          <p className="text-gray-800 text-base">{outcome.text}</p>
        )}

        <div className="flex justify-end mt-1 space-x-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-purple-600 transition duration-150"
            aria-label={`Editar ${outcome.text}`}
          >
            <PencilIcon className="h-5 w-5" />
          </button>

          <button
            onClick={() => onDelete(outcome.id)}
            className="text-gray-400 hover:text-red-600 transition duration-150"
            aria-label={`Eliminar ${outcome.text}`}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {outcome.id === 1 && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-purple-600 ml-2 mt-1"
          aria-label={isCollapsed ? "Expandir lista" : "Contraer lista"}
        >
          {isCollapsed ? (
            <ChevronUpIcon className="h-5 w-5" />
          ) : (
            <ChevronDownIcon className="h-5 w-5" />
          )}
        </button>
      )}
    </div>
  );
};

const DirectResultsCard = ({ onChange }: any) => {
  const [outcomes, setOutcomes] = useState(initialOutcomes);
  const [showAll, setShowAll] = useState(false);

  const visibleOutcomes = outcomes.slice(0, 2);
  const hiddenOutcomes = outcomes.slice(2);

  const handleDelete = (id: any) => {
    setOutcomes(outcomes.filter((outcome) => outcome.id !== id));
  };

  useEffect(() => {
    onChange?.(outcomes);
  }, [outcomes]);

  const handleUpdate = (id: any, newText: any) => {
    setOutcomes((prevOutcomes) =>
      prevOutcomes.map((outcome) =>
        outcome.id === id ? { ...outcome, text: newText } : outcome
      )
    );
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-xl rounded-xl overflow-hidden border border-gray-100 flex flex-col">
      <div className="p-5 flex-grow">
        <h2 className="text-xl font-bold text-purple-800">Direct outcomes</h2>
        <p className="text-sm text-gray-600 mb-4">
          Changes we influence directly
        </p>

        {visibleOutcomes.map((outcome, index) => (
          <OutcomeItem
            key={outcome.id}
            outcome={outcome}
            isHighlight={index === 1}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        ))}

        {showAll && (
          <div>
            {hiddenOutcomes.map((outcome) => (
              <OutcomeItem
                isHighlight={false}
                key={outcome.id}
                outcome={outcome}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {outcomes.length > 2 && (
          <div className="text-center pt-2 pb-4">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-sm font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
            >
              {showAll ? "Show less ↑" : "Show more ↓"}
            </button>
          </div>
        )}
      </div>

      <div
        className="bg-purple-600 text-white text-xs text-center py-2 rounded-b-md"
        style={{ backgroundColor: "#7E1E9B" }}
      >
        Zone of direct influence
      </div>
    </div>
  );
};

export default DirectResultsCard;
