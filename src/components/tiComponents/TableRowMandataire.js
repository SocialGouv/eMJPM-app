// @flow
import styled from "styled-components";
import { AlertCircle } from "react-feather";
import * as React from "react";

import isOlderThanOneMonth from "../communComponents/checkDate";

type PillDispoType = {
  dispo: number,
  dispo_max: number
};

type CellType = {
  style?: { [string]: string },
  title?: string,
  children?: React.Node
};

const getColorFromDisponibilite = (dispo: number): string => {
  if (dispo >= 1) {
    return "#f05659";
  } else if (dispo >= 0.85) {
    return "#eb9123";
  }
  return "#43b04a";
};

const Cell = ({ style, title, children }: CellType) => (
  <td
    className="pagination-centered"
    style={{ fontSize: "0.8em", textAlign: "left", verticalAlign: "middle", ...style }}
    title={title}
  >
    {children}
  </td>
);

export const PillDispo = ({ dispo, dispo_max }: PillDispoType) => (
  <div
    style={{
      margin: "0 auto",
      width: 100,
      lineHeight: "40px",
      borderRadius: "5px",
      textAlign: "center",
      color: "white",
      background: getColorFromDisponibilite(dispo / dispo_max)
    }}
  >
    {dispo} / {dispo_max}
  </div>
);

export const Circle = styled.div`
  line-height: 40px;
  font-size: 0.7em;
  height: 40px;
  width: 40px;
  text-align: center;
  color: white;
  border-radius: 50%;
  display: inline-block;
`;

type Props = {
  onClick: SyntheticMouseEvent<HTMLButtonElement>,
  mandataire: Object
};

class TableRowMandataire extends React.Component<Props> {
  render() {
    let isLate =
      this.props.mandataire.date_mesure_update &&
      isOlderThanOneMonth(this.props.mandataire.date_mesure_update.slice(0, 10));
    const { type, etablissement, mesures_en_cours, dispo_max } = this.props.mandataire;
    return (
      <tr onClick={this.props.onClick} style={{ cursor: "pointer" }}>
        <Cell style={{ width: "100px" }}>
          <Circle
            style={{
              backgroundColor: getColorFromDisponibilite(mesures_en_cours / dispo_max)
            }}
          >
            {type.toUpperCase().substr(0, 1)}
          </Circle>
        </Cell>
        <Cell>
          <b>{etablissement}</b>
          <br /> <div style={{ color: "#cccccc" }}>{type.toUpperCase()} </div>
        </Cell>
        <Cell style={{ textAlign: "center" }}>
          <PillDispo dispo={mesures_en_cours} dispo_max={dispo_max} />
        </Cell>
        <Cell style={{ textAlign: "center" }}>
          {isLate && (
            <span
              className="d-inline-block"
              tabIndex="0"
              data-toggle="tooltip"
              title="Dernière mise à jour des données datant de plus de 30 jours."
            >
              <AlertCircle />
            </span>
          )}
        </Cell>
      </tr>
    );
  }
}

export default TableRowMandataire;
