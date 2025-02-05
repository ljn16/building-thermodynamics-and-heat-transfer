interface ToggleProps {
  isOn: boolean;
  onChange: () => void;
  labelLeft: string;
  labelRight: string;
}

export function Toggle({ isOn, onChange, labelLeft, labelRight }: ToggleProps) {
  return (
    <div className="flex items-center">
      <span className="mr-2">{labelLeft}</span>
    <div 
      className={`w-14 h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-all ${
        isOn ? "bg-green-500" : "bg-gray-400"
      }`}
        onClick={onChange}
    >
      <div 
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
          isOn ? "translate-x-7" : "translate-x-0"
        }`}
      />
      </div>
      <span className="ml-2">{labelRight}</span>
    </div>
  );
};
