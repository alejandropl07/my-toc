import { useEffect, useMemo, useRef, useState } from "react";
import DirectResultsCard from "./components/DirectResultsCard";
import OutcomeCard from "./components/OutcomeCard";
import CardProgrammes from "./components/ProgrammesCard";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import TimeLine from "./components/TimeLine";

// Types
type Certainty = "Very certain" | "Moderately certain" | "Uncertain";
interface Assumption {
  id: string;
  description: string;
  certainty: Certainty;
}

// Helpers
const uid = (prefix = "id") =>
  `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
const BRAND = "#7E1E9B";
const BORDER = "#E5E7EB";

export default function MiniTheoryOfChange() {
  // Primary fields
  const [reason, setReason] = useState("");
  const reasonLimit = 250;

  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>(["Students"]);
  const tagInputRef = useRef<HTMLInputElement | null>(null);

  // Assumptions table
  const [assumptions, setAssumptions] = useState<Assumption[]>(() => {
    return [
      {
        id: uid("a"),
        description: "Students are interested in acquiring new digital skills",
        certainty: "Very certain",
      },
      {
        id: uid("a"),
        description: "Assumption 1",
        certainty: "Moderately certain",
      },
      {
        id: uid("a"),
        description: "Assumption 2",
        certainty: "Uncertain",
      },
    ];
  });
  const [assumptionPage, setAssumptionPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const totalAssumptions = assumptions.length;
  const [editingAssumptionId, setEditingAssumptionId] = useState<string | null>(
    null
  );
  const [editingAssumptionDraft, setEditingAssumptionDraft] = useState("");

  const indirectItems = [
    { id: 1, text: "internships to youth." },
    { id: 2, text: "Indirect outcome as an example" },
    { id: 3, text: "Another example outcome here." },
    { id: 4, text: "A final indirect contribution." },
  ];

  const ultimateItems = [
    { id: 5, text: "higher youth engagement." },
    { id: 6, text: "Employability rates increase across the region." },
    { id: 7, text: "Long-term change in community structure." },
  ];

  const [isDirty, setIsDirty] = useState(false);

  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (savedMessage) {
      const t = setTimeout(() => setSavedMessage(null), 2000);
      return () => clearTimeout(t);
    }
  }, [savedMessage]);

  useEffect(() => {
    setIsDirty(true);
  }, [reason, tags, assumptions, indirectItems, ultimateItems]);

  const addTag = (raw: string) => {
    const candidate = raw.trim();
    if (!candidate) return;
    const exists = tags.some(
      (t) => t.toLowerCase() === candidate.toLowerCase()
    );
    if (exists) return;
    setTags((s) => [...s, candidate]);
    setTagInput("");
    setIsDirty(true);
  };
  const removeTag = (t: string) => setTags((s) => s.filter((x) => x !== t));

  // Assumptions handlers
  const addAssumption = (description: string) => {
    const d = description.trim();
    if (!d) return;
    setAssumptions((s) => [
      ...s,
      { id: uid("a"), description: d, certainty: "Moderately certain" },
    ]);
    setIsDirty(true);
    setAssumptionPage(Math.floor(assumptions.length / rowsPerPage));
  };
  const deleteAssumption = (id: string) => {
    setAssumptions((s) => s.filter((x) => x.id !== id));
    setIsDirty(true);
  };
  const startEditAssumption = (id: string) => {
    const a = assumptions.find((x) => x.id === id);
    if (!a) return;
    setEditingAssumptionId(id);
    setEditingAssumptionDraft(a.description);
  };
  const saveEditAssumption = (id: string) => {
    setAssumptions((s) =>
      s.map((x) =>
        x.id === id ? { ...x, description: editingAssumptionDraft } : x
      )
    );
    setEditingAssumptionId(null);
    setEditingAssumptionDraft("");
    setIsDirty(true);
  };
  const cancelEditAssumption = () => {
    setEditingAssumptionId(null);
    setEditingAssumptionDraft("");
  };
  const changeAssumptionCertainty = (id: string, c: Certainty) => {
    setAssumptions((s) =>
      s.map((x) => (x.id === id ? { ...x, certainty: c } : x))
    );
    setIsDirty(true);
  };

  const [directResultsData, setDirectResultsData] = useState<any>(null);
  const [indirectResultsData, setIndirectResultsData] =
    useState<any>(indirectItems);
  const [ultimateImpactData, setUltimateImpactData] =
    useState<any>(ultimateItems);

  // Save handler
  const handleSave = () => {
    const payload = {
      reason,
      peopleServed: tags,
      assumptions,
      directResults: directResultsData,
      indirectResults: indirectResultsData,
      ultimateImpact: ultimateImpactData,
    };
    console.log("MiniToC save ->", JSON.stringify(payload, null, 2));
    setSavedMessage("Saved!");
    setIsDirty(false);
  };

  const pageCount = Math.max(1, Math.ceil(assumptions.length / rowsPerPage));
  const pagedAssumptions = useMemo(
    () =>
      assumptions.slice(
        assumptionPage * rowsPerPage,
        assumptionPage * rowsPerPage + rowsPerPage
      ),
    [assumptions, assumptionPage]
  );

  const newAssumptionRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className="p-6 max-w-6xl mx-auto bg-gray-50"
      style={{ color: "#111827" }}
    >
      <style>
        {`/* brand color variable */ :root { --brand: ${BRAND}; --border: ${BORDER}; }`}
      </style>

      <header className="mb-6">
        <h1 className="text-2xl font-semibold" style={{ color: "black" }}>
          Theory of change
        </h1>
      </header>

      <main className="grid grid-cols-1 gap-0">
        {/* Fila 1: Reason + People */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1 mb-6 w-full">
          {/* Reason */}
          <div
            className="w-full bg-white rounded-2xl shadow-sm border p-4"
            style={{ borderColor: BORDER }}
          >
            <label htmlFor="reason" className="block text-sm font-medium">
              The reason we exist
            </label>
            <textarea
              id="reason"
              aria-label="The reason we exist"
              maxLength={reasonLimit}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g Strengthening local neighborhoods through the power of food"
              className="mt-2 w-full min-h-[120px] p-3 rounded-xl border focus:ring-2 focus:ring-offset-1 focus:ring-purple-300 focus:outline-none text-gray-500"
            />
            <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
              <span>
                Main challenge your organization addresses (up to 250 words)
              </span>
            </div>
          </div>

          {/* People */}
          <div
            className="w-full bg-white rounded-2xl shadow-sm border p-4"
            style={{ borderColor: BORDER }}
          >
            <label className="block text-sm font-medium">
              The people we serve
            </label>
            <div className="mt-2">
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                    style={{
                      background: "#F3E7FB",
                      border: `1px solid ${BORDER}`,
                      color: BRAND,
                    }}
                  >
                    <span>{t}</span>
                    <button
                      aria-label={`Delete ${t}`}
                      onClick={() => removeTag(t)}
                      className="p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-1"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <div className="mt-3">
                <input
                  ref={tagInputRef}
                  aria-label="Add person"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag(tagInput);
                    } else if (e.key === "Backspace" && tagInput === "") {
                      setTags((s) => s.slice(0, -1));
                    }
                  }}
                  placeholder="Type and press Enter to add..."
                  className="mt-1 w-full p-2 rounded-md border focus:ring-2 focus:ring-offset-1 focus:ring-purple-300 focus:outline-none text-gray-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add each participant type and press Enter.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="lg:col-span-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              What we believe to be true
            </h2>

            {/* ⚠️ CONTENEDOR AÑADIDO PARA HABILITAR EL SCROLL HORIZONTAL ⚠️ */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-max">
                <thead>
                  <tr className="text-left text-gray-500 border-b border-gray-200">
                    {/* Definimos un ancho mínimo para la descripción, permitiendo que se desborde si es necesario */}
                    <th className="py-2 px-3 w-2/3 min-w-[150px]">
                      Description
                    </th>
                    {/* Definimos un ancho mínimo para Certainty */}
                    <th className="py-2 px-3 min-w-[150px]">Certainty</th>
                    {/* Definimos un ancho mínimo para las Acciones */}
                    <th className="py-2 px-3 text-center min-w-[80px]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {pagedAssumptions.map((a) => (
                    <tr
                      key={a.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-3 align-top">
                        {editingAssumptionId === a.id ? (
                          <input
                            autoFocus
                            value={editingAssumptionDraft}
                            onChange={(e) =>
                              setEditingAssumptionDraft(e.target.value)
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") saveEditAssumption(a.id);
                              if (e.key === "Escape") cancelEditAssumption();
                            }}
                            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                          />
                        ) : (
                          <div className="truncate text-gray-800">
                            {a.description || (
                              <span className="text-gray-400">—</span>
                            )}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <select
                          value={a.certainty || ""}
                          onChange={(e) =>
                            changeAssumptionCertainty(
                              a.id,
                              e.target.value as Certainty
                            )
                          }
                          className={`p-2 rounded-md border w-full focus:outline-none focus:ring-2 focus:ring-offset-1 transition
                    ${
                      a.certainty === "Very certain"
                        ? "border-green-500"
                        : a.certainty === "Moderately certain"
                        ? "border-yellow-500"
                        : a.certainty === "Uncertain"
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                        >
                          <option value="" disabled hidden>
                            Select certainty
                          </option>
                          <option>Very certain</option>
                          <option>Moderately certain</option>
                          <option>Uncertain</option>
                        </select>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <div className="flex justify-center gap-3">
                          <PencilIcon
                            onClick={() => startEditAssumption(a.id)}
                            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-purple-600 transition"
                          />

                          <TrashIcon
                            className="h-5 w-5 cursor-pointer text-gray-500 hover:text-red-600 transition"
                            onClick={() => deleteAssumption(a.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}

                  {/* Nueva fila para añadir */}
                  <tr className="border-t border-gray-200 bg-gray-50">
                    <td className="py-3 px-3 align-top">
                      <input
                        ref={newAssumptionRef}
                        placeholder="Type and press Enter to add..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addAssumption((e.target as HTMLInputElement).value);
                            (e.target as HTMLInputElement).value = "";
                            setTimeout(
                              () => newAssumptionRef.current?.focus(),
                              0
                            );
                          }
                        }}
                        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                      />
                    </td>

                    {/* Certainty select */}
                    <td className="py-3 px-3">
                      <select className="p-2 rounded-md border w-full text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                        <option value="">Select certainty</option>
                        <option>Very certain</option>
                        <option>Moderately certain</option>
                        <option>Uncertain</option>
                      </select>
                    </td>

                    {/* Actions column */}
                    <td className="py-3 px-3 text-center">
                      <div className="flex justify-center gap-3">
                        <PencilIcon
                          className="h-5 w-5 cursor-not-allowed text-gray-300"
                          onClick={() => {}}
                        />

                        <TrashIcon
                          className="h-5 w-5 cursor-not-allowed text-gray-300"
                          onClick={() => {}}
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <span>
                Showing {assumptionPage * rowsPerPage + 1}–
                {Math.min((assumptionPage + 1) * rowsPerPage, totalAssumptions)}{" "}
                of {totalAssumptions}
              </span>

              <div className="flex items-center gap-2">
                <label htmlFor="rows" className="mr-1">
                  Rows per page
                </label>
                <select
                  id="rows"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                  className="border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>20</option>
                </select>

                <button
                  onClick={() => setAssumptionPage((p) => Math.max(0, p - 1))}
                  disabled={assumptionPage === 0}
                  className="px-2 py-1 border rounded-md disabled:opacity-40"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setAssumptionPage((p) => Math.min(pageCount - 1, p + 1))
                  }
                  disabled={assumptionPage >= pageCount - 1}
                  className="px-2 py-1 border rounded-md disabled:opacity-40"
                >
                  ›
                </button>
                <span>
                  Page {assumptionPage + 1} of {pageCount}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="p-2 w-full">
          {/* Línea superior con íconos */}
          <TimeLine />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <CardProgrammes />
            <DirectResultsCard onChange={setDirectResultsData} />
            <OutcomeCard
              title="Indirect outcomes"
              subtitle="What we contribute over time"
              footerText="Zone of indirect influence"
              initialItems={indirectItems}
              onChange={setIndirectResultsData}
              footerBgColor={BRAND}
              footerTextColor="#fff"
              borderColor={BRAND}
            />

            <OutcomeCard
              title="Ultimate impact"
              subtitle="The lasting change we seek"
              footerText="Zone of contribution"
              initialItems={ultimateItems}
              onChange={setUltimateImpactData}
              footerBgColor={BRAND}
              footerTextColor="#fff"
              borderColor={BRAND}
            />
          </div>
        </div>

        <section className="lg:col-span-3 mt-4"></section>

        <section className="lg:col-span-3 mt-4">
          {/* Save button */}
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={!isDirty}
              className={`px-4 py-2 rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isDirty ? "" : "opacity-50 cursor-not-allowed"
              }`}
              style={{ background: BRAND }}
              aria-disabled={!isDirty}
            >
              Save
            </button>
          </div>
          {savedMessage && (
            <div className="text-sm text-green-600">{savedMessage}</div>
          )}
        </section>
      </main>

      {/* Global tiny styles to hide scrollbars but keep scroll functionality */}
      <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
