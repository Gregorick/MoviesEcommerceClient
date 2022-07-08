import React, { useState, useEffect } from "react";
import { Table, Image, Icon, TableFooter, Tab } from "semantic-ui-react";
import { forEach, map } from "lodash";
import useCart from "../../../hook/useCart";

export default function SummaryCat({ products }) {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let price = 0;

    forEach(products, (product) => {
      price += product.price;
    });
    setTotalPrice(price);
  }, []);

  return (
    <div className="summary-cart">
      <div className="title">Resumen del Carrito:</div>
      <div className="data">
        <Table celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Producto</Table.HeaderCell>
              <Table.HeaderCell>Plataforma</Table.HeaderCell>
              <Table.HeaderCell>Entrega</Table.HeaderCell>
              <Table.HeaderCell>Precio</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(products, (product) => (
              <Table.Row key={product.id} className="summary-cart__product">
                <Table.Cell>
                  <Icon
                    name="close"
                    link
                    onClick={() => console.log("Borrar Producto")}
                  ></Icon>
                  <Image src={product.poster.url} alt={product.title} />
                  {product.title}
                </Table.Cell>
                <Table.Cell>{product.platform.title}</Table.Cell>
                <Table.Cell>Inmediata</Table.Cell>
                <Table.Cell>RD${product.price}</Table.Cell>
              </Table.Row>
            ))}
            <Table.Row className="summary-cart__resume">
              <Table.Cell className="clear"></Table.Cell>
              <Table.Cell colSpan="2">Total:</Table.Cell>
              <Table.Cell className="total-price">
                RD$ {totalPrice.toFixed(2)}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
