"use client";
import Button from "@/components/buttons/Button";
import NextImage from "@/components/NextImage";
import Typography from "@/components/Typography";
import Layout from "@/layouts/Layout";
import { useState } from "react";
import { IoArrowForward } from "react-icons/io5";
import LoginWithEmail from "./container/LoginWithEmail";

// make array for button variant that is google, facebook, apple and user ( user can choose if user are buyer or seller), if user choose buyer, user will be directed to Sign In page, if user choose seller, user will be directed to Sign In page for seller
const buttonVariant = [
  "google",
  "facebook",
  "email",
  "buyer",
  "seller",
] as const;

const buttonVariantObject = {
  google: {
    icon: "/auth/GoogleIcon.svg",
    text: "Continue with Google",
  },
  facebook: {
    icon: "/auth/FacebookIcon.svg",
    text: "Continue with Facebook",
  },
  email: {
    icon: "/auth/Email.svg",
    text: "Continue with Email",
  },
  buyer: {
    icon: "/auth/CartIcon.svg",
    text: "Continue as a Seller",
  },
  seller: {
    icon: "/auth/CartIcon.svg",
    text: "Continue as a Buyer",
  },
};

const LoginWithButton = ({
  changeRole,
  setChangeRole,
  setClickEmail,
  handleLogin,
}: {
  changeRole: boolean;
  setChangeRole: React.Dispatch<React.SetStateAction<boolean>>;
  setClickEmail: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (user: string, provider: string) => void;
}) => {
  return (
    <div className="flex flex-col min-h-[400px] sm:w-[35%] sm:min-h-[65vh] sm:min-w-[450px] sm:px-12 sm:py-16 py-10 px-6 rounded-lg justify-between gap-10 bg-white">
      <div className="atas flex flex-col items-center gap-6">
        <div className="title flex flex-col items-start justify-center w-full lg:gap-2">
          <Typography
            variant="h1"
            className="text-xl font-bold sm:text-3xl md:text-3xl"
          >
            Sign In
          </Typography>
          <Typography variant="p" className="text-sm sm:text-base md:text-base">
            To continue {changeRole ? "Selling" : "Buying"}
          </Typography>
        </div>
        <div className="signinButton flex flex-col items-start justify-start gap-3 w-full">
          {buttonVariant
            .filter((variant) => variant !== "buyer" && variant !== "seller")
            .map((variant: keyof typeof buttonVariantObject) => (
              <Button
                key={variant}
                variant="grey"
                className="flex w-full justify-center items-center py-2 sm:py-4 rounded-sm sm:rounded-lg"
                onClick={
                  buttonVariantObject[variant].text === "Continue with Email"
                    ? () => setClickEmail(true)
                    : () =>
                        handleLogin(changeRole ? "seller" : "buyer", variant)
                }
              >
                <div className="flex justify-center items-center w-fit flex-row gap-2">
                  <NextImage
                    src={buttonVariantObject[variant].icon}
                    width={20}
                    height={20}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    imgClassName="w-4 h-4 sm:w-5"
                    alt={`${variant} logo`}
                  />
                  <Typography
                    variant="p"
                    className="text-xs sm:text-base md:text-base"
                  >
                    {buttonVariantObject[variant].text}
                  </Typography>
                </div>
              </Button>
            ))}
        </div>
        <div className="divider flex justify-center items-center gap-3 w-full">
          {/* line, OR, line */}
          <div className="w-full h-0 border border-[#BBBCBF]"></div>
          <Typography variant="p" className="text-xs sm:text-lg md:text-lg">
            OR
          </Typography>
          <div className="w-full h-0 border border-[#BBBCBF]"></div>
        </div>
        <Button
          variant="grey"
          className="flex w-full justify-center items-center gap-2 py-2 sm:py-4 rounded-sm sm:rounded-lg"
          onClick={() => setChangeRole(!changeRole)}
        >
          <NextImage
            src={
              changeRole
                ? buttonVariantObject.seller.icon
                : buttonVariantObject.buyer.icon
            }
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5"
            imgClassName="w-4 h-4 sm:w-5"
            alt={`Cart logo`}
          />
          <Typography variant="p" className="text-xs sm:text-base md:text-base">
            {changeRole
              ? buttonVariantObject.seller.text
              : buttonVariantObject.buyer.text}
          </Typography>
        </Button>
        {/* Already have an account? Log in Instead + -> icon */}
        <div className="RegisterInstead flex flex-row items-center justify-center gap-1">
          <Typography
            variant="p"
            className="text-xs sm:text-base md:text-base min-[300px]:text-[9px]"
          >
            Don't have an account?
          </Typography>
          <div className="flex flex-row items-center text-black justify-center gap-1 cursor-pointer hover:border-black/50  hover:text-black/50">
            <Typography
              variant="p"
              italic={true}
              className="text-xs sm:text-base md:text-base font-bold hover:text-black/50 min-[300px]:text-[9px]"
            >
              Sign Up Instead
            </Typography>
            <IoArrowForward className="w-3 h-3" />
          </div>
        </div>
      </div>
      <div className="bawah flex flex-row w-full gap-1 justify-center items-center">
        <Typography
          variant="p"
          className="text-[9px] min-[300px]:text-[8px] sm:text-xs  md:text-xs"
        >
          By continuing, you agree to Design Simplified’s
        </Typography>
        <Typography
          variant="p"
          italic={true}
          className="text-[9px] min-[300px]:text-[8px] sm:text-xs  md:text-xs font-normal text-black/80 hover:text-black/50 underline cursor-pointer"
        >
          Terms & Policies
        </Typography>
      </div>
    </div>
  );
};

