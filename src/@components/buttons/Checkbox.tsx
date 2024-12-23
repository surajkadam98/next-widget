interface CheckboxProps {
  name: string;
  id: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  return (
    <div className="flex gap-2 -mt-1">
      <input
        className={`
                    ${props.className}
                    peer relative appearance-none shrink-0 w-5 h-5 rounded-sm mt-1 bg-white
                    focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
                    checked:bg-white checked:border-0
                    disabled:border-steel-400 disabled:bg-steel-400 cursor-pointer
                `}
        type="checkbox"
        name={props.name}
        id={props.id}
        onChange={props.onChange}
      />
      <svg
        className="absolute w-5 h-5 pointer-events-none hidden peer-checked:block stroke-widgetBg mt-1 outline-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
  );
};

export default Checkbox;
