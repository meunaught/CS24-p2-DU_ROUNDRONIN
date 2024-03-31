import Usernavbar from "./UserNavbar"
import Sidebar from "./Sidebar"

export default function AuthLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}

      <header className="flex flex-col w-[100vw] justify-center items-center h-[20vh] z-50 fixed">
        <Usernavbar />
      </header>
      <div className="w-full h-full" >
        <Sidebar />
        <ul className="background "  >
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <main className="flex flex-row w-screen h-screen justify-center items-center ">{children}</main>

      </div>
    </section>
  )
}