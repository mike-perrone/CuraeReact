import React, {useState, useEffect} from 'react';
import Member from './Member'

const MemberList = (props) => {

    const [memberList, setMemberList] = useState([]);

    useEffect(() => {
        if(localStorage.getItem('token')){
        fetch("https://localhost:44302/api/users", {
            method: "Get",
            headers: {
              "Authorization": `Bearer ${localStorage.getItem('token')}`, 
              "Content-Type": "application/json"
            },
          })
            .then(response => response.json())
            .then(users => setMemberList(users))
            .catch(error => console.log(error))
        }
        },[])
        



    return (
        <div>{memberList.map((member, index) => {
          return  <Member key={member.knownAs + index} knownAs={member.knownAs} photoUrl={member.photoUrl} />
        })}</div>
    )
}
export default MemberList;