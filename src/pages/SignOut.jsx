import { useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/signin");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://www.pexels.com/download/video/31672750/"
          type="video/mp4"
        />
      </video>

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-white/20 text-center text-white">
        <h1 className="text-3xl font-bold mb-4">Are you sure?</h1>
        <p className="text-gray-200 mb-6">You are about to sign out</p>

        <button
          onClick={handleSignOut}
          className="w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg font-semibold transition shadow-lg hover:shadow-red-500/30 active:scale-[0.98]"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}