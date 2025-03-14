import { useState, useRef } from "react"
import { Input } from "./components/Input";
import { toPng } from "html-to-image";
import { Toast } from "./components/Toast";
import { QRCodeCanvas } from "qrcode.react";
import Logo from "./assets/Logo.svg"
import LogoSmall from "./assets/Logo-small.svg"
import download from "./assets/Load_circle_duotone.svg"
import clipboard from "./assets/link_alt.svg"
function App() {
  const [value, setValue] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [toast, setToast] = useState(false);
  const [logo, setLogo] = useState(null);
  const [toastMessage, setToastMessage] = useState('');
  const generateQRCode = (event) => {
    event.preventDefault();
    setQrCode(value)
  }

  const qrRef = useRef();

  const downloadQRCode = () => {
    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qrcode.png";
        link.click();
      })
      .catch((err) => {
        console.error("Error generating QR code image", err);
      });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
      setToastMessage('Logo uploaded successfully')
      setToast(true)
      setTimeout(() => {
        setToast(false)
      }, 2000);
    }
  };

  const backHome = () => {
    setQrCode('')
    setValue('')
    setLogo(null)
  }
  const copyToClipboard = () => {
    navigator.clipboard.writeText(qrCode)
    setToastMessage('URL Copied to clipboard')
    setToast(true)
    setTimeout(() => {
      setToast(false)
    }, 2000);
  }
  return (
    <>
      <main className="bg-[url('./assets/qa-bg-small.png')] md:bg-[url('./assets/qa-bg.png')] bg-center bg-cover flex flex-col items-center justify-center gap-4 h-screen">
        {
          !qrCode
          ? (
            <section className="flex flex-col items-center justify-center gap-4 h-screen">
              <h1 className="h-12 w-screen flex justify-center"><img src={Logo} alt="" /></h1>
              <form
                className="flex justify-between px-1 py-1 rounded-2xl border-2 border-blue-800 w-9/10 max-w-lg" 
                onSubmit={generateQRCode}
              >
                <Input setValue={setValue} />
                <button
                  className="disabled:bg-gray-600 bg-blue-800 px-2 py-2 rounded-xl w-1/4 text-white truncate" 
                  type="submit"
                  aria-label="Generate QR code"
                  disabled={!value}
                >
                  QR code
                </button>
              </form>
            </section>
          ) : (
            <section aria-label="QR code generated" className="flex flex-col justify-start h-screen pt-16 gap-14 items-center">
              <h2>
                <img src={LogoSmall} alt="" />
              </h2>
              <div ref={qrRef} className="relative bg-gray-700 w-80 h-80 py-8 rounded-[100%]"> 
                <div  className="mx-auto flex justify-center items-center bg-white rounded-4xl overflow-hidden w-64 h-64">
                  <QRCodeCanvas
                    value={value}
                    size={220}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H" // High error correction level to allow for logo overlay
                  />
                </div>
                { logo &&
                  <div className="absolute w-16 h-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <img src={logo} alt="" />
                  </div>
                }
              </div>
              <div className="w-screen max-w-xs md:max-w-md flex justify-between">
                <button
                  aria-label="Download QR code"
                  onClick={downloadQRCode}
                  className="flex gap-2 justify-center bg-blue-800 px-2 py-4 rounded-xl w-36 md:w-48 text-white"
                >
                  Download
                  <img src={download} alt="" />
                </button>
                <button
                  aria-label="Share QR code"
                  className="flex gap-2 justify-center items-center bg-blue-800 px-2 py-4 rounded-xl w-36 md:w-48 text-white" 
                  onClick={copyToClipboard}
                >
                    Share
                    <img src={clipboard} alt="" />
                  </button>
              </div>
              <section className="flex flex-col items-center justify-center gap-4">
                <p className="text-white">Set your logo here!</p>
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload} 
                  className="bg-blue-800 px-2 py-4 rounded-xl text-white w-36 md:w-48"
                  aria-label="Upload your logo"
                />
              </section>
              <button onClick={backHome} className="bg-blue-800 px-2 py-4 rounded-xl text-white w-16 absolute top-2 left-4" aria-label="Generate another QR code">Back</button>
              <Toast toast={toast} toastMessage={toastMessage}/>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App
