//@flow
import styled from "styled-components";
import React from "react";

import { SearchButton, FormInput } from "../communComponents";

const Presentation = styled.div`
  background: white;
  padding: 5px;
  width: 100%;
`;

type FilterMesuresMapType = {
  getPostCodeCoordinates: Object,
  updateValue: Object,
  value: string
};

const FilterMesuresMap = ({ getPostCodeCoordinates, updateValue, value }: FilterMesuresMapType) => {
  let input;
  return (
    <Presentation>
      <tr className="form-inline">
        <td>
          <FormInput
            data-cy="tab-code-postal"
            innerRef={node => (input = node)}
            padd="10"
            size="200"
            id="commune"
            name="commune"
            onChange={e => updateValue(e.target.value)}
            placeholder={value || "Commune ou Code Postal"}
          />
        </td>
        <td>
          <SearchButton
            data-cy="tab-recherche"
            align="center"
            type="submit"
            onClick={() => getPostCodeCoordinates(input.value)}
          >
            Rechercher
          </SearchButton>
        </td>
      </tr>
    </Presentation>
  );
};

export default FilterMesuresMap;
