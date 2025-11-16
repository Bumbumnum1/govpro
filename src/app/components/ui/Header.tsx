import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between mb-5 p-5  ">
        <div className="text-xl font-medium  flex flex-row gap-25 items-center">
          <Link href="/">
            <Image src="/logo.svg" alt="logo" width={190} height={65} />
          </Link>
          <div className="flex flex-row gap-20">
            <div>
              <Link href="/" className="cursor-pointer hover:font-semibold">
                Report
              </Link>
            </div>

            <div>
              <Link
                href="/about"
                className="cursor-pointer hover:font-semibold"
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
