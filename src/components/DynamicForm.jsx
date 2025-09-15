import { useState } from "react";
import { Controller } from "react-hook-form";

export default function DynamicForm({ questions, register, control }) {
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
          <Controller
            control={control}
            name={`checklists.${qIndex}.additional`}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                placeholder="Tuliskan jawaban..."
                value={extraValues[qIndex] || ""}
                onChange={(e) => {
                  handleExtraChange(qIndex, e.target.value);
                  field.onChange(e.target.value);
                }}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            )}
          />
        );

      case "textarea":
        return (
          <Controller
            control={control}
            name={`checklists.${qIndex}.additional`}
            render={({ field }) => (
              <textarea
                {...field}
                rows={3}
                placeholder="Tuliskan detail..."
                value={extraValues[qIndex] || ""}
                onChange={(e) => {
                  handleExtraChange(qIndex, e.target.value);
                  field.onChange(e.target.value);
                }}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            )}
          />
        );

      case "file":
        return (
          <Controller
            control={control}
            name={`checklists.${qIndex}.additional`}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => {
                  handleExtraChange(qIndex, e.target.files[0]);
                  field.onChange(e.target.files[0]);
                }}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              />
            )}
          />
        );

      case "select":
        return (
          <Controller
            control={control}
            name={`checklists.${qIndex}.additional`}
            render={({ field }) => (
              <select
                {...field}
                value={extraValues[qIndex] || ""}
                onChange={(e) => {
                  handleExtraChange(qIndex, e.target.value);
                  field.onChange(e.target.value);
                }}
                className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
              >
                <option value="">Pilih...</option>
                {additional.choices?.map((choice) => (
                  <option key={choice} value={choice}>
                    {choice}
                  </option>
                ))}
              </select>
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            control={control}
            name={`checklists.${qIndex}.additional`}
            render={({ field }) => (
              <div className="flex flex-col gap-2">
                {additional.choices?.map((choice) => (
                  <label key={choice} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={extraValues[qIndex]?.includes(choice) || false}
                      onChange={(e) => {
                        let prev = extraValues[qIndex] || [];
                        if (e.target.checked) prev = [...prev, choice];
                        else prev = prev.filter((c) => c !== choice);
                        handleExtraChange(qIndex, prev);
                        field.onChange(prev);
                      }}
                      className="h-4 w-4 text-blue-600"
                    />
                    {choice}
                  </label>
                ))}
              </div>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {questions.map((q, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-lg">
          <input
            type="hidden"
            {...register(`checklists.${index}.question`)}
            value={q.question}
          />

          <div className="grid grid-cols-3 gap-4 items-start">
            <p className="col-span-2">{q.question} <span className="text-red-500">*</span></p>

            <div className="flex space-x-6 justify-end">
              {q.options.map((option) => (
                <label
                  key={option}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <span>{option}</span>
                  <input
                    type="radio"
                    value={option}
                    {...register(`checklists.${index}.answer`, { required: true })}
                    checked={answers[index] === option}
                    onChange={(e) => {
                      handleChange(index, e.target.value);
                    }}
                    className="h-4 w-4 text-blue-600"
                  />
                </label>
              ))}
            </div>
          </div>

          {answers[index] === q.condition && q.additional && (
            <div className="mt-4">
              <label className="block mb-2">{q.additional.label}</label>
              {renderAdditionalInput(index, q.additional)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
