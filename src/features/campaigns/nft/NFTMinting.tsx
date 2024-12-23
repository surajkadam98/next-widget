import { useEffect, useState } from "react";

type NFTMintingProps = {
  handleCloseModal: () => void;
};

const NFTMinting = ({ handleCloseModal }: NFTMintingProps) => {
  const [loadingText, setLoadingText] = useState("Minting your NFT...");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingText("Still minting... Please wait.");
    }, 30000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-full">
      <div
        className="absolute top-0 right-0 cursor-pointer"
        onClick={handleCloseModal}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 11 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.40412 5.56831L10.1575 1.81487C10.4892 1.48343 10.4892 0.945618 10.1575 0.61397C9.82566 0.282322 9.28806 0.282322 8.95642 0.61397L5.20302 4.36741L1.44983 0.61397C1.11819 0.282322 0.580378 0.282322 0.248733 0.61397C-0.0829112 0.945618 -0.0829112 1.48343 0.248733 1.81487L4.00213 5.56831L0.248733 9.32175C-0.0829112 9.65318 -0.0829112 10.191 0.248733 10.5226C0.414556 10.6885 0.63176 10.7715 0.849176 10.7715C1.06659 10.7715 1.28401 10.6885 1.44983 10.5226L5.20302 6.7692L8.95642 10.5226C9.12224 10.6885 9.33945 10.7715 9.55686 10.7715C9.77428 10.7715 9.99148 10.6885 10.1575 10.5226C10.4892 10.191 10.4892 9.65318 10.1575 9.32175L6.40412 5.56831Z"
            fill="black"
          />
        </svg>
      </div>
      <div className="h-full flex flex-col justify-center items-center gap-2">
        <img src="/img/mintLoading.gif" className="w-[140px]" alt="minting" />
        <div className="text-h3 text-[#344860] font-medium">{loadingText}</div>
      </div>
    </div>
  );
};

export default NFTMinting;
