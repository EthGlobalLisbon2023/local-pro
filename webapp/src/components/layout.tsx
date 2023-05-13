import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "./authprovider";

// Define your NavBar component
const NavBar: React.FC = () => {
  const { balance, signIn, signOut, signInResult } =
    React.useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 text-white">
      <h1 className="text-lg">My App</h1>
      // Add more navigation elements as needed
      <div>
        <p>Your balance: {balance}</p>
      </div>
      <button
        className="border"
        onClick={async () => {
          await signIn();
        }}
      >
        Sign In
      </button>
      <button
        className="border"
        onClick={async () => {
          await signOut();
          // safeAuthKit.signOut();
        }}
      >
        Sign Out
      </button>
    </nav>
  );
};

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
