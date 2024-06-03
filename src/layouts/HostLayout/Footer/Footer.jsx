import { Footer as FooterAntd } from "antd/es/layout/layout";

export default function Footer() {
  return (
    <>
      <FooterAntd className="text-center bg-white font-semibold">
        Copyrights ©{new Date().getFullYear()} . All rights reserved.
      </FooterAntd>
    </>
  );
}
