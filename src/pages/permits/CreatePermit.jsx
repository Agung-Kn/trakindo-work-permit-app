import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Input from "../../components/forms/Input";
import DynamicForm from "../../components/DynamicForm";
import DynamicFieldGroup from "../../components/DynamicFieldGroup";
import PPEFieldGroup from "../../components/PPEFieldGroup";

export default function CreatePermit() {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      company: "",
      branch: "",
      pic: "",
      location: "",
      department: "",
      owner: "",
      startDate: "",
      endDate: "",
      equipments: [{ name: "", qty: "" }],
      machines: [{ name: "", qty: "" }],
      materials: [{ name: "", qty: "" }],
    },
  });

  const equipmentField = useFieldArray({ control, name: "equipments" });
  const machineField = useFieldArray({ control, name: "machines" });
  const materialField = useFieldArray({ control, name: "materials" });

  const questions = [ 
    { 
      question: "Apakah pekerjaan ini memiliki Standar Operating Procedure (SOP) atau Instruksi Kerja ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah Penilaian Resiko (JSA) telah dilakukan ?", 
      options: ["Ya", "Tidak", "N/A"], 
      condition: "Ya", 
      additional: 
      { 
        type: "file", 
        label: "Lampirkan Dokumen JSA", 
      }, 
    }, 
    { 
      question: "Apakah Peralatan Kerja dan Peralatan Keselamatan dalam kondisi layak dan aman untuk digunakan ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah daerah telah diperiksa & diamankan ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah benda / mesin telah di lock-out ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah daerah/benda telah dibersihkan/diventilasi ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah telah diuji untuk memastikan tegangan nol ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah uji gas diperlukan pada saat bekerja ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah pekerjaan ini telah dikomunikasikan dengan pengawas dan karyawan ?", 
      options: ["Ya", "Tidak", "N/A"], 
    }, 
    { 
      question: "Apakah pekerjaan yang dilakukan menghasilkan limbah baik domestik maupun limbah B3 ?",
      options: ["Ya", "Tidak", "N/A"], 
      condition: "Ya", 
      additional: 
      { 
        type: "textarea", 
        label: "Bagaimana cara penanganannya?", 
      }, 
    }, 
  ];

  const PPEOptions = [ 
    "Helm", 
    "Sepatu / Safety Shoes", 
    "Ear Plug / Ear Muff", 
    "Masker kain / Cloth Mask", 
    "Safety Boots", 
    "Rompi / Vest", 
    "Masker kimia / Chemical Mask", 
    "Kacamata / Glasses", 
    "Pelampung / Live Vest", 
    "Sarung tangan katun / Cotton Gloves", 
    "Goggles", "Full Body Harness", 
    "Sarung tangan kulit / Leather Gloves", 
    "Tameng muka / Face Shield", 
    "Sarung tangan karet / Rubber Gloves", 
    "Kap Las / Hood Welding", 
    "Sarung tangan las / Welding Gloves", 
    "Apron", 
  ]; 
  
  const equipmentOptions = [ 
    "Pemadam Api / Fire Extinguisher", 
    "Barikade / Barricades", 
    "Rambu K3L / SHE Sign", 
    "LOTO (Lock Out Tag Out)", 
    "Radio Komunikasi / Handy Talking (HT)" 
  ];

  const steps = [
    { id: 1, title: "Informasi Umum" },
    { id: 2, title: "Daftar Periksa" },
    { id: 3, title: "Peralatan & APD" },
    { id: 4, title: "Review & Submit" },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
  };

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="text-gray-900 space-y-8"
    >
      <h1 className="text-3xl font-bold text-white">Pengajuan Baru</h1>

      <div className="py-6 px-14 bg-white rounded-xl shadow-md">
        {/* Progress bar */}
        <div className="flex justify-between items-center w-full py-6">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex-1 flex flex-col items-center relative ${
                index < steps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:bg-gray-300 after:absolute after:top-4 after:left-1/2" : ""
              }`}
            >
              {/* Progress line fill */}
              {index < steps.length - 1 && (
                <div
                  className={`absolute top-4 left-1/2 h-1 bg-blue-600 transition-all duration-500`}
                  style={{
                    width: currentStep > step.id ? "100%" : currentStep === step.id ? "50%" : "0%",
                  }}
                />
              )}

              {/* Circle */}
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full z-10 transition-colors duration-300 ${
                  currentStep >= step.id
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-400 text-gray-700"
                }`}
              >
                {step.id}
              </div>

              {/* Label */}
              <span
                className={`mt-2 text-sm transition-colors duration-300 ${
                  currentStep >= step.id ? "text-blue-600" : "text-gray-400"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Step contents */}
        {currentStep === 1 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6 border-gray-200">Informasi Umum</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Nama Perusahaan" {...register("company")} />
              <Input label="Cabang Lokasi Pekerjaan" {...register("branch")} />
              <Input label="Penanggung Jawab Pekerjaan" {...register("pic")} />
              <Input label="Lokasi Pekerjaan" {...register("location")} />
              <Input label="Departemen" {...register("department")} />
              <Input label="Pemilik Pekerjaan" {...register("owner")} />
              <Input label="Tanggal Mulai" type="date" {...register("startDate")} />
              <Input label="Tanggal Selesai" type="date" {...register("endDate")} />
            </div>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6 border-gray-200">Daftar Periksa</h2>
            <DynamicForm questions={questions} />
          </>
        )}

        {currentStep === 3 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-6 border-gray-200">Peralatan & APD</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <DynamicFieldGroup
                label="Alat / Equipment"
                name="equipments"
                register={register}
                {...equipmentField}
              />
              <DynamicFieldGroup
                label="Mesin / Machine"
                name="machines"
                register={register}
                {...machineField}
              />
              <DynamicFieldGroup
                label="Material"
                name="materials"
                register={register}
                {...materialField}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 my-10 mb-6 border-gray-200"> Alat Pelindung Diri </h2> 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"> 
              <PPEFieldGroup options={PPEOptions} register={register} /> 
            </div> 
            
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 my-10 mb-6 border-gray-200"> Perlengkapan Keselamatan & Darurat </h2> 
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3"> 
              <PPEFieldGroup options={equipmentOptions} register={register} /> 
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 my-10 mb-6 border-gray-200">Review & Submit</h2>
            <p className="text-gray-600">
              Pastikan semua data sudah benar sebelum submit.
            </p>
          </>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-6">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
            >
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button
              type="button"
              onClick={nextStep}
              className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Submit Permit
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
