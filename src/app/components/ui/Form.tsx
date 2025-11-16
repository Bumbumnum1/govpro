import { X } from "lucide-react";
import { Input } from "./input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "./shadcn-io/dialog";
import { useEffect, useRef, useState } from "react";
import Combobox, { OptionType } from "./Combobox";
import { toast } from "sonner";
import Image from "next/image";
import { SuccessDialog } from "./SuccessDialog";

interface FirstFormType {
  dialog: boolean;
  handleModal: () => void;
}

export default function FirstForm({ dialog, handleModal }: FirstFormType) {
  const defaultIssues: OptionType[] = [
    { id: "phishing", label: "Phishing" },
    { id: "malware", label: "Malware" },
    { id: "access_issue", label: "Access Issue" },
    { id: "slow_system", label: "Slow System" },
    { id: "password_reset", label: "Password Reset" },
  ];

  const [currentTab, setCurrentTab] = useState<"report" | "reporter">("report");

  const [openIssue, setOpenIssue] = useState<boolean>(false);

  const [isAnonymous, setIsAnonymous] = useState(false);

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // Form states
  const [issue, setIssue] = useState("");
  const [selected, setSelected] = useState("low");
  const [selectedIssue, setSelectedIssue] = useState<OptionType[]>([]);
  const [link, setLink] = useState("");
  const [fileName, setFileName] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Reporter info
  const [reporterName, setReporterName] = useState("");
  const [reporterEmail, setReporterEmail] = useState("");

  const handleRadioSelect = (value: string) => setSelected(value);

  const handleSelect = (value: string, issueEncountered: OptionType[]) => {
    const found = issueEncountered.find((i) => i.id === value);
    if (!found) return;

    setSelectedIssue((prev) =>
      prev.some((item) => item.id === value)
        ? prev.filter((item) => item.id !== value)
        : [...prev, found]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFiles = Array.from(e.target.files);
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    const filteredFiles = selectedFiles.filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (filteredFiles.length === 0) {
      toast.warning("Only PDF, DOC, DOCX, PNG, and JPEG files are allowed.");
      return;
    }
    setFileName((prev) => [...prev, ...filteredFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemoveFile = (val: string) =>
    setFileName((prev) => prev.filter((file) => file.name !== val));

  const validateReportInfo = () => {
    if (!issue.trim()) {
      toast.error("Issue field is required.");
      return false;
    }
    if (!selected) {
      toast.error("Risk level is required.");
      return false;
    }
    if (selectedIssue.length === 0) {
      toast.warning("Please select at least one issue type.");
      return false;
    }
    if (!link.trim()) {
      toast.error("URL is required.");
      return false;
    }
    return true;
  };

  const validateReporterInfo = () => {
    if (!reporterName.trim()) {
      toast.error("Reporter name is required.");
      return false;
    }
    if (!reporterEmail.trim()) {
      toast.error("Reporter email is required.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validateReportInfo()) return;
    setCurrentTab("reporter");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAnonymous && !validateReporterInfo()) return;

    console.log({
      issue,
      selected,
      selectedIssue,
      link,
      files: fileName,
      reporterName: isAnonymous ? "Anonymous" : reporterName,
      reporterEmail: isAnonymous ? "Anonymous" : reporterEmail,
    });

    handleModal();
    setOpenDialog(true);
  };

  const isReportComplete =
    issue &&
    selected &&
    selectedIssue.length > 0 &&
    (link || fileName.length > 0);

  useEffect(() => {
    if (!openDialog) return;
    const timer = setTimeout(() => setOpenDialog(false), 3000);
    return () => clearTimeout(timer);
  }, [openDialog]);

  useEffect(() => {
    if (dialog) {
      setTimeout(() => {
        setCurrentTab("report");
        setIssue("");
        setSelected("low");
        setSelectedIssue([]);
        setLink("");
        setFileName([]);
        setReporterName("");
        setReporterEmail("");
        setIsAnonymous(false);
      }, 0);
    }
  }, [dialog]);

  return (
    <>
      <Dialog open={dialog} onOpenChange={handleModal} modal>
        {dialog && <div className="fixed inset-0 bg-black/50 z-0" />}

        <DialogContent
          className="p-0 cursor-default bg-white flex flex-col gap-5 w-[600px] h-[700px]"
          showCloseButton={false}
          onInteractOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>
              <div className="flex border-b">
                {/* REPORT TAB */}
                <button
                  className={`flex-1 py-2 text-center font-light flex items-center justify-center gap-2 ${
                    currentTab === "report"
                      ? "border-b-2 border-status-orange-color text-text-color"
                      : isReportComplete
                      ? "text-text-color border-b-2 border-status-orange-color"
                      : "text-text-color"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      isReportComplete || currentTab === "report"
                        ? "bg-status-orange-color"
                        : "bg-text-color"
                    }`}
                  />
                  Report Information
                </button>

                {/* REPORTER TAB */}
                <button
                  className={`flex-1 py-2 text-center font-light flex items-center justify-center gap-2 ${
                    currentTab === "reporter"
                      ? "border-b-2 border-status-orange-color text-text-color"
                      : "text-text-color"
                  }`}
                >
                  <span
                    className={`w-3 h-3 rounded-full ${
                      currentTab === "reporter"
                        ? "bg-status-orange-color"
                        : "bg-gray-300"
                    }`}
                  />
                  Reporter’s Information
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>

          {/* REPORT INFORMATION */}
          {currentTab === "report" ? (
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col items-start gap-5 font-poppins text-[#3e3e3e] text-sm">
                <div className="w-full">
                  <p className="font-light">What is the issue?</p>
                  <Input
                    type="text"
                    value={issue}
                    placeholder="May we know the issue?"
                    onChange={(e) => setIssue(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p className="font-light pb-3">Risk Level</p>
                  <div className="flex flex-row gap-6 text-[14px] text-[#3E3E3E] mb-3 items-center justify-center">
                    {["low", "medium", "high", "critical"].map((level) => {
                      const accentColor =
                        level === "low"
                          ? "var(--color-status-green-color)"
                          : level === "medium"
                          ? "var(--color-status-blue-color)"
                          : level === "high"
                          ? "var(--color-status-orange-color)"
                          : "var(--color-status-red-color)";
                      return (
                        <label
                          key={level}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <input
                            type="radio"
                            name="risk"
                            value={level}
                            checked={selected === level}
                            onChange={(e) => handleRadioSelect(e.target.value)}
                            style={{ accentColor }}
                          />
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="w-full">
                  <p className="font-light">What type of issue?</p>
                  <div className="flex items-center gap-3 w-full">
                    <Combobox
                      open={openIssue}
                      setOpen={setOpenIssue}
                      selected={selectedIssue}
                      data={defaultIssues}
                      handleSelect={(val) => handleSelect(val, defaultIssues)}
                      type="issue"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <p className="font-light">What is the link?</p>
                  <Input
                    type="text"
                    value={link}
                    placeholder="Enter the site url"
                    onChange={(e) => setLink(e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <p className="font-light">Attach screenshots or files</p>
                  <div className="flex flex-row items-center w-full">
                    <div className="w-full flex flex-col items-start gap-2 overflow-y-auto max-h-[150px]">
                      <input
                        type="file"
                        id="uploadAttachment"
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />

                      <label
                        htmlFor="uploadAttachment"
                        className="flex items-center justify-center w-full h-[500px] cursor-pointer px-3 py-2 rounded-lg border border-dashed border-gray-400 text-gray-600 hover:border-black duration-200"
                      >
                        <Image
                          src="/uploadfile.png"
                          alt="upload a file"
                          width={60}
                          height={60}
                        />
                      </label>

                      <div className="w-full flex flex-wrap gap-2">
                        {fileName.map((item) => (
                          <div
                            key={item.name}
                            className="flex items-center gap-2 bg-[#eeeeee] text-gray-600 px-3 py-2 rounded-md text-sm"
                          >
                            <span>{item.name}</span>
                            <X
                              className="w-4 h-4 cursor-pointer hover:text-red-500 transition"
                              onClick={() => handleRemoveFile(item.name)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-5 flex-row gap-3">
                {" "}
                <button
                  type="button"
                  onClick={handleModal}
                  className="w-[150px] h-10 font-poppins text-sm px-3 py-2 rounded-lg bg-gray-400 border text-white cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-2 w-[150px] h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm cursor-pointer"
                >
                  Next
                </button>
              </div>
            </form>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-start gap-5 font-poppins text-[#3e3e3e] text-sm">
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="cursor-pointer"
                    />
                    Submit anonymously
                  </label>

                  <div className="w-full">
                    <p className="font-medium">Reporter Name</p>
                    <Input
                      type="text"
                      disabled={isAnonymous}
                      value={reporterName}
                      placeholder="Enter your name"
                      onChange={(e) => setReporterName(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <p className="font-medium">Reporter Email</p>
                    <Input
                      type="email"
                      disabled={isAnonymous}
                      value={reporterEmail}
                      placeholder="Enter your email"
                      onChange={(e) => setReporterEmail(e.target.value)}
                    />
                  </div>

                  <div>{/* captcha here */}</div>
                  <div className="w-full h-[264px]">
                    {/* hard coded la ini nga height para la maging maupay it a tab HAHAHA */}
                  </div>
                </div>
                <div className="flex justify-center mt-5 flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setCurrentTab("report")}
                    className="w-[150px] h-10 font-poppins text-sm px-3 py-2 rounded-lg bg-gray-400 border text-white cursor-pointer"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 w-[150px] h-10 rounded-lg bg-blue-500 text-white hover:bg-blue-600 text-sm cursor-pointer"
                  >
                    Submit
                  </button>
                </div>
              </form>
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
