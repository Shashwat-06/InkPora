// import Footer from "./components/Footer";
// import Header from "./components/Header";
// import { Outlet } from "react-router-dom";

// function Layout() {
//   return (
//     <div className="min-h-screen flex flex-col bg-inkpora-bg">
//       <Header />
//       <main className="flex-1 bg-inkporabg">
//         <Outlet />
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default Layout;
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-inkpora-bg">
      <Header />
      <ScrollToTop />
      <main className="flex-1 bg-inkporabg">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
