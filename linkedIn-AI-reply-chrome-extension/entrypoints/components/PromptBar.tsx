import ReactDOM from "react-dom";

type PromptBarProps = {
  onClose: () => void;
}
const PromptBar: React.FC<PromptBarProps> = ({ onClose }) => {
  const [generate, setGenerate] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [copyOfPrompt, setCopyOfPropmt] = useState("");
  const [showDummy, setShowDummy] = useState(false);
  const dummyText = `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`;

  const handleGenerate = () => {
    if (prompt.length > 0) {
      setCopyOfPropmt(prompt);
      setPrompt("");
      setGenerate(true);
      //after the 3 sec the dummy text will show on display
      setTimeout(() => {
        setShowDummy(true);
      }, 3000);
    } else {
      alert("Please enter your prompt");
    }
  };

  const handleInsert = () => {
    const textArea = document.querySelector(
      ".msg-form__contenteditable"
    ) as HTMLTextAreaElement;

    textArea.children[0].innerHTML = dummyText;

    // Create and dispatch an 'input' event to simulate typing
    const inputEvent = new Event("input", { bubbles: true });
    
    textArea.dispatchEvent(inputEvent);
    onClose();
    setGenerate(false);
    setPrompt("");
    setCopyOfPropmt("");
  };
  
  return ReactDOM.createPortal(
      <div
        className="fixed inset-0 border-4 border-green-800 bg-transparent z-40  flex w-full justify-center items-center"
        onClick={onClose}
      >
        <div
          className="bg-white flex flex-col gap-4 p-10 rounded-md shadow-lg z-50 w-1/3 border-4 border-black"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col p-2 gap-3 border-2 border-gray-300">
            {generate && (
              <div className=" bg-green-100 p-2 rounded-md self-end border border-black flex justify-start ">
                <p>{copyOfPrompt}</p>
              </div>
            )}
            {showDummy && (
              <div className=" bg-pink-100 p-2 rounded-md self-end border-black flex justify-end ">
                <p>{dummyText}</p>
              </div>
            )}
            {generate && !showDummy && (
              <div className=" bg-pink-100 p-2 rounded-md self-end border-4 border-black flex justify-start ">
                <p>Loading.....</p>
              </div>
            )}
            {/* Prompt box */}
            <input
              type="text"
              placeholder="Your prompt"
              className="py-2 px-3 border border-gray-300 rounded-md w-full"
              onChange={(e) => setPrompt(e.target.value)}
              value={prompt}
              
            />
          </div>
          <div className="flex justify-end">
            {generate ? (
              <div className="flex gap-2 ">
                {showDummy && (
                  <button
                    className="bg-blue-600 px-4 py-2 rounded-md text-white"
                    onClick={handleInsert}
                  >
                    Insert ⬇
                  </button>
                )}
                <button className="bg-blue-600 px-4 py-2 rounded-md text-white">
                  Regenerate
                </button>
              </div>
            ) : (
              <button
                className="bg-blue-600 px-4 py-2 rounded-md text-white"
                onClick={handleGenerate}
              >
                Generate
              </button>
            )}
          </div>
        </div>
      </div>,
    document.body
  );
};

export default PromptBar;
