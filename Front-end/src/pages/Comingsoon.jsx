import NavBar from "../components/Navbar";

export default function comingSoon() {
  return (
    <>
      <NavBar />
      <div className="coming-soon mx-auto w-3/4 justify-center">
        <img src="/coming_soon.png" alt="" className="mx-auto" />
        <h1 className="text-primary font-bold text-2xl text-center">
          THIS PAGE WILL BE AVAILABLE VERY SOON
        </h1>
      </div>
    </>
  );
}
