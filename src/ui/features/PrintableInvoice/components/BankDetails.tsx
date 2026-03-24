type BankDetails = {
  name: string;
  accountNumber: string;
  bankName: string;
  ifsc: string;
  branchName: string;
  qrCodeSrc: string;
};

function BankDetails({ bank }: { bank: BankDetails }) {
  return (
    <div className="grow border border-border-light p-2 pb-3 rounded-md mt-3 flex gap-3">
      <div>
        <h3 className="uppercase text-xs font-semibold mb-1 print:text-sm">Bank details : </h3>
        <div className="text-xs print:text-sm">
          <p>
            <span className="inline-block w-20">Name</span>
            <span>{bank.name}</span>
          </p>
          <p>
            <span className="inline-block w-20">A/c</span>
            <span>{bank.accountNumber}</span>
          </p>
          <p>
            <span className="inline-block w-20">Bank Name</span>
            <span>{bank.bankName}</span>
          </p>
          <p>
            <span className="inline-block w-20">IFSC</span>
            <span>{bank.ifsc}</span>
          </p>
          <p>
            <span className="inline-block w-20">Branch</span>
            <span>{bank.branchName}</span>
          </p>
        </div>
      </div>
      <div>
        <h3 className="uppercase text-xs font-semibold mb-1 print:text-sm">QR Code : </h3>
        <img className="block size-20 print:size-25" src={bank.qrCodeSrc} alt="upi-QR-code" />
      </div>
    </div>
  );
}

export default BankDetails;
