import { useState } from "react";

export default function DynamicForm({ questions }) {
  const [answers, setAnswers] = useState({});
  const [extraValues, setExtraValues] = useState({});

  const handleChange = (qIndex, value) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleExtraChange = (qIndex, value) => {
    setExtraValues((prev) => ({ ...prev, [qIndex]: value }));
  };

  const renderAdditionalInput = (qIndex, additional) => {
    if (!additional) return null;

    switch (additional.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder="Tuliskan jawaban..."
            value={extraValues[qIndex] || ""}
            onChange={(e) => handleExtraChange(qIndex, e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        );

      case "textarea":
        return (
          <textarea
            rows={3}
            placeholder="Tuliskan detail..."
            value={extraValues[qIndex] || ""}
            onChange={(e) => handleExtraChange(qIndex, e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        );

      case "file":
        return (
          <input
            type="file"
            onChange={(e) => handleExtraChange(qIndex, e.target.files[0])}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          />
        );

      case "select":
        return (
          <select
            value={extraValues[qIndex] || ""}
            onChange={(e) => handleExtraChange(qIndex, e.target.value)}
            className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
          >
            <option value="">Pilih...</option>
            {additional.choices?.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <div className="flex flex-col gap-2">
            {additional.choices?.map((choice) => (
              <label key={choice} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={extraValues[qIndex]?.includes(choice) || false}
                  onChange={(e) => {
                    let prev = extraValues[qIndex] || [];
                    if (e.target.checked) {
                      prev = [...prev, choice];
                    } else {
                      prev = prev.filter((c) => c !== choice);
                    }
                    handleExtraChange(qIndex, prev);
                  }}
                  className="h-4 w-4 text-blue-600"
                />
                {choice}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
  <div className="space-y-3">
    {questions.map((q, index) => (
      <div key={index} className="p-4 border border-gray-300 rounded-lg">
        {/* Grid 2 kolom: kiri pertanyaan, kanan opsi */}
        <div className="grid grid-cols-3 gap-4 items-start">
          {/* Pertanyaan di kiri */}
          <p className="col-span-2">{q.question}</p>

          {/* Opsi di kanan */}
          <div className="flex space-x-6 justify-end">
            {q.options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <span>{option}</span>
                <input
                  type="radio"
                  name={`q-${index}`}
                  value={option}
                  checked={answers[index] === option}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="h-4 w-4 text-blue-600"
                />
              </label>
            ))}
          </div>
        </div>

        {/* Input tambahan full di bawah */}
        {answers[index] === q.condition && q.additional && (
          <div className="mt-4">
            <label className="block mb-2">
              {q.additional.label}
            </label>
            {renderAdditionalInput(index, q.additional)}
          </div>
        )}
      </div>
    ))}
  </div>
);

}
