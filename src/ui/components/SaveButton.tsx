import Button from "./Button";
import { LuSave } from "react-icons/lu";

function SaveButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} variant="primary" type="button" className="">
      <LuSave /> Save
    </Button>
  );
}

export default SaveButton;
