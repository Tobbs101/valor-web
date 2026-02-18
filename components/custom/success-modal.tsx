import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ISuccessModalProps {
  title: string | ReactNode;
  info: string | ReactNode;
  primaryBtnLabel: string;
  onProceed?: () => void;
  onClose?: () => void;
  isOpen: boolean;
}

const SuccessModalCard = ({
  title,
  info,
  primaryBtnLabel = "Okay",
  onProceed,
  onClose,
  isOpen,
}: ISuccessModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  // Create portal to render modal outside normal DOM hierarchy
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-2xl md:w-[525px] w-[95%] p-10 flex flex-col">
        <div className="cta flex flex-col flex-1 justify-between mb-[46px] items-center">
          <div className=" mt-5 rounded-full flex items-center justify-center">
            <Icon
              icon="material-symbols:check-circle-rounded"
              className="w-[100px] h-[100px] md:h-[150px] md:w-[150px] text-primary"
            />
          </div>

          <h2 className="text-[30px] md:text-[36px] md:font-[700] text-center font-medium text-primary">
            {title}
          </h2>

          <span className="text-[13px] md:text-[15px] w-full mt-3 text-center text-gray-700">
            {info}
          </span>
        </div>

        {primaryBtnLabel && (
          <div className="flex items-center justify-center">
            <Button
              className="rounded-lg w-full text-white h-[45px] p-[20px_30px] text-sm transition-all active:scale-95 font-medium bg-primary hover:bg-primary/80"
              onClick={() => {
                onProceed?.();
                onClose?.();
              }}
            >
              {primaryBtnLabel}
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default SuccessModalCard;
