import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Breadcrumbs = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "GL Assessment Practice Papers 1";

  return (
    <nav className="text-gray-500 text-sm">
      <ul className="flex items-center gap-2">
        <li>
          <Link
            href="/"
            className="hover:underline text-[14px] font-[400] text-[#444444]"
          >
            Home
          </Link>
        </li>
        {/* <span className="text-gray-400">&gt;</span> */}
        <Icon icon="basil:caret-right-solid" className="text-[20px]" />
        <li>
          <Link
            href="/practice-papers"
            className="hover:underline text-[14px] font-[400] text-[#444444]"
          >
            Practice-papers
          </Link>
        </li>
        {/* <span className="text-gray-400">&gt;</span> */}
        <Icon icon="basil:caret-right-solid" className="text-[20px]" />
        <li className="text-[14px] font-[600] text-black">{name}</li>
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
