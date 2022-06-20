import React, { useEffect, useState } from "react";
import { add, map, size } from "lodash";
import { Grid, Button } from "semantic-ui-react";
import { getApiAddress, deleteApiAddress } from "../../../api/address";
import useAuth from "../../../hook/useAuth";
import { toast } from "react-toastify";

export default function ListAddress({
  reloadAddreses,
  setReloadAddreses,
  openModal,
}) {
  const [addresses, setAddresses] = useState(null);
  const { logout, auth } = useAuth();
  useEffect(() => {
    (async () => {
      const response = await getApiAddress(auth.idUser, logout);
      setAddresses(response || {});
      setReloadAddreses(false);
    })();
  }, [reloadAddreses]);

  if (!addresses) return null;

  console.log(addresses);
  return (
    <div className="list-address">
      {size(addresses) === 0 ? (
        <h3>No hay direcciones</h3>
      ) : (
        <Grid>
          {map(addresses, (address) => (
            <Grid.Column key={address.id} mobile={16} tablet={8} computer={4}>
              <Address
                address={address}
                logout={logout}
                setReloadAddreses={setReloadAddreses}
                openModal={openModal}
              />
            </Grid.Column>
          ))}
        </Grid>
      )}
    </div>
  );
}

const Address = ({ address, logout, setReloadAddreses, openModal }) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const deleteAddress = async () => {
    setLoadingDelete(true);
    const response = await deleteApiAddress(address._id, logout);
    response ? response : false;
    setReloadAddreses(true);
    setLoadingDelete(false);
    toast.success("Dirección eliminada correctamente");
  };
  return (
    <div className="address">
      <p>{address.title}</p>
      <p>{address.name}</p>
      <p>{address.address}</p>
      <p>
        {address.state}, {address.city}, {address.postalCode}
      </p>
      <p>{address.phone}</p>
      <div className="actions">
        <Button
          primary
          onClick={() => openModal(`Editar: ${address.title}`, address)}
        >
          Editar
        </Button>
        <Button onClick={deleteAddress} loading={loadingDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
};
