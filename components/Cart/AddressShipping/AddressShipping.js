import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getApiAddress } from "../../../api/address";
import useAuth from "../../../hook/useAuth";

export default function AddressShipping() {
  const [addresses, setAddresses] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getApiAddress(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div>
      <h1>AddressShipping</h1>
    </div>
  );
}
