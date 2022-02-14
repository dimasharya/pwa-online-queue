import React from "react";

export default function Main({ children }) {
  return (
    <main className="pb-20 bg-gradient-to-b from-teal-500 via-gray-200 to-gray-200 bg-fixed">
      <div className="grid mx-auto">{children}</div>
    </main>
  );
}
