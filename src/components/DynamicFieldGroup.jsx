import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import Input from "./forms/Input";

export default function DynamicFieldGroup({ label, name, register, fields, append, remove }) {
  return (
    <div className="space-y-2">
      {/* Header dengan tombol tambah */}
      <div className="flex items-center gap-3">
        <h3 className="font-semibold text-gray-700">{label}</h3>
        <button
          type="button"
          onClick={() => append({ name: "", qty: "" })}
          className="p-1 text-blue-600 hover:text-blue-800"
          title={`Tambah ${label}`}
        >
          <PlusIcon className="h-5 w-5 border rounded" />
        </button>
      </div>

      {/* List Input */}
      <div className="space-y-2">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 items-end"
          >
            <div className="col-span-7">
              <Input
                label="Nama"
                {...register(`${name}.${index}.name`)}
              />
            </div>
            <div className="col-span-4">
              <Input
                label="Jumlah / Qty"
                type="number"
                {...register(`${name}.${index}.qty`)}
              />
            </div>
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="col-span-1 py-2 text-red-500 hover:text-red-700"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
