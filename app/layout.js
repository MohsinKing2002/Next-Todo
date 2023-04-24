import { ContextProvider } from "../components/Clients";
import "../styles/app.scss";
import Header from "./Header";
export const metadata = {
  title: "Todo App",
  description: "Fullstack Todo app using Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>
          <Header />
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
