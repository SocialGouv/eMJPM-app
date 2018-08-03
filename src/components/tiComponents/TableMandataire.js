//@flow

import styled from "styled-components";
import React from "react";

import { TableRowMandataire } from ".";

const TdIdentite = styled.td`
  width: 40%;
  text-align: left;
  color: #696969;
  border-top-width: 0px !important;
`;

const TdMesure = styled.td`
  text-align: center;
  vertical-align: middle;
  width: 120px;
  color: #696969;
  border-top-width: 0px !important;
`;

const Col12 = styled.div`
  padding: 0px;
`;

type TableMandataireType = {
  rows: Array<Object>
};

const TableMandataire = ({ rows, reserver }: TableMandataireType) => {
  return (
    <Col12 className="col-12">
      <table className="table responsive table-hover">
        <thead>
          <tr>
            <TdIdentite colSpan="2">Identité </TdIdentite>
            <TdMesure>Mesures en cours</TdMesure>
            <td
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                width: 45,
                color: "#696969",
                borderTopWidth: "0px"
              }}
            >
              Attente
            </td>
            <td
              style={{
                textAlign: "center",
                verticalAlign: "middle",
                width: 45,
                color: "#696969",
                borderTopWidth: "0px"
              }}
            />
          </tr>
        </thead>
        <tbody data-cy="tab-mesure">
          {rows &&
            rows.map(mandataire => (
              <TableRowMandataire key={mandataire.id} mandataire={mandataire} reserver={reserver} />
            ))}
        </tbody>
      </table>
    </Col12>
  );
};
export default TableMandataire;
