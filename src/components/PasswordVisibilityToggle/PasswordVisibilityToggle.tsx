import { FormDescription } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { useRef } from "react";

type PasswordVisibilityToggleProps = {
  isVisible: boolean;
  onToggle: () => void;
};

const PasswordVisibilityToggle = ({ isVisible, onToggle }: PasswordVisibilityToggleProps) => {
  const checkboxRef = useRef<HTMLButtonElement | null>(null);

  const handleShowPassword = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  return (
    <div className="flex space-x-2 items-center w-fit cursor-pointer" onClick={handleShowPassword}>
      <Checkbox ref={checkboxRef} checked={isVisible} onCheckedChange={onToggle} />
      <FormDescription>Show password</FormDescription>
    </div>
  );
};

export default PasswordVisibilityToggle;
