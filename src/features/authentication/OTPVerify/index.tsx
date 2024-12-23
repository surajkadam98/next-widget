import { useEffect, useState } from "react";
import { format } from "date-fns";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import SubmitButton from "@/@components/buttons/SubmitButton";
import { widgetConfirmationCode, widgetLogin } from "@/@services/api";
import useLoginResponseStore from "../hooks/useLoginResponseStore";
import { getCSSVarByName } from "@/@utils";
import Loader from "@/@components/common/Loader";
import OTPForm from "./OTPForm";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { useModalContext } from "@/@components/context/ModalContext";

const OTPVerify = () => {
  const { widgetProp } = useAPIdataStore();
    const { navigateModal, currentUrl } = useModalContext();
  // Access query parameters from router.query
  const [email, setEmail] = useState("");
  const [optedIn, setOptedIn] = useState("");


  const { handleLoginSuccess } = useLoginResponseStore();

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(59000);

  // Effect to run every second and decrement the timeLeft
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000); // Decrease by 1 second
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  useEffect(() => {
    // Match the currentUrl with the expected pattern
    const match = currentUrl.match(/^\/verify-otp\/([^/]+)\/(true|false)$/);
    if (match) {
      const [, emailValue, optedInValue] = match; // Extract email and optedIn
      setEmail(emailValue);
      setOptedIn(optedInValue); // Convert to boolean
    }
  }, [currentUrl]);

  const handleSubmit = async () => {
    console.log("email", email, otp);
    if (!email || !otp) return;
    try {
      setLoading(true);
      const response = await widgetConfirmationCode(email, otp);
      await handleLoginSuccess(response.data);
    } catch (error) {
      setTimeLeft(0);
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Can't Verify the Code! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      setLoading(true);
      await widgetLogin(email, "", "", optedIn === "true" ? true : false);
      setTimeLeft(59000);
      toast.success("Resend code is successful!");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      } else {
        toast.error("Resend failed! Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const isOTPFillUp = otp?.toString().length === 6;
  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  return loading ? (
    <Loader
      color={widgetCurrentColor}
      mainClass="!h-[550px] !w-full flex justify-center"
      className="h-28 w-28"
    />
  ) : (
    <div className="relative h-[550px] flex items-center justify-center">
      <button
        className={`absolute top-1 left-1 flex items-center rounded-[60px] px-5 py-2 text-black space-x-1 bg-[#f0f0f0]`}
        onClick={() => navigateModal("/")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-7"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clipRule="evenodd"
          />
        </svg>
        <div className="text-base text-center w-full font-medium cursor-pointer">
          {widgetProp?.link.back || "Back"}
        </div>
      </button>
      <div className="flex flex-col items-center gap-y-7 my-auto">
        <div className="text-center">
          <p className="text-center text-2xl sm:text-xl font-semibold text-black-700 mb-1.5">
            Check Your Email For A Code
          </p>
          <p className="text-sm text-black-400 leading-[21px]">
            Please enter the verification code sent to your email {email}
          </p>
        </div>
        <OTPForm length={6} onOtpChange={(e) => setOtp(e)} key={`otp`} />
        <div className="w-full">
          <div className="mx-auto max-w-48">
            <SubmitButton
              onClick={handleSubmit}
              active={isOTPFillUp}
              title="Verify"
              width="w-full"
            />
          </div>
          <p className="w-full text-sm text-black-400 font-medium text-center mt-5">
            {timeLeft <= 0 ? (
              <span>
                Didn’t get the code?{" "}
                <span
                  className="text-pink-400 cursor-pointer"
                  onClick={handleResend}
                >
                  Resend
                </span>
              </span>
            ) : (
              <span>
                Get a new code in{" "}
                <span className="text-pink-400">
                  {format(new Date(timeLeft), "mm:ss")}
                </span>
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OTPVerify;
