import {
  issueBorderTypeColor,
  issueCheckedBgColor,
} from "@/app/constant/issueTypeBorderColor";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import Combobox, { OptionType } from "../ui/Combobox";
import { useRef, useState } from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";

interface FormComponentSchema<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  displayName: string;
  placeHolder: string;
  isFormTextArea?: boolean;
  isFormRadio?: boolean;
  radioForm?: { value: string }[];
  isComboBoxForm?: boolean;
  comboBoxOption?: string[];
  isFormFile?: boolean;
  fileForm?: File;
  optional?:boolean,
  handleDeleteFile?: () => void;
}

export default function FormComponent<T extends FieldValues>({
  radioForm,
  control,
  name,
  displayName,
  placeHolder,
  isFormTextArea,
  isFormRadio,
  isComboBoxForm,
  comboBoxOption,
  isFormFile,
  handleDeleteFile,
  optional
}: FormComponentSchema<T>) {
  const [openCombo, setOpenCombo] = useState(false);
 const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="text-text-color p-5  flex flex-1 justify-start items-start">
          {isFormTextArea ? (
            <div className="flex flex-col items-center  justify-between  min-w-xl">
              <div className="flex flex-row items-center ">
                <p className="pr-5">{displayName}</p>
                <textarea
                  placeholder={placeHolder}
                  className="bg-secondary  rounded-xl p-3 placeholder:text-sm focus:outline-2 focus:outline-button-color transition-all delay-75"
                  rows={2}
                  cols={50}
                  value={value}
                  onChange={onChange}
                />
              </div>

              <div>
                {error && (
                  <span className="text-red-500 text-sm pt-2">
                    {error.message}
                  </span>
                )}
              </div>
            </div>
          ) : isFormRadio ? (
            <div className="flex flex-row justify-between max-w-xl  flex-1 ">
              <p className="pr-5 ">{displayName}</p>
              {radioForm?.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    className={`appearance-none cursor-pointer  ${
                      issueBorderTypeColor[option.value]
                    } w-5 h-5 border-2 border-gray-500  rounded-full ${
                      issueCheckedBgColor[option.value]
                    } mr-1 transition-all ease-in-out delay-75trgyffffffffffffffdvby                                                                                                                                                                                                                                                                                                                                                                 `}
                    name="rad"
                    id="rad"
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                  />
                  <label htmlFor="rad">{option.value}</label>
                </div>
              ))}
            </div>
          ) : isComboBoxForm ? (
            <div className="flex flex-col gap-2 flex-1 items-center justify-between max-w-xl ">
              <div className="flex    flex-row items-center flex-1 min-w-xl">
                <p className="pr-12">{displayName}</p>
                <Combobox
                  open={openCombo}
                  setOpen={setOpenCombo}
                  selected={value || []}
                  data={comboBoxOption || []}
                  handleSelect={(selectedId) => {
  if (Array.isArray(value)) {
    const isSelected = value.includes(selectedId);
    onChange(
      isSelected
        ? value.filter((v: string) => v !== selectedId)
        : [...value, selectedId]
    );

  } else {
    onChange([selectedId]);
    setOpenCombo(false);
  }
}}
                  type="issue"
                />
              </div>
              {error && (
                <span className="text-red-500 text-sm pt-2">
                  {error.message}
                </span>
              )}
            </div>
          ) : isFormFile ? (
            <div className="flex flex-row items-center">
              <p className="pr-5">{displayName}</p>

              <input
                type="file"
                className="hidden"
                id="upload"
                accept=".pdf,.jpg,.jpeg,.png"
                placeholder={placeHolder}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) onChange(file);
                  else onChange(null);
                }}
              />
              <label
                htmlFor="upload"
                className={`h-28 w-28 flex items-center justify-center rounded-2xl ${
                  !value && "border-button-color border-2 border-dashed"
                }`}
              >
                {value ? (
                  <div className="relative h-full w-full rounded-2xl ">
                    <div>
                      <Image
                        src={URL.createObjectURL(value)}
                        alt="Preview"
                        fill
                        className="object-cover rounded-2xl"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="absolute -right-5 p-3 -top-6 bg-secondary rounded-full cursor-pointer "
                        onClick={(e)=>{
                          e.preventDefault()
                          
                          handleDeleteFile?.()
                        }}
                      >
                        <Trash2 size={25} className="text-status-red-color " />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Image
                      src="/uploadfile.png"
                      alt="upload a file"
                      width={50}
                      height={50}
                    />
                  </div>
                )}
              </label>

              {error && (
                <span className="text-red-500 text-sm pt-2 pl-2">
                  {error.message}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col  items-center max-w-xl rounded-2xl">
              <div className="flex flex-row min-w-xl items-center">
                <div className="flex flex-row items-center">
                  <p className={`${!optional && 'pr-5'}`}>{displayName}</p>
                  {
                    optional  &&
                   <p className="text-gray-text pr-5 text-sm">(optional)</p>
                  }
                </div>
                <label className=" flex flex-1">
                  <input
                    className="p-3 w-full placeholder:text-sm placeholder:font-light rounded-xl bg-secondary focus:outline-2 focus:outline-button-color transition-all ease-in-out delay-75"
                    placeholder={placeHolder}
                    value={value}
                    onChange={onChange}
                  />
                </label>
              </div>

              {error && (
                <span className="text-red-500 text-sm pt-2">
                  {error.message}
                </span>
              )}
            </div>
          )}
        </div>
      )}
    ></Controller>
  );
}
