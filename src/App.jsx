import QRCode from "react-qr-code";

function App() {
  return (
    <>
      <h1 className="bg-red-500">QR Code Generator</h1>
      <QRCode value="https://github.com/Rubenbot07" />
    </>
  )
}

export default App
