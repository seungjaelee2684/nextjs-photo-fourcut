import { IoCamera } from "react-icons/io5";

export function Header() {

  const headerClass = `
    w-[100%]
    h-[50px]
    absolute
    top-0
    left-0
    flex
    justify-between
    items-center
    bg-customPink
    text-white
    pl-[4%]
    pr-[4%]
  `

  const logoClass = `
    w-auto
    h-[70%]
    cover
    cursor-pointer
    hover:opacity-70
    transition-all
    duration-300
  `

  const cameraClass = `
    text-[40px]
    cursor-pointer
    hover:opacity-70
    transition-all
    duration-300
  `;

  return (
    <header className={headerClass}>
      <img
        src="/images/Luv.png"
        alt="로고"
        className={logoClass}
        onClick={() => window.location.href = "/"} />
      <IoCamera
        onClick={() => window.location.href = "/filming"}
        className={cameraClass} />
    </header>
  )
};