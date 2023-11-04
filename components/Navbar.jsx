"use client";

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

const Navbar = () => {

    // checking condition user is loggedin or not
    const { data: session } = useSession();

    // set the providers
    const [providers, setProviders] = useState(null);

    //control toggel drop down on small devices
    const [toggelDropdown, setToggelDropdown] = useState(true);

    // this is ftech the providers on evry first render
    useEffect(() => {

        // this function fecth the provuders 
        const setUpProviders = async () => {

            const response = await getProviders();

            //set providers
            setProviders(response)
        }

        // calling a providers
        setUpProviders();

    }, [])


    return (
        <nav className="flex-between w-full mb-16 pt-3">

            {/* logo image  */}
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    width={30}
                    height={30}
                    alt="Promptopia logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

     

            {/* Desktop navigation */}
            <div className="sm:flex hidden">
                {session?.user ?
                    (
                        <div className="flex gap-3 md-gap-5">
                            <Link href="/create-prompt" className="black_btn">Create Post</Link>

                            <button type="button" className="outline_btn"
                                onClick={signOut}>
                                Sign Out
                            </button>

                            <Link href="/profile">
                                <Image src={session?.user.image}
                                    height={37}
                                    width={37}
                                    className="rounded-full"
                                    alt="profile"
                                />
                            </Link>
                        </div>
                    ) : (
                        <>
                            {
                                providers && Object.values(providers).map((provider) => (
                                    <button
                                        type="button"
                                        key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn"
                                    >
                                        Sign In

                                    </button>
                                ))
                            }
                        </>
                    )}
            </div>



            {/* mobile navigation */}
            <div className="sm:hidden flex relative">
                {session?.user ? (
                    <div className="flex">
                        <Image src={session?.user.image}
                            height={37}
                            width={37}
                            className="rounded-full"
                            alt="profile"

                            //search needed
                            onClick={() => setToggelDropdown((prev) => !prev)}
                        />
                        {toggelDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link "
                                    onClick={() => setToggelDropdown(false)}
                                >
                                    My Profile
                                </Link>
                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link "
                                    onClick={() => setToggelDropdown(false)}
                                >
                                    Create Prompt
                                </Link>
                                <button type="button"
                                    onClick={() => { setToggelDropdown(false); signOut(); }}
                                    className="mt-5 w-ful black_btn" >
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In

                                </button>
                            ))
                        }
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar