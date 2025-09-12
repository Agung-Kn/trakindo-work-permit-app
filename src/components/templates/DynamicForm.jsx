import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetformBySlugQuery } from "../../services/features/formApi";

export default function DynamicForm() {
  const { slug } = useParams();
  const { data, isLoading, isError } = useGetformBySlugQuery(slug);
  const [formValues, setFormValues] = useState({});

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Form tidak ditemukan.</p>;

  const handleChange = (sectionId, questionId, value) => {
    setFormValues((prev) => ({
      ...prev,
      [sectionId]: {
        ...prev[sectionId],
        [questionId]: value,
      },
    }));
  };

  const handleCheckboxArray = (sectionId, questionId, checked, value) => {
    setFormValues((prev) => {
      const existing = prev[sectionId]?.[questionId] || [];
      const updated = checked
        ? [...existing, value]
        : existing.filter((v) => v !== value);

      return {
        ...prev,
        [sectionId]: {
          ...prev[sectionId],
          [questionId]: updated,
        },
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formValues);
    // TODO: Kirim ke BE via POST
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h1 className="text-xl font-semibold">{data.name}</h1>

      {data.sections.map((section) => (
        <div key={section.id} className="space-y-4 border p-4 rounded">
          <h2 className="font-medium text-lg">{section.name}</h2>

          {section.questions.map((q) => {
            if (q.type === "CHECKBOX" || q.type === "CHECKBOXFROMMASTER") {
              return (
                <div key={q.id} className="space-y-2">
                  <label className="font-medium">{q.value}</label>
                  {q.options?.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        value={opt.value}
                        checked={
                          formValues[section.id]?.[q.id]?.includes(opt.value) ||
                          false
                        }
                        onChange={(e) =>
                          handleCheckboxArray(
                            section.id,
                            q.id,
                            e.target.checked,
                            opt.value
                          )
                        }
                      />
                      {opt.value}
                    </label>
                  ))}
                </div>
              );
            }

            if (q.type === "OPTION") {
              return (
                <div key={q.id} className="space-y-2">
                  <label className="font-medium">{q.value}</label>
                  {q.options?.map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`q-${q.id}`}
                        value={opt.value}
                        checked={
                          formValues[section.id]?.[q.id] === opt.value
                        }
                        onChange={(e) =>
                          handleChange(section.id, q.id, e.target.value)
                        }
                      />
                      {opt.value}
                    </label>
                  ))}
                </div>
              );
            }

            if (q.type === "PARAGRAPH") {
              return (
                <div key={q.id} className="space-y-2">
                  <label className="font-medium">{q.value}</label>
                  <input
                    type="text"
                    className="border rounded p-2 w-full"
                    value={formValues[section.id]?.[q.id] || ""}
                    onChange={(e) =>
                      handleChange(section.id, q.id, e.target.value)
                    }
                  />
                </div>
              );
            }

            return null;
          })}
        </div>
      ))}

      <button
        type="submit"
        className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
}
