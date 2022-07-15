import React, { useState, useEffect } from "react";
import { Grid, Button } from "semantic-ui-react";
import { map, size } from "lodash";
import Link from "next/link";
import classNames from "classnames";
import { getApiAddress } from "../../../api/address";
import useAuth from "../../../hook/useAuth";

export default function AddressShipping({ setAddress }) {
  const [addresses, setAddresses] = useState(null);
  const [addressActive, setAddressActive] = useState(null);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getApiAddress(auth.idUser, logout);
      setAddresses(response || []);
    })();
  }, []);

  return (
    <div class="address-shipping">
      <div className="title">Dirección de envío</div>
      <div className="data">
        {size(addresses) === 0 ? (
          <h3>
            No hay ninguna dirección creada{" "}
            <Link href="/account">
              <a>añade tu primera dirección</a>
            </Link>
          </h3>
        ) : (
          <Grid>
            {map(addresses, (address) => (
              <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
                <Address
                  addressActive={addressActive}
                  setAddressActive={setAddressActive}
                  setAddress={setAddress}
                  address={address}
                />
              </Grid.Column>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
}

const Address = ({ address, addressActive, setAddressActive, setAddress }) => {
  const changeAddress = () => {
    setAddressActive(address._id);
    setAddress(address);
  };

  return (
    <div
      className={classNames("address", {
        active: addressActive === address._id,
      })}
      onClick={changeAddress}
    >
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
  );
};
