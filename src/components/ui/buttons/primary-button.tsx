import { Button } from "../button";

function PrimaryButton({ text, size, onClick, ...props }) {
  return (
    <Button
      variant="default"
      size={size}
      onClick={onClick}
      className="bg-pink-600 hover:bg-pink-700 text-white font-semibold flex-1 font-sora"
      {...props}
    >
      {text}
    </Button>
  );
}

export { PrimaryButton };
