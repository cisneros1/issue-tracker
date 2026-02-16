"use client";

import {Skeleton} from "@/app/components";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {AiFillBug} from "react-icons/ai";
import classnames from "classnames";
import {authClient} from "@/lib/auth-client";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
    return (
        <nav className="border-b mb-5 px-5 py-3">
            <div className="container mx-auto">
                <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                        <Link href="/">
                            <AiFillBug />
                        </Link>
                        <NavLinks />
                    </div>
                    <AuthStatus />
                </div>
            </div>
        </nav>
    );
};

const NavLinks = () => {
    const currentPath = usePathname();

    const links = [
        { label: "Dashboard", href: "/" },
        { label: "Issues", href: "/issues/list" },
    ];

    return (
        <ul className="flex space-x-6">
            {links.map((link) => (
                <li key={link.href}>
                    <Link
                        className={classnames({
                            "nav-link": true,
                            "!text-zinc-900": link.href === currentPath,
                        })}
                        href={link.href}
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const AuthStatus = () => {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) return <Skeleton width={"3rem"} />;

    if (!session)
        return (
            <button
                className="nav-link cursor-pointer"
                onClick={() => authClient.signIn.social({ provider: "google" })}
            >
                Login
            </button>
        );

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="cursor-pointer rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image ?? undefined} />
                        <AvatarFallback>?</AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    <span className="text-sm">{session.user.email}</span>
                </DropdownMenuLabel>
                <DropdownMenuItem
                    onClick={() => authClient.signOut()}
                    className="cursor-pointer"
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NavBar;
