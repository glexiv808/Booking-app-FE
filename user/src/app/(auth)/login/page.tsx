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
        backgroundImage: "url('/the-thao.jpg?height=1080&width=1920')",
      }}>
      <div className="absolute inset-0 bg-teal-500/30 backdrop-blur-sm"></div>
      
      <div className="max-w-[600px] w-full h-screen flex justify-center items-center">
        <div className="w-full max-w-md p-8 rounded-lg bg-sky-50/90 shadow-lg relative z-10">
          <div className="flex items-center my-6">
            <h3 className="text-xl font-bold">Chào mừng bạn đến với AE booking</h3>
          </div>
          <div className="flex justify-between w-full gap-[10%] ">
            <div className="flex-[4_4_0%]">
              <div className="mb-4 text-[#414042] text-sm font-normal">
                Bằng việc đăng nhập, bạn đồng ý với các{" "}
                <Link href={"#"} className="text-[#0e2eed]">
                  Điều khoản dịch vụ
                </Link>{" "}
                và{" "}
                <Link href={"#"} className="text-[#0e2eed]">
                  Chính sách quyền riêng tư
                </Link>{" "}
                của AE booking liên quan đến thông tin riêng tư của bạn.
              </div>
              <Google title={"Đăng nhập bằng Google"}/>
              <div className="relative flex items-center py-4">
                <Separator className="absolute" />
                <div className="relative flex w-full  justify-center  ">
                  <span className="px-3 text-sm">hoặc</span>
                </div>
              </div>
              <LoginForm />
              <div className="flex justify-center my-4">
                
                <Link
                  href="/owner/src/app/(auth)/login"
                  className="text-[#0e2eed] hover:text-[#192fb5]"
                >
                  Nếu bạn là chủ sân, bấm vào đây để đăng nhập?&nbsp;
                </Link>
              </div>
              <div className="flex justify-center my-4">
                Bạn chưa có tài khoản?&nbsp;
                <Link
                  href="/register"
                  className="text-[#0e2eed] hover:text-[#192fb5]"
                >
                  Đăng ký ngay
                </Link>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
