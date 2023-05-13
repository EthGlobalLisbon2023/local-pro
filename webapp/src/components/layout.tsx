import React, { useContext } from "react";
import AuthProvider, { AuthContext } from "./authprovider";
import Button from "./button";
import Text from "./txt";

// Define your NavBar component
const NavBar: React.FC = () => {
  const { balance, signIn, signOut, signInResult, userInfo } =
    React.useContext(AuthContext);

  return (
    <nav className=" flex justify-between p-4">
      <div className="flex items-center justify-center gap-2 align-middle">
        <div className="flex-shrink-0">
          <img
            className="h-8 w-8 rounded-full border border-gray-950"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Your Company"
          />
        </div>
        <Text bold>{userInfo?.name}</Text>
      </div>

      {balance === "N/A" || balance == null ? (
        <Button
          onClick={async () => {
            await signIn();
          }}
        >
          Sign In
        </Button>
      ) : (
        <div className="rounded-3xl bg-black/10 p-2">
          <Text bold>{balance}</Text>
        </div>
      )}

      {/* <button
        className="border"
        onClick={async () => {
          await signOut();
        }}
      >
        Sign Out
      </button> */}
    </nav>
  );
};

type LayoutProps = {
  children?: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col bg-gradient-color">
        <NavBar />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
