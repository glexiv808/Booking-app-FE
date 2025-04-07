import LoginForm from "@/app/(auth)/login/login-form";
import Image from "next/image";
import { CheckIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import Google from "@/app/(auth)/login/google";

export default function LoginPage() {
  return (
    <div className="flex w-full justify-center text-[#121212] bg-cover "
    style={{
      backgroundImage: "url('/image.png?height=1080&width=1920')",
    }}>
    <div className="absolute inset-0 bg-teal-500/30 backdrop-blur-sm"></div>
    
    <div className="max-w-[600px] w-full h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 rounded-lg bg-sky-50/90 shadow-lg relative z-10">
        <div className=" items-center my-6">
          <h3 className="text-xl font-bold">Đăng nhập - Admin</h3>
        </div>
        <div className="flex justify-between w-full gap-[10%] ">
          <div className="flex-[4_4_0%]">
            <LoginForm /> 
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
