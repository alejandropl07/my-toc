import { useEffect, useState } from "react";

const OutcomeCard = ({
  title,
  subtitle,
  footerText,
  initialItems,
  footerBgColor,
  footerTextColor,
  borderColor,
  onChange,
}: any) => {
  const [items, setItems] = useState(initialItems);
  const [newItemText, setNewItemText] = useState("");
  const [showAll, setShowAll] = useState(false);

  const visibleItems = showAll ? items : items.slice(0, 2);

  useEffect(() => {
    onChange?.(items);
  }, [items]);

  const handleAddItem = (e: any) => {
    if (e.key === "Enter" && newItemText.trim() !== "") {
      const newItem = {
        id: Date.now(),
        text: newItemText.trim(),
      };

      setItems([...items, newItem]);
      setNewItemText("");

      setShowAll(true);
    }
  };

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <div
      className={`w-full max-w-sm bg-white shadow-lg rounded-xl overflow-hidden border-dotted border-2 flex flex-col justify-between`}
      style={{ borderColor: borderColor }}
    >
      <div className="p-5">
        <h2 className="text-xl font-bold text-purple-800">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>

        <div className="space-y-4 p-5">
          {visibleItems.map((item: any) => (
            <div
              key={item.id}
              className="relative pt-2 border-t border-dotted border-gray-300"
            >
              <p className="text-gray-800 text-base">{item.text}</p>
            </div>
          ))}

          {!showAll && items.length > 2 && (
            <div className="absolute left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent -bottom-2 pointer-events-none"></div>
          )}
        </div>
      </div>

      <div className="mt-6 p-5">
        <div className="p-2 border border-gray-300 rounded-md focus-within:border-purple-500 transition duration-150">
          <input
            type="text"
            placeholder="Type and press Enter to add..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={handleAddItem}
            className="w-full text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {items.length > 2 && (
          <div className="text-center pt-4">
            <button
              onClick={toggleShow}
              className="text-sm font-semibold text-purple-700 hover:text-purple-900 transition duration-150"
            >
              {showAll ? "Show less ↑" : "Show more ↓"}
            </button>
          </div>
        )}
      </div>

      <div
        className="bg-purple-600 text-white text-xs text-center py-2 rounded-b-md"
        style={{ backgroundColor: footerBgColor, color: footerTextColor }}
      >
        {footerText}
      </div>
    </div>
  );
};

export default OutcomeCard;
