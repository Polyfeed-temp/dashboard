import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
  Avatar,
  MenuHandler,
  MenuList,
  MenuItem,
  Menu,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
// import {useUserDispatch, useUserState} from "../store/UserContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuItemsData } from "./MenuItemsData";
import { UnitSelection } from "./UnitSelection";
import { UnitContext } from "../store/UnitContext";
import { useAuth } from "../store/AuthContext";
import { addLogs, eventType, eventSource } from "../services/logs.serivce";

export function NavBar({ unitCodes }: { unitCodes: string[] | null }) {
  const { unit } = useContext(UnitContext);
  const [activeButton, setActiveButton] = useState("Overview");

  const { user, logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // const user = useUserState();
  // const userDispatch = useUserDispatch();
  const initial = user?.firstName?.substring(0, 1) || user?.email?.substring(0, 1);

  return (
    <Navbar
      className="max-w-full"
      style={{ position: "relative", zIndex: 9999 }}
    >
      <div className="container-fluid">
        {isAuthenticated ? (
          <>
            <div className="flex items-left justify-between">
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="Logo"
                className="h-20 md:h-12"
              />

              <div className="flex items-center gap-x-1">
                <div className="flex items-center">
                  <nav className="desktop-nav">
                    <ul className="menus">
                      {menuItemsData.map((menu, index) => {
                        const url = menu.url.replace(
                          ":unitId",
                          unit?.unitId || "all"
                        );
                        return (
                          <li className="menu-items" key={index}>
                            <Link
                              to={url}
                              className={`font-bold py-2 px-4 rounded ${
                                activeButton === menu.title
                                  ? "bg-black"
                                  : "bg-gray-500 hover:bg-black"
                              } text-white`}
                              onClick={() => {
                                addLogs({
                                  eventType: eventType[13],
                                  content: JSON.stringify({
                                    current: activeButton,
                                    target: menu.title,
                                  }),
                                  eventSource: eventSource[13],
                                });
                                setActiveButton(menu.title);
                              }}
                            >
                              {menu.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                </div>

                <div className="ml-6">
                  <Menu>
                    <MenuHandler>
                      <button className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-500 rounded-full dark:bg-gray-600">
                        <span>{initial}</span>
                      </button>
                    </MenuHandler>
                    <MenuList className="z-[9999]">
                      <MenuItem className="flex items-center gap-2">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM10 5C10 5.53043 9.78929 6.03914 9.41421 6.41421C9.03914 6.78929 8.53043 7 8 7C7.46957 7 6.96086 6.78929 6.58579 6.41421C6.21071 6.03914 6 5.53043 6 5C6 4.46957 6.21071 3.96086 6.58579 3.58579C6.96086 3.21071 7.46957 3 8 3C8.53043 3 9.03914 3.21071 9.41421 3.58579C9.78929 3.96086 10 4.46957 10 5ZM8 9C7.0426 8.99981 6.10528 9.27449 5.29942 9.7914C4.49356 10.3083 3.85304 11.0457 3.454 11.916C4.01668 12.5706 4.71427 13.0958 5.49894 13.4555C6.28362 13.8152 7.13681 14.0009 8 14C8.86319 14.0009 9.71638 13.8152 10.5011 13.4555C11.2857 13.0958 11.9833 12.5706 12.546 11.916C12.147 11.0457 11.5064 10.3083 10.7006 9.7914C9.89472 9.27449 8.9574 8.99981 8 9Z"
                            fill="#90A4AE"
                          />
                        </svg>

                        <Typography variant="small" className="font-medium">
                          My Profile
                        </Typography>
                      </MenuItem>
                      <hr className="my-2" />
                      <MenuItem
                        className="flex items-center gap-2"
                        onClick={() => logout()}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M2 4.5C2 3.67157 2.67157 3 3.5 3H8V2H3.5C2.11929 2 1 3.11929 1 4.5V11.5C1 12.8807 2.11929 14 3.5 14H8V13H3.5C2.67157 13 2 12.3284 2 11.5V4.5Z"
                            fill="#90A4AE"
                          />
                          <path
                            d="M10.604 11.146L13.75 8L10.604 4.854L9.896 5.561L12.086 7.5H5V8.5H12.086L9.896 10.439L10.604 11.146Z"
                            fill="#90A4AE"
                          />
                        </svg>
                        <Typography variant="small" className="font-medium">
                          Logout
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Logo"
              className="h-20 md:h-12"
            />
            <div className="flex items-center gap-x-1">
              <Button
                onClick={() => navigate('/login')}
                className="bg-black text-white"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </Navbar>
  );
}
