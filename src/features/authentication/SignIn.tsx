/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unreachable */
import { useEffect, useState } from "react";
import ModalHeader from "@/@components/modals/ModalHeader";
import SubmitButton from "@/@components/buttons/SubmitButton";
import GoogleSignInButton from "@/@components/buttons/GoogleSignInButton";
import ReCAPTCHA from "react-google-recaptcha";
import Checkbox from "@/@components/buttons/Checkbox";
// import { useGoogleLogin } from "@react-oauth/google";
import { Tooltip } from "react-tooltip";
import {
  checkGoogleReCaptcha,
  // googleLogin,
  widgetLogin,
} from "@/@services/api";
import { useAPIdataStore } from "@/@store/APIdataStore";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
// import useLoginResponseStore from "./hooks/useLoginResponseStore";
import Loader from "@/@components/common/Loader";
import { getCSSVarByName } from "@/@utils";
import { useRouter } from "next/router";
import Link from "next/link";
import { useModalContext } from "@/@components/context/ModalContext";

export const emailValidationRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Signin = () => {
  const router = useRouter();
  const { navigateModal } = useModalContext();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailWarning, setIsEmailWarning] = useState(false);
  const [isTermsWarning, setIsTermsWarning] = useState(false);
  const [isReCaptchaShowing, setIsReCaptchaShowing] = useState(false);
  const [isActiveSignIn, setIsActiveSignIn] = useState(false);
  const { brand, logo, campaign, widgetProp } = useAPIdataStore();
  const [recaptchaResponse, setRecaptchaResponse] = useState<string | null>(
    null
  );
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [optedIn, setOptedIn] = useState(true);
  // const { handleLoginSuccess } = useLoginResponseStore();


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const policyCheckbox = event.target;
    if (policyCheckbox.checked) {
      setIsTermsWarning(false);
      policyCheckbox.classList.remove("animate-bounce");
    }
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    const isValid = emailValidationRegex.test(event.target.value);
    setIsEmailValid(isValid);
    setIsEmailWarning(false);
    const hasEnteredEmail = event.target.value.trim().length;
    setIsReCaptchaShowing(hasEnteredEmail > 0);
  };

  // const handleGoogleLoginSuccess = async (codeResponse: any) => {
  //   try {
  //     setIsLoading(true);
  //     const response = await googleLogin(codeResponse.access_token, optedIn);
  //     await handleLoginSuccess(response.data);
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof AxiosError && error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     } else {
  //       toast.error("Failed to LogIn! Please try again.");
  //     }
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const googleLoginApiCall = useGoogleLogin({
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: (error) => {
  //     console.log("Login Failed:", error);
  //     toast.error("Failed to LogIn! Please try again.");
  //   },
  // });

  const handleGoogleLogin = () => {
    const policyCheckbox = document.getElementById(
      "policy"
    ) as HTMLInputElement;
    if (!policyCheckbox.checked) {
      setIsTermsWarning(true);
      policyCheckbox.classList.add("animate-bounce");
      return;
    }
    // googleLoginApiCall(); //fixme
  };

  useEffect(() => {
    const isEmailvalid = emailValidationRegex.test(email);
    if (!isEmailvalid) {
      setIsActiveSignIn(false);
      return;
    }
    if (recaptchaResponse !== null) {
      setIsActiveSignIn(true);
    }
  }, [recaptchaResponse, email]);
  //   router.push(
  //     {
  //       pathname: "/verify-otp", // Keep the same URL
  //       query: {}, // Don't pass params here to avoid URL change
  //     },
  //     undefined,
  //     { shallow: true }
  //   );

  //   // Pass state via sessionStorage or a context API instead
  //   sessionStorage.setItem(
  //     "verifyOTPParams",
  //     JSON.stringify({ email, optedIn })
  //   );
  // };

  const handleEmailLogin = async () => {
    if (!email || !isEmailValid) {
      setIsEmailValid(email !== "");
      return;
    }

    const policyCheckbox = document.getElementById(
      "policy"
    ) as HTMLInputElement;
    if (!policyCheckbox.checked) {
      setIsTermsWarning(true);
      policyCheckbox.classList.add("animate-bounce");
      return;
    }

    if (recaptchaResponse === null) {
      const recaptchaElement = document.getElementById(
        "recaptcha"
      ) as HTMLDivElement;
      recaptchaElement.classList.add("border", "border-[#ff0000]");
      setTimeout(() => {
        recaptchaElement.classList.remove("border", "border-[#ff0000]");
      }, 2000);
    } else {
      checkGoogleReCaptcha(recaptchaResponse).then(async (res) => {
        if (!res) {
          const recaptchaElement = document.getElementById(
            "recaptcha"
          ) as HTMLDivElement;
          recaptchaElement.classList.add("border", "border-[#ff0000]");
          setTimeout(() => {
            recaptchaElement.classList.remove("border", "border-[#ff0000]");
          }, 2000);
        } else {
          try {
            setIsLoading(true);
            await widgetLogin(email, "", "", optedIn);
            // router.push();
            navigateModal(`/verify-otp/${email}/${optedIn ? "true" : "false"}`)
            // navigateToVerifyOTP();
          } catch (error) {
            if (error instanceof AxiosError && error.response?.data?.message) {
              toast.error(error.response?.data?.message);
            } else {
              toast.error("Failed to LogIn! Please try again.");
            }
          } finally {
            setIsLoading(false);
          }
        }
      });
    }
  };

  const widgetCurrentColor = getCSSVarByName("--widgetBg");

  const termsAndConditions = widgetProp?.text?.termsAndConditions?.replace(
    "[company name]",
    brand
  );
  
  const processedTermsAndConditionsText = termsAndConditions
    ?.split("[privacy policy]")
    .map((part, index) => (
      <>
        {part}
        {index < termsAndConditions.split("[privacy policy]").length - 1 && (
          <Link
            href={campaign?.privacyLink || ""}
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            {widgetProp?.label?.privacyPolicy || "Privacy Policy"}
          </Link>
        )}
      </>
    ));

  return isLoading ? (
    <Loader
      color={widgetCurrentColor}
      mainClass="!h-[550px] !w-full flex justify-center"
      className="h-28 w-28"
    />
  ) : (
    <>
      <div className="z-10 px-4 pt-5 -m-6 bg-widgetBg h-fit rounded-b-3xl">
        <ModalHeader
          classnames="bg-modalBackColor"
          text={widgetProp?.title?.claimReward || "Claim Reward"}
          logo={logo}
        />
        <div className="w-full py-5">
          <div className="flex gap-3 z-30 w-full px-4">
            <div
              data-tooltip-id="tooltip_terms"
              data-tooltip-content={
                widgetProp?.warning.tickToAgree ||
                "Agree to the Terms of Use to proceed."
              }
            >
              <Checkbox
                name="policy"
                id="policy"
                onChange={handleCheckboxChange}
              />
            </div>
            <Tooltip
              id="tooltip_terms"
              isOpen={isTermsWarning}
              style={{
                backgroundColor: "white",
                color: "black",
                width: "200px",
                fontWeight: "bold",
              }}
              place="bottom"
            />
            <div className="text-sm text-white font-normal">
              {widgetProp?.label?.tickToAgreeToOur || "Agree to"}
              <span
                className="underline cursor-pointer"
                onClick={() => {
                  router.push("/terms");
                }}
              >
                {" "}
                {widgetProp?.label?.campaignTerms || "Campaign terms"}
              </span>
            </div>
          </div>
          <div className="mt-2 text-white text-xs font-normal z-20 p-4 pt-0">
            { processedTermsAndConditionsText || (
              <>
                We send your info to {brand} in compliance with their{" "}
                <Link
                  href={campaign?.privacyLink || ""}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </Link>
                . Your data is stored on US servers, in accordance with our{" "}
                <Link
                  href={campaign?.privacyLink || ""}
                  className="underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  privacy policy
                </Link>
                .
              </>
            )}
          </div>
          <div className="flex gap-3 z-30 w-full px-4 pt-4">
            <Checkbox
              name="marketingOptedIn"
              id="marketingOptedIn"
              onChange={(e) => setOptedIn(e.target.checked)}
            />
            <Tooltip
              id="tooltip_terms"
              isOpen={isTermsWarning}
              style={{
                backgroundColor: "white",
                color: "black",
                width: "200px",
                fontWeight: "bold",
              }}
              place="bottom"
            />
            <div className="-mt-1 text-white text-sm font-normal z-20">
              {widgetProp?.button?.optIn?.replace("[Company name]", brand) ||
                `Opt in to receive marketing comms from ${brand}`}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-3 pb-4 mt-12">
        <p className="text-base text-gray-900">
          {widgetProp?.link.connectWith || "Connect with"}
        </p>
        {!isReCaptchaShowing && (
          <GoogleSignInButton onClick={handleGoogleLogin} />
        )}
        {
          !email && (
            <div className="w-full flex items-center space-x-3 text-gray-600">
          <hr className="flex-grow"></hr>
          <p className="text-gray-500">Or</p>
          <hr className="flex-grow" />
        </div>
          )
        }
        <input
          type="text"
          className={`border-[0.5px] rounded-[59px] border-[#02172E] p-[10px] w-full ${
            isEmailWarning && "border-[#FF0000] shake_input"
          } outline-widgetBg ${email && 'mt-1'}`}
          onChange={handleChangeEmail}
          placeholder={widgetProp?.label?.email || "Enter email address"}
        />
        <SubmitButton
          onClick={handleEmailLogin}
          active={isActiveSignIn}
          title={widgetProp?.button.continueWatching || "Continue"}
          width="w-full"
        />
        {isReCaptchaShowing && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY ?? ""}
            onChange={setRecaptchaResponse}
            id="recaptcha"
            className="-mt-1 mx-auto sm:scale-90 lg:scale-90 origin-top-left w-fit h-fit"
          />
        )}
      </div>
    </>
  );
};

export default Signin;
