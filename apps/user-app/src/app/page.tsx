import { Poppins } from "next/font/google";
import { AuroraBackground } from "@repo/shadcn/components/aceternity/aurora-background";
import { TextGenerateEffect } from "@repo/shadcn/components/aceternity/text-generate-effect";

const poppins = Poppins({
  weight: ["500"],
  subsets: ["latin"],
});

const page = async () => {
  return (
    <div>
      <AuroraBackground>
        <div
          className={`${poppins.className} text-7xl font-semibold text-black`}
        >
          PayTm
        </div>
        <div className="w-[50%]">
          <TextGenerateEffect words="Paytm, India's leading digital payment platform, offers a seamless and secure way to pay bills, recharge, book tickets, and shop online. With its user-friendly interface, cashback offers, and extensive range of services, Paytm revolutionizes your daily transactions, ensuring convenience and reliability at your fingertips. Experience hassle-free digital payments with Paytm today!" />
        </div>
      </AuroraBackground>
    </div>
  );
};

export default page;
