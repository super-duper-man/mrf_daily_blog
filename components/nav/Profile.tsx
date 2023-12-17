"use client";

import { useUser } from "@/lib/store/user";
import Image from "next/image";
import React, { useState } from "react";

import Popover from "@mui/material/Popover";
import Link from "next/link";
import { Button } from "../ui/button";
import { Box } from "@mui/material";

import { DashboardIcon, LockOpen1Icon } from "@radix-ui/react-icons";

export default function Profile() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLImageElement | null>(null);

  const user = useUser((state) => state.user);

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      <Image
        src={user?.user_metadata.avatar_url}
        alt={user?.user_metadata.user_name}
        width={50}
        height={50}
        className="rounded-full ring-2 ring-green-500 cursor-pointer"
        onClick={handleClick}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={1}>
          <div className="px-4 text-sm">
            <p>{user?.user_metadata?.user_name}</p>
            <p className="text-gray-500">{user?.user_metadata?.email}</p>
          </div>
          <div className="mt-2">
            <Link href="/dashboard">
              <Button
                className="w-full flex items-center justify-between"
                variant="ghost"
              >
                Dashboard
                <DashboardIcon />
              </Button>
            </Link>
            <Button
              className="w-full flex items-center justify-between"
              variant="ghost"
            >
              Logout
              <LockOpen1Icon />
            </Button>
          </div>
        </Box>
      </Popover>
    </>
  );
}
