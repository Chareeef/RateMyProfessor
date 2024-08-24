import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-center p-4 bg-stone-400 border-t-2 border-stone-800 text-white text-xl">
      <h3 className="font-bold m-0">Youssef Charif Hamidi</h3>
      <p>© 2024</p>
      <div className="flex space-x-4">
        <a
          className="hover:text-green-800"
          href="https://github.com/Chareeef"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub size={20} />
        </a>
        <a
          className="hover:text-green-800"
          href="https://linkedin.com/in/youssef-charif-hamidi"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://x.com/YoussefCharifH2"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center hover:text-green-800"
          style={{ width: "20px", height: "20px" }}
        >
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>𝕏</span>
        </a>
      </div>
    </footer>
  );
}