export default function SignInPage() {
  const [changeRole, setChangeRole] = useState<boolean>(false);
  const [clickEmail, setClickEmail] = useState<boolean>(false);
  const [doneEmail, setDoneEmail] = useState<boolean>(false);

  const handleLogin = (user: string, provider: string) => {
    const url =
      process.env.NEXT_PUBLIC_RUN_MODE === "development"
        ? process.env.NEXT_PUBLIC_API_URL_DEV + `auth/local/${provider}/${user}`
        : process.env.NEXT_PUBLIC_API_URL_PROD + `auth/${provider}/${user}`;
    const BuyerWindow = window.open(url, "_self");
    if (!BuyerWindow) {
      alert("Please allow popups for this website");
    }
    if (BuyerWindow) {
      BuyerWindow.focus();
    }
  };

  return (
    <Layout withFooter={false} withNavbar={false}>
      <main className="relative bg-none w-full m-0 flex min-h-screen items-center justify-center gap-4 p-2 lg:flex-row lg:px-8 lg:py-12 ">
        {!clickEmail ? (
          <LoginWithButton
            changeRole={changeRole}
            setChangeRole={setChangeRole}
            setClickEmail={setClickEmail}
            handleLogin={handleLogin}
          />
        ) : (
          <LoginWithEmail
            setClickEmail={setClickEmail}
            setDoneEmail={setDoneEmail}
            doneEmail={doneEmail}
            state={changeRole ? "seller" : "buyer"}
          />
        )}
        <section className="w-full h-full -z-[100] absolute top-0 bottom-0 right-0 min-h-screen overflow-hidden">
          <NextImage
            src="/auth/backgroundDesktop.png"
            width={1440}
            height={1024}
            className="hidden sm:block sm:w-[115%] -z-[100] absolute top-0 bottom-0 right-0"
            imgClassName="object-cover w-full h-full"
            alt="Background image for desktop"
          />
          <NextImage
            src="/auth/backgroundMobile.png"
            width={390}
            height={840}
            className="block sm:hidden w-[100%] -z-[100] absolute top-0 bottom-0 left-0"
            imgClassName="object-cover w-full h-full"
            alt="Background image for desktop"
          />
        </section>
      </main>
    </Layout>
  );
}
