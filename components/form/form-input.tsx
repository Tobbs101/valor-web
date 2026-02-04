/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  field,
  label,
  placeholder,
  type,
  disabled,
  className,
  containerClassName,
  description,
  hasError,
  id,
}: {
  field: any;
  label?: string | React.ReactNode;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  description?: any;
  hasError?: any;
  id?: string;
}) => {
  if (type === "file")
    return (
      <FormItem className="w-full flex-1 p-2">
        {label && <FormLabel>{label}</FormLabel>}
        <FormControl>
          <Input
            id={id}
            disabled={disabled}
            className={cn(`text-[16px] duration-200 bg-white`, className)}
            type={type}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>

        <div
          className={`flex items-start ${
            hasError
              ? "justify-between"
              : description
                ? "justify-end"
                : "justify-start"
          }`}
        >
          <FormMessage className="text-xs h-[20px]" />

          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </FormItem>
    );

  return (
    <FormItem className={cn("w-full flex-1", containerClassName)}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input
          id={id}
          disabled={disabled}
          className={cn(
            `text-[16px] placeholder:text-[14px] duration-200 bg-white`,
            className,
          )}
          type={type}
          placeholder={placeholder}
          {...field}
        />
      </FormControl>

      <div
        className={`flex items-start ${
          hasError
            ? "justify-between"
            : description
              ? "justify-end"
              : "justify-start"
        }`}
      >
        <FormMessage className="text-xs h-[20px]" />

        {description && <FormDescription>{description}</FormDescription>}
      </div>
    </FormItem>
  );
};

export default FormInput;
