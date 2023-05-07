type Props = {
  theme: "light" | "dark";
  children: React.ReactNode;
};

const lightTheme = "border-sky-400 bg-white text-slate-600";
const darkTheme = "border-orange-500 bg-slate-700 text-slate-50";

const PlayerBar: React.FC<Props> = ({ theme, children }) => {
  return (
    <div className="mb-1">
      <div
        className={`rounded-full border-4  p-2 w-40 shadow-xs ${
          theme === "light" ? lightTheme : darkTheme
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default PlayerBar;
