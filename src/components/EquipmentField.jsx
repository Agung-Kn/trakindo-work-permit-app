import { TrashIcon } from "@heroicons/react/24/solid";
import Input from "./forms/Input";

export default function EquipmentField({ index, register, remove, canRemove }) {
  return (
    <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
      {/* Input Alat */}
      <Input
        label="Alat / Equipment"
        {...register(`equipments.${index}.alat`)}
      />

      {/* Input Qty + Delete */}
      <div className="flex items-end gap-2">
        <Input
          label="Jumlah / Qty"
          type="number"
          {...register(`equipments.${index}.qty`)}
        />
        {canRemove && (
          <button
            type="button"
            onClick={() => remove(index)}
            className="p-2 text-red-500 hover:text-red-700 rounded"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
