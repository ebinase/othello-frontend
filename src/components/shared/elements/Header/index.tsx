"use client";

const Header: React.FC = () => {
  const handleNewGame = () => {
    if (confirm("プレイ中のゲームの情報が失われます。よろしいですか？")) {
      // FIXME: リロードではなく、ゲームの状態をリセットする
      window.location.reload();
    }
  };

  return (
    <header>
      <div className="h-12 mx-[2rem] flex justify-between items-center">
        <h1 className="font-bold text-slate-500 tracking-wide text-xl">
          Othello
        </h1>
        <div className="flex justify-end gap-5">
          <button
            onClick={handleNewGame}
            className="text-slate-600 text-sm font-light "
          >
            new game
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
