import styled from "styled-components";

import SearchButton from "./SearchButton";
import FormInput from "./FormInput";

const FilterMesuresMap = ({ props }) => (
    <Presentation>
        <td className="form-inline">
            <tr>
                <FormInput
                    padd="10"
                    size="120"
                    id="code_postal"
                    name="code_postal"
                    placeholder="Code postal"
                />
            </tr>
            <tr>
                <FormInput padd="10" size="260" id="commune" name="commune" placeholder="Commune" />
            </tr>
            <tr>
                <FormInput
                    padd="10"
                    size="260"
                    id="nom_etablissement"
                    name="nom_etablissement"
                    placeholder="Nom d'établissement"
                />
            </tr>
            <tr>
                <SearchButton align="center" type="submit">
                    Rechercher
                </SearchButton>
            </tr>
        </td>
    </Presentation>
);

const Presentation = styled.div`
    background: white;
    padding: 5px;
    width: 812px;
`;

export default FilterMesuresMap;
