import React from "react";

function Footer() {
  

    return (
      <>
        {/* <div className="w-screen bg-[#FD7B03] py-4 grid justify-center items-center">
          <p className="text-white">© Derechos Reservados 2024</p>
        </div> */}
        <footer className="w-screen bg-[#FD7B03] py-4 grid justify-center items-center text-white">
        <p className="mb-2">© 2025 Comé x Menos. Todos los derechos reservados.</p>
        <div className="flex justify-center gap-4">
          {/* <Link href="/terms">Términos y Condiciones</Link>
          <Link href="/privacy">Política de Privacidad</Link> */}
          <p>Términos y Condiciones</p>
          <p>Política de Privacidad</p>
        </div>
      </footer>
      </>
    )
  }
  
  export default Footer;