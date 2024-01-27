import { ArrowRight, Link } from "lucide-react"
import MaxWidthWrapper from "./MaxWidthWrapper"
import { buttonVariants } from "./ui/button"
import dynamic from "next/dynamic"
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/server"

const Navbar = () => {
  return (
      <nav className="sticky h-14 inset-x-0 top-0 z-30 border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
        <MaxWidthWrapper>
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
              <>
              <a className="flex z-40 font-semibold" href="/">File Talk</a>
                {/* <Link 
                  href="/" 
                  className="flex z-40 font-semibold">
                    <div>Quill...</div>
                </Link> */}
                </>
                {/* Todo : add mobile navbar */}
                <div className="hidden items-center space-x-4 sm:flex">
                  <>
                    <a href="/pricing" className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}>Pricing</a>
                    <LoginLink className={buttonVariants({
                      variant: "ghost",
                      size: "sm",
                    })}>
                      Sign UP
                    </LoginLink>
                    <RegisterLink className={buttonVariants({
                      size: "sm",
                    })}>
                      Get Started <ArrowRight className="ml-1.5 h-5 w-5"/>
                    </RegisterLink>
                  </>
                </div>
            </div>
        </MaxWidthWrapper>
      </nav>
  )
}

export default dynamic (() => Promise.resolve(Navbar), {ssr: false})
