import ModalFooter from "@/@components/modals/ModalFooter";
import { useModalStore } from "@/@store/modalStore";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ModalLayoutProps {
  children?: React.ReactNode;
}

export const ModalLayout: React.FC<ModalLayoutProps> = ({ children }) => {
  const { modalHistory, setModalHistory } = useModalStore();
  const router = useRouter();

  useEffect(() => {
    const currentHistory = modalHistory ? [...modalHistory] : ["/"];

    if (!currentHistory.includes(router.pathname)) {
      currentHistory.push(router.pathname);
    }
    setModalHistory(currentHistory);
  }, [router.pathname, modalHistory, setModalHistory]);

  return (
    <div className="h-full">
      <div className="h-full flex flex-col">
        <div className="flex flex-1 flex-col justify-between p-6 pb-6">
          {children}
        </div>
        <div className="px-6">
          <ModalFooter />
        </div>
      </div>
    </div>
  );
};
