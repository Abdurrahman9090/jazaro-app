import React from "react";
import NextLink from "next/link";
import { MenuProps } from "antd/lib";
import { User } from "lucide-react";
import { Dropdown, Button, Avatar } from "antd";
import { humanize } from "@/utils";
// Redux
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/redux/store";
import { AuthSelector } from "@/redux/reducers";
import { FixerStatus, UserRoles } from "@/types";
import { logout } from "@/redux/actions/authAction";
import { switchUserRole } from "@/redux/actions/userAction";

const NavProfile = () => {
  const { user } = useSelector(AuthSelector);
  const dispatch = useAppDispatch();

  const isClient = user?.role === UserRoles.Client;
  const isFixer =
    user?.role === UserRoles.Fixer && user?.status === FixerStatus.Approved;

  let userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      label: (
        <NextLink
          href="/profile"
          className="text-[#006064] hover:text-[#00838F]"
        >
          Profile Settings
        </NextLink>
      ),
    },
  ];

  // If user is fixer and approved, allow switching between roles
  // Show only the switch option for the *other* role, not both
  if (isFixer) {
    // If currently Fixer, show "Switch to Client"
    userMenuItems.push({
      key: "switch-client",
      label: (
        <NextLink
          onClick={() => {
            dispatch(switchUserRole());
          }}
          href="/user/dashboard"
          className="text-[#006064] hover:text-[#00838F]"
        >
          Switch to Client
        </NextLink>
      ),
    });
  } else if (isClient) {
    // If currently Client, show "Switch to Fixer" (if fixer is approved)
    if (user?.status === FixerStatus.Approved) {
      userMenuItems.push({
        key: "switch-fixer",
        label: (
          <NextLink
            onClick={() => {
              dispatch(switchUserRole());
            }}
            href="/user/dashboard"
            className="text-[#006064] hover:text-[#00838F]"
          >
            Switch to Fixer
          </NextLink>
        ),
      });
    }
  }

  // Add divider if there are more than just profile
  if (userMenuItems.length > 1) {
    userMenuItems.push({ type: "divider" });
  }

  userMenuItems.push({
    key: "logout",
    label: (
      <span
        className="text-[#006064] hover:text-[#00838F] cursor-pointer"
        onClick={() => dispatch(logout())}
      >
        Logout
      </span>
    ),
  });

  return (
    // antd dropdown for user profile
    <Dropdown
      menu={{ items: userMenuItems }}
      placement="bottomRight"
      trigger={["click"]}
      overlayClassName="w-40"
    >
      <Button
        type="text"
        className="focus:outline-none p-0 border-0 shadow-none flex items-center gap-2"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <Avatar
          size={32}
          src={user?.avatar || "/default-avatar.png"}
          className="bg-gradient-to-br from-[#00BCD4] to-[#26C6DA] border-2 border-[#00BCD4]/30"
          icon={<User className="h-5 w-5 text-white" />}
        />
        <span className="text-[#006064] font-semibold text-base truncate max-w-[100px]">
          {humanize(user?.username || "User")}
        </span>
      </Button>
    </Dropdown>
  );
};

export default NavProfile;
