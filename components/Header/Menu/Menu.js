import React, { useState, useEffect } from "react";
import {
  Container,
  Menu,
  Grid,
  Icon,
  Label,
  GridColumn,
} from "semantic-ui-react";
import Link from "next/link";
import { map } from "lodash";
import BasicModal from "../../Modal/BasicModal/BasicModal";
import Auth from "../../Auth/Auth";
import useAuth from "../../../hook/useAuth";
import useCart from "../../../hook/useCart";
import { getMeApi } from "../../../api/user";
import { getPlatformsApi } from "../../../api/platform";

export default function MenuWeb() {
  const [platforms, setPlatforms] = useState([]);
  const openModal = () => setShowModal(true);
  const [titleModal, setTitleModal] = useState("Iniciar Sesión");
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();

  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
      console.log(response);
    })();
  }, [auth]);

  useEffect(() => {
    (async () => {
      const response = await getPlatformsApi();
      setPlatforms(response || []);
    })();
  }, []);

  const [showModal, setShowModal] = useState(false);
  const closeModal = () => setShowModal(false);

  return (
    <div className="menu">
      <Container>
        <Grid>
          <Grid.Column className="menu__left" width={6}>
            <MenuPlatforms platforms={platforms} />
          </Grid.Column>
          <GridColumn className="menu__right" width={10}>
            {user !== undefined ? (
              <MenuOptions openModal={openModal} user={user} logout={logout} />
            ) : (
              <MenuOptions openModal={openModal} user={user} logout={logout} />
            )}
          </GridColumn>
        </Grid>
      </Container>
      <BasicModal
        size="small"
        title={titleModal}
        show={showModal}
        setShow={setShowModal}
      >
        <Auth setTitleModal={setTitleModal} closeModal={closeModal} />
      </BasicModal>
    </div>
  );
}

const MenuPlatforms = ({ platforms }) => {
  return (
    <Menu>
      {map(platforms, (platform) => (
        <Link href={`/games/${platform.url}`} key={platform._id}>
          <Menu.Item as="a" name={platform.url}>
            {platform.item}
          </Menu.Item>
        </Link>
      ))}
    </Menu>
  );
};

const MenuOptions = ({ openModal, user, logout }) => {
  const { productsCart } = useCart();

  return (
    <Menu>
      {user ? (
        <>
          <Link href="/orden">
            <Menu.Item as="a">
              <Icon name="game" />
              Mis Pedidos
            </Menu.Item>
          </Link>
          <Link href="/wishlist">
            <Menu.Item as="a">
              <Icon name="heart outline" />
              Mi Lista
            </Menu.Item>
          </Link>
          <Link href="/account">
            <Menu.Item as="a">
              <Icon name="user outline" />
              {user.name} {user.lastname}
            </Menu.Item>
          </Link>
          <Link href="/cart">
            <Menu.Item as="a" className="m-0">
              <Icon name="cart" />
              {productsCart > 0 && (
                <Label color="red" floating circular>
                  {productsCart}
                </Label>
              )}
            </Menu.Item>
          </Link>
          <Menu.Item as="a" onClick={logout} className="m-0">
            <Icon name="power off" className="m-0" />
          </Menu.Item>
        </>
      ) : (
        <Menu.Item as="a" onClick={() => openModal()}>
          <Icon name="user outline" />
          Mi Cuenta
        </Menu.Item>
      )}
    </Menu>
  );
};
