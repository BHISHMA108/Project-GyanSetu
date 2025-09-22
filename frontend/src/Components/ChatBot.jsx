import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import botimage from "/bot-logo.png";
export default function ChatBot() {
  const [modal, setModal] = useState(false);
  const [form, setForm] = useState({ input: "" });
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleClick = () => setModal(true);
  const handleClose = () => setModal(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.input.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: form.input }]);

    try {
      const res = await axios.post("https://project-gyan-backend.vercel.app/api/chatbot", form);

      if (res.status === 200) {
        let botReply = res.data.reply || "No reply from AI";
        setMessages((prev) => [...prev, { role: "bot", content: botReply }]);
        setForm({ input: "" });
      }
    } catch (err) {
      console.error("❌ Error from frontend:", err);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "❌ Error: Could not get response." },
      ]);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 bg-[#ef233c] right-6 h-[62px] w-[62px] z-[99] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 overflow-hidden p-0"
      >
        <div className="text-[38px]">
          🤖
        {/* <img
          src={botimage}
          alt="Chatbot"
          className="h-full w-full object-cover rounded-full"
        /> */}
        </div>
      </button>


      {/* Modal */}
      {modal && (
        <div className="fixed bottom-24 right-6 z-[101] w-[380px] h-[480px] 
                        bg-gray-900 border border-gray-700 rounded-xl shadow-xl 
                        flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center px-4 py-3 bg-gray-800 rounded-t-xl border-b border-gray-700">
            <h2 className="text-lg font-semibold text-white">Chatbot</h2>
            <button
              onClick={handleClose}
              className="w-6 h-6 flex items-center justify-center 
                         text-gray-300 text-sm font-bold rounded-full 
                         hover:bg-red-500 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 text-sm p-4 overflow-y-auto text-white flex flex-col gap-2">
            {messages.length === 0 && (
              <p className="text-sm text-gray-400 mb-3">👋 Hi! Ask me anything.</p>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[80%] whitespace-pre-line ${msg.role === "user"
                    ? "bg-orange-500 self-end text-white"
                    : "bg-gray-700 self-start text-white"
                  }`}
              >
                {msg.content}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center text-xl h-[61px] gap-2 p-3 border-t border-gray-700 bg-gray-800 rounded-b-xl"
          >
            <input
              className="flex-1 w-full h-full px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-orange-400"
              name="input"
              type="text"
              value={form.input}
              placeholder="Type your question..."
              onChange={handleChange}
            />
            <button
              type="submit"
              className="px-4 py-2 h-full flex justify-center items-center align-center bg-[#ef233c] text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </>
  );
}
