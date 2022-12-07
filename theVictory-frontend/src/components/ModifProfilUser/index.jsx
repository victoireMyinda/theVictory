import React, { useEffect, useState, useContext } from 'react';
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css"
import { useLocation } from "react-router-dom";
import { UserProfilContext } from "../../ProfilContext"

import "./style.css"
import axios from "axios";

const ModifProfilUser = () => {

    const [name, setName] = useState('');
    const [dataUser, setDataUser] = useState(null);

    const [nameUserDB, setNameUserDB] = useState('');

    const { userConnected } = useContext(UserProfilContext);

    const location = useLocation();

    const { state } = location;

    console.log(dataUser)

    useEffect(() => {
        if (dataUser) {
            setNameUserDB(dataUser && dataUser.name)
        }
    }, [dataUser])

    useEffect(() => {
        if (userConnected) {
            setName(userConnected &&
                userConnected.wt && userConnected.wt.Ad && userConnected.wt.Ad)
        }
    }, [state.val])

    console.log(userConnected, " :  STATE")

    useEffect(() => {
        const getUserByName = () => {
            axios.patch("http://localhost:9000/api/users/" + name)
                .then(res => {
                    setDataUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
        getUserByName();
    }, [name])

    return (
        <div className='container'>
            <div className="row modify-content">
                <div className="col-4">
                    <div className="avatar"></div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className="col-12">
                            <form action="">
                                <div className="row">
                                    <div className="form-outline col-6">
                                        <label className="form-label" for="form1Example1">Nom</label>
                                        <input type="name" value={nameUserDB} id="name" className="form-control" />
                                    </div>

                                    <div className="form-outline col-6">
                                        <label className="form-label" for="form1Example1">Prenom</label>
                                        <input type="name" id="firstname" className="form-control" />
                                    </div>
                                </div>

                                <div className="row mt-3">
                                    <div className="form-outline col-6">
                                        <label className="form-label">Lien Github</label>
                                        <input type="text" id="git" className="form-control" placeholder='http://www.github.username' />
                                    </div>

                                    <div className="form-outline col-6">
                                        <label className="form-label" for="form1Example1">Lien Linkden</label>
                                        <input type="text" id="linkden" className="form-control" placeholder='http://www.linkden.username' />
                                    </div>
                                </div>


                                <div className="row mt-3">
                                    <div className="form-outline col-6">
                                        <label className="form-label" for="form1Example1">Lien Portfolio</label>
                                        <input type="text" id="portfolio" className="form-control" placeholder='http://www.nameuser' />
                                    </div>

                                    <div className="form-outline col-6">
                                        <label className="form-label" for="form1Example1">Lien Facebook</label>
                                        <input type="text" id="facebook" className="form-control" placeholder='http://www.facebook.username' />
                                    </div>
                                </div>

                                <div className="row mt-3 d-flex">
                                    <div className="col-2">
                                        <button className='btn btn-info text-white' type='submit'>Modifier</button>
                                    </div>
                                    <div className="col-2">
                                        <button className='btn btn-danger'>Annuler</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModifProfilUser;