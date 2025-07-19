import { MdPictureAsPdf } from "react-icons/md";

const WinPrint = () => {

const print = () => {
    window.print();
    };

return (
    <button
        aria-label="Download Resume"
        className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-white text-blue-600 shadow-lg border-2 border-white hover:bg-blue-50 transition-colors duration-200"
        onClick={print}
      >
       <MdPictureAsPdf className="w-10 h-10" title="Download Resume"/>
      </button>
    );
};

export default WinPrint;