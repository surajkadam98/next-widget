import { GoogleIcon } from "@/@assets/icons/GoogleIcon";

interface GoogleSignInButtonProps {
  onClick: () => void;
}

export default function GoogleSignInButton({
  onClick,
}: GoogleSignInButtonProps) {
  return (
    <button
      className="mx-auto border border-gray-300 relative p-[10px] rounded-full max-w-min !inline-block z-20"
      onClick={onClick}
    >
      <GoogleIcon className="w-6" />
    </button>
  );
}
