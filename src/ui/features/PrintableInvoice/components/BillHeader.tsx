import { HiMapPin } from "react-icons/hi2";
import { IoMdMail } from "react-icons/io";
import { MdPermContactCalendar } from "react-icons/md";

function BillHeader({ logoSrc }: { logoSrc: string }) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-4">
        <img className="block w-14 print:w-16" src={logoSrc} alt="adarsha printers logo" />
        <div>
          <h2 className="text-lg text-text-primary uppercase font-bold tracking-wide leading-5">Adarsha Printers</h2>
          <p className="text-xs font-light leading-3 print:text-sm">
            (A Unit of PMEGP | A Govt. of Assam Regd. SSI Unit)
          </p>
          <p className="text-xs flex items-center gap-1 print:text-sm">
            <HiMapPin />
            Cube Complex, GNB Road, Guwahati Club, Guwahati - 3
          </p>
          <p className="text-xs flex items-center gap-1 leading-3 print:text-sm">
            <MdPermContactCalendar /> 70029-00436, 98640-35212
          </p>
          <p className="text-xs flex items-center gap-1 leading-3 print:text-sm">
            <IoMdMail /> adarshaprinters@gmail.com
          </p>
        </div>
      </div>
      <div>
        <h3 className="uppercase font-bold text-2xs text-right print:text-sm">Invoice</h3>
        <p className="text-xs text-right print:text-sm">
          <span className="font-semibold">GSTIN</span> 18ABPPH1875E1ZH
        </p>
      </div>
    </div>
  );
}

export default BillHeader;
