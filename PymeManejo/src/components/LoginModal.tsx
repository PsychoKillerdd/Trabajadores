import React, { useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setError("");
      onLoginSuccess();
      onClose();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-sm relative border border-gray-200">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-black tracking-tight">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <input
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <input
            className="border border-gray-300 rounded px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-400"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm text-center font-semibold">{error}</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white font-bold py-3 rounded shadow-lg transition-all text-lg tracking-wide mt-2"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
}; 