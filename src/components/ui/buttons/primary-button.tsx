import { Button } from "../button";

function PrimaryButton({ text, size, onClick, ...props }) {
  return (
    <Button
      variant="default"
      size="sm"
      onClick={onClick}
      className="bg-pink-600 hover:bg-pink-700 text-white flex-1 font-sora"
      {...props}
    >
      {text}
    </Button>
  );
}

export { PrimaryButton };
