import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth";

export function Contacts() {
    const [contacts, setContacts] = useState([]);
    const {URL, tokenBearer} = useAuth();

    const getAllContacts = async () => {
        try {
            const response = await fetch(`${URL}/api/admin/contacts`, {
                method: 'GET',
                headers: {
                    Authorization: tokenBearer
                }
            });
            const data = await response.json();
            setContacts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllContacts();
    }, []);

    return <section>
        <div className="users">
            <div className="users-container">
                {
                    contacts.length !== 0 ?
                    contacts.map((contact, index) => {
                        return <div className="user-box" key={index}>
                            <p><b>email: </b> {contact.email} </p>
                            <p><b>message: </b> {contact.message} </p>
                        </div>
                    })

                    :

                    <p>No Contacts yet</p>
                }
            </div>
        </div>
    </section>
}