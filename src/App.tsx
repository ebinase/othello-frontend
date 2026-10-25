import PlayGround from "./components/PlayGround/PlayGround";
import Footer from "./components/shared/elements/Footer/Footer";
import Header from "./components/shared/elements/Header/Header";

export default function App() {
  return (
    <>
      <div className="h-[100dvh] flex flex-col">
        <Header />
        <main className="grow">
          <div className="h-full flex justify-between items-center">
            <PlayGround />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
