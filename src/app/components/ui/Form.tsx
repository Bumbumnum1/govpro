
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./shadcn-io/dialog";
import { useEffect, useRef, useState } from "react";


import { SuccessDialog } from "./SuccessDialog";
import { useForm, Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormSchema, { FormType } from "@/types/formScema.zod";
import { ProgressBarType } from "@/types/Components.type";
import FormComponent from "../Form/FormComponent";
import ReCAPTCHA from "react-google-recaptcha";
import Button from "../Button";
interface FirstFormType {
  dialog: boolean;
  handleModal: () => void;
}

export default function FirstForm({ dialog, handleModal }: FirstFormType) {
  const { control, handleSubmit , reset,trigger,formState:{errors}} = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode:'onChange',
    defaultValues: {
      issue: "",
      ristLevel: "Low",
      issueType: [],
      link: "",
      reporterDetails: {
        email:'',
        name:''
      },

    },
  });
  
  const captChaRef= useRef(null)


  const [captChaValue,setCaptChaValue]=useState()

  const handleDeleteFile = () => {
    return reset({ imageOrFile: undefined });
  };

 const handleCaptchaChange=()=>{

 }
  const [currentTab, setCurrentTab] = useState<"report" | "reporter">("report");



  

  const [openDialog, setOpenDialog] = useState<boolean>(false);




  const handleNext = async () => {
  const valid=  await trigger([
      'issueType',
      'link',
      'imageOrFile', 
      'ristLevel',
      'issue'
    ])
  if(!valid){
    console.log('Validation failed');

    console.log('====================================');
    console.log(errors);
    console.log('====================================');
    return
  }
    if(!valid)return
    setCurrentTab('reporter');
    //  toast.success("Report information validated!");
  };

  console.log('====================================');
  console.log(currentTab);
  console.log('====================================');
  const onSubmit = () => {


   

    handleModal();
    setOpenDialog(true);
  };

 
  useEffect(() => {
    if (!openDialog) return;
    const timer = setTimeout(() => setOpenDialog(false), 3000);
    return () => clearTimeout(timer);
  }, [openDialog]);

  // useEffect(() => {
  //   if (dialog) {
  //     setTimeout(() => {
  //       setCurrentTab("report");
  //       setIssue("");
  //       setSelected("low");
  //       setSelectedIssue([]);
  //       setLink("");
  //       setFileName([]);
  //       setReporterName("");
  //       setReporterEmail("");
  //       setIsAnonymous(false);
  //     }, 0);
  //   }
  // }, [dialog]);

  


  
  return (
    <>
      <Dialog open={dialog} onOpenChange={handleModal} modal>
        {dialog && <div className="fixed inset-0 bg-black/50 z-0" />}

        <DialogContent
          className="p-5 cursor-default bg-primary flex flex-col gap-5  min-w-3xl border "
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col flex-1">
                {/*progress bar*/}
                <ProgressBar currentTab={currentTab}></ProgressBar>
                <div className="flex items-center  justify-between flex-row flex-1">
                  <p className="p-5  text-text-color font-normal">
                    Report Information
                  </p>
                  <p className="p-5  text-text-color font-normal">
                    Your Information
                  </p>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* REPORT INFORMATION */}
          {currentTab === "report" ? (
            <div>
              <FormComponent
                control={control}
                name="issueType"
                displayName="Issue Type"
                placeHolder="Select..."
                isComboBoxForm
                comboBoxOption={["Phishing", "Malware", "Access Issue"]}
              />
              <FormComponent
                control={control}
                name={"ristLevel"}
                displayName="Urgency Level "
                placeHolder="May i know The Issue?"
                isFormRadio
                radioForm={[
                  { value: "Low" },
                  { value: "Medium" },
                  { value: "High" },
                  
                ]}
              ></FormComponent>

              <FormComponent
                control={control}
                name={"issue"}
                displayName="Whats the Issue"
                placeHolder="May i know The Issue?"
                isFormTextArea
              ></FormComponent>

              <FormComponent
                control={control}
                name={"link"}
                displayName="Whats the Link?"
                placeHolder="May I know the website URL email"
              ></FormComponent>

              <FormComponent
                control={control}
                name={"imageOrFile"}
                displayName="Attach Screenshot or File"
                placeHolder="May I know the website URL"
                isFormFile
                handleDeleteFile={handleDeleteFile}
              ></FormComponent>
              

              <div className="flex flex-1 items-center justify-center pt-5">
                <Button
                className="px-12 py-2  text-primary rounded-xl cursor-pointer bg-button-color"
                name="Next"
                onClick={handleNext}
              />
              </div>
            </div>
          ) : (
            <>
             <div className="flex flex-col flex-1 ">
            <FormComponent
            control={control}
            name={'reporterDetails.name'}
            displayName="Whats Your name?"
            placeHolder="May i know your name?"
            optional
            ></FormComponent>

            <FormComponent
            control={control}
            name={'reporterDetails.email'}
            displayName="Whats Your Email?"
            placeHolder="May i know your Email?"
            optional
            ></FormComponent>



            <div className="  flex justify-center items-center pt-10 flex-col flex-1">
              <ReCAPTCHA
              ref={captChaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? ""}
              onChange={handleCaptchaChange}
              ></ReCAPTCHA>




              <div className="pt-16 flex justify-between   ">
            <Button
              className=" border border-gray-text text-text-color px-16 py-2 rounded-2xl mr-10 "
            name="Back"
            onClick={()=> setCurrentTab('report')}
            >

            </Button>
            
            <Button
            onClick={onSubmit}
            className="bg-button-color px-16 py-2 rounded-2xl"
            name="Submit"
            ></Button>
              </div>
            </div>

             </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <SuccessDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        message="Reported Successfully!"
      />
    </>
  );
}

function ProgressBar({ currentTab }: ProgressBarType) {
  return (
    <div className=" flex flex-row justify-between flex-1 ">
      <div className="flex flex-row items-center flex-1">
        <div className="w-8 rounded-full bg-status-orange-color p-4"></div>
        <div
          className={`flex h-2 flex-1 transition-all ease-in-out bg-status-orange-color delay-700 `}
        ></div>
      </div>
      <div className="flex flex-row items-center flex-1">
        <div
          className={`w-8 rounded-full bg-secondary ${
            currentTab === "reporter" && "bg-status-orange-color"
          } p-4`}
        ></div>
        <div
          className={`flex h-2 bg-secondary flex-1  ${
            currentTab === "reporter" &&
            " bg-status-orange-color transition-all delay-700"
          }`}
        ></div>
      </div>
      <div
        className={`w-8 rounded-full bg-secondary ${
          currentTab === "reporter" && "bg-status-orange-color transition-all delay-700"
        } p-4`}
      ></div>
    </div>
  );
}
