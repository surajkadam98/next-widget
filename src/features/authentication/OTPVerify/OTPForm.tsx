import { useState, useRef, useEffect, Fragment } from "react";

type OtpInputProps = {
  length: number;
  onOtpChange: (otp: string) => void;
};

const OTPForm = ({ length, onOtpChange }: OtpInputProps): JSX.Element => {
  // State to keep track of the OTP values
  const [tempOtp, setTempOtp] = useState<string[]>(
    new Array(length || 6).fill("")
  );

  // Create an array of refs for each input field
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleOnchange = (
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const { value } = target;
    // Ignore non-numeric input
    if (isNaN(Number(value))) return;

    const newOtp: string[] = [...tempOtp];
    // allow only one character
    newOtp[index] = value.slice(-1);

    setTempOtp(newOtp);
    onOtpChange(newOtp.join(""));

    // Focus the next input field if current field is filled
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (key === "Backspace" && !tempOtp[index] && index > 0) {
      // Focus the previous input field on backspace press
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Handle paste event
  const handleOnPaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.split("");

    // Loop through the pasted characters and fill each input field
    const newOtp = [...tempOtp];
    for (let i = 0; i < pasteArray.length; i++) {
      if (index + i < length) {
        newOtp[index + i] = pasteArray[i];
      }
    }

    setTempOtp(newOtp);
    onOtpChange(newOtp.join(""));

    // Focus the last filled input
    if (index + pasteArray.length - 1 < length) {
      inputRefs.current[index + pasteArray.length - 1]?.focus();
    }
  };

  // Focus the first input field when the component mounts
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex items-center self-center space-x-3">
      {tempOtp.map((_, index) => (
        <Fragment key={index}>
          <input
            ref={(el) => (inputRefs.current[index] = el)} // Assign the ref for each input
            onChange={(e) => handleOnchange(e, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
            onPaste={(e) => handleOnPaste(e, index)} 
            value={tempOtp[index]}
            className="w-9 h-10 border-[1px] border-black-100 rounded-lg focus-visible:border-none focus-visible:outline-none focus-visible:ring-[1px] focus-visible:ring-pink-400 text-2xl text-black-700 text-center"
          />
        </Fragment>
      ))}
    </div>
  );
};

export default OTPForm;
