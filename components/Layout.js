import React from "react";
import Head from "next/head";
import Link from "next/link";

import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Classes,
  Button,
} from "@blueprintjs/core";

import { IconNames } from "@blueprintjs/icons";

export default function Layout(props) {
  const title = "Welcome to Nextjs";
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <script src="https://js.stripe.com/v3" />
      </Head>
      <header>
        <Navbar>
          <NavbarGroup align="left">
            <NavbarHeading>
              <Link href="/">
                <a>Home</a>
              </Link>
            </NavbarHeading>
            <NavbarDivider />
            {/* <Button className={Classes.MINIMAL} icon={IconNames.LOG_IN}>
              <Link href="/login">
                <a>Sign In</a>
              </Link>
            </Button>
            <Button className={Classes.MINIMAL} icon={IconNames.NEW_PERSON}>
              <Link href="/register">Sign Up</Link>
            </Button> */}
          </NavbarGroup>
        </Navbar>
      </header>
      <main>{props.children}</main>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
