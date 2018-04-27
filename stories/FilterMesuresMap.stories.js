import React from "react";
import styled from "styled-components";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

const FilterMesuresMap = ({ props }) => (
    <Presentation>
        <td className="form-inline">
            <tr>
                <Post size="120" id="code_postal" name="code_postal" placeholder="Code postal" />
            </tr>
            <tr>
                <Post padd="10" size="260" id="commune" name="commune" placeholder="Commune" />
            </tr>
            <tr>
                <Post
                    size="260"
                    id="nom_etablissement"
                    name="nom_etablissement"
                    placeholder="Nom d'établissement"
                />
            </tr>
            <tr>
                <Search align="center" type="submit">
                    Rechercher
                </Search>
            </tr>
        </td>
    </Presentation>
);

const Presentation = styled.div`
    background: #ebeff3;
    padding: 5px;
    width: 812px;
`;

const Post = styled.input`
    margin: 5px;
    padding: 10px;
    height: 40px;
    width: ${props => props.size}px;
    border: 1px solid;
    border-color: gray;
    border-radius: 3px;
    box-shadow: 0px;
`;

const Search = styled.button`
    background: #43b04a;
    height: 40px;
    width: 120px;
    text-align: center;
    color: white;
    padding: 5px;
    border: 1px solid;
    border-color: #43b04a;
    border-radius: 3px;
    box-shadow: 2px 2px 1px #c0c0c0;
    font-size: 17px;
    font-weight: Bold;
    margin: 5px;

    &:hover {
        border-color: #69a65d;
        background: #69a65d;
    }
`;

storiesOf("FilterMesuresMap", module).add("FilterMesuresMap", () => <FilterMesuresMap />);
