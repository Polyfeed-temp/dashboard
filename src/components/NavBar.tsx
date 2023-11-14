import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import React, {useState} from "react";
export function NavBar() {
  const [activeButton, setActiveButton] = useState("");
  const buttons = ["Overview", "FIT 2099", "FIT 2004", "ENG 1055"];
  return (
    <Navbar className="w-full">
      <div className="container mx-auto flex flex-col text-blue-gray-900">
        {/* First Row */}
        <div className="flex items-center justify-between">
          <img src="/logo.png" alt="Logo" className="h-8 md:h-12" />
          <div className="flex items-center gap-x-1">
            <Button variant="text" size="sm" className="hidden lg:inline-block">
              <span>Log In</span>
            </Button>
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
            >
              <span>Sign in</span>
            </Button>
            <Avatar
              variant="circular"
              size="sm"
              alt="tania andrew"
              className="border border-gray-900 p-0.5"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="flex items-center justify-end gap-x-2 mt-4">
          {buttons.map((button, index) => (
            <Button
              key={index}
              variant={activeButton === button ? "filled" : "outlined"}
              onClick={() => setActiveButton(button)}
            >
              {button}
            </Button>
          ))}
        </div>
      </div>
    </Navbar>
  );
}
