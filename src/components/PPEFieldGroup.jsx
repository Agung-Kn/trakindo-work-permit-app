import { useState } from "react";

export default function PPEFieldGroup({ options, register }) {
  const [othersChecked, setOthersChecked] = useState(false);

  return (
    <>
    {options.map((item, idx) => (
        <label key={idx} className="flex items-center space-x-2">
        <input
            type="checkbox"
            {...register(`ppe.${idx}`)}
            value={item}
            className="h-4 w-4 text-blue-600"
        />
        <span>{item}</span>
        </label>
    ))}

    {/* Lainnya */}
    <label className="flex items-center space-x-2">
        <input
        type="checkbox"
        onChange={(e) => setOthersChecked(e.target.checked)}
        className="h-4 w-4 text-blue-600"
        />
        <span>Lainnya / Others</span>
    </label>

      {/* Input tambahan kalau pilih "Lainnya" */}
      {othersChecked && (
        <input
          type="text"
          placeholder="Sebutkan lainnya..."
          {...register("ppeOthers")}
          className="mt-2 w-full rounded-md border border-gray-300 px-3 py-2"
        />
      )}
    </>
  );
}
