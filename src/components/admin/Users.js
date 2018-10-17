import { User, UserCheck } from "react-feather";
import TableUser from "./TableUser";
import { DummyTabs } from "..";

const tabs = type =>
  [
    {
      text: "Actifs",
      type: "mandataire",
      icon: <UserCheck />,
      content: <TableUser filters={{ "users.active": true }} />
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "mandataire",
      content: <TableUser filters={{ "users.active": false }} />
    },
    {
      text: "Actifs",
      icon: <UserCheck />,
      type: "ti",
      content: <TableUser filters={{ "users.active": true }} />
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "ti",
      content: <TableUser filters={{ "users.active": false }} />
    }
  ].filter(tab => tab.type.toLowerCase().indexOf(type.toLowerCase()) > -1);

const Users = ({ type }) => <DummyTabs tabs={tabs(type)} />;

export default Users;
