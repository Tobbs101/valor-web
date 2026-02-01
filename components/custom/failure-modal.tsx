import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IFailureModalProps {
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
  onProceed?: () => void;
  onClose?: () => void;
  isOpen: boolean;
}

const FailureModalCard = ({
  title,
  info,
  primaryBtnLabel = "Try Again",
  onProceed,
  onClose,
  isOpen,
}: IFailureModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  // Create portal to render modal outside normal DOM hierarchy
  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-[95%] h-[350px] md:w-[415px] p-10 flex flex-col">
        <div className="cta flex flex-col flex-1 justify-between mb-[46px] items-center">
          <h2 className="text-[20px] font-medium text-red-600">{title}</h2>

          <div className="w-[80px] h-[80px] rounded-full bg-red-100 flex items-center justify-center">
            <Icon
              icon="material-symbols:cancel-rounded"
              className="w-[50px] h-[50px] text-red-600"
            />
          </div>

          <span className="text-[15px] text-center text-gray-700">{info}</span>
        </div>

        <div className="flex items-center justify-center">
          <Button
            className="rounded-lg py-5 text-white px-10 text-sm transition-all active:scale-95 font-medium bg-red-600 hover:bg-red-700"
            onClick={() => {
              onProceed?.();
              onClose?.();
            }}
          >
            {primaryBtnLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default FailureModalCard;
