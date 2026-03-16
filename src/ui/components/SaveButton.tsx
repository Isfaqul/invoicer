import Button from "./Button";
import { LuSave } from "react-icons/lu";

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="secondary" type="button" className="w-full">
      <div className="flex items-center gap-2">
        <LuSave /> Save
      </div>

      <span className="block ml-auto text-xs">Ctrl+S</span>
    </Button>
  );
}

export default SaveButton;
