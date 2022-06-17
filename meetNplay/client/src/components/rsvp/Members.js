import axios from "axios";
import React, { useEffect, useState } from "react";
import * as CONST from "./RsvpText";

function Members(props) {
  const { playdateId, hostName } = props;
  const [members, setMembers] = useState([]);
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/api/playdate/${playdateId}/rsvps`,
        { withCredentials: true }
      )
      .then((res) => {
        console.log("hello?");
        console.log(res.data);
        setMembers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>RSVP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{hostName}</td>
            <td>-- HOST -- </td>
          </tr>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{CONST.rsvpText(member.rsvp_status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Members;
