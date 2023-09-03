import React, { Component } from "react";
import Brandvar from "../Components/Brandvar";

class Register extends Component {

    state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        birthday: "",
        profilePhoto: "",
    };

    //Manejar los campos de datos y fecha
    handleChange = (event) => {
        const { id, value } = event.target;
        this.setState({ [id]: value });
    };

    //Manejar la imagen
    handleImageChange = (event) => {
        const imageFile = event.target.files[0];
    
        if (imageFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.setState({ profilePhoto: e.target.result });
          };
          reader.readAsDataURL(imageFile);
        }
    };

    handleSubmit = async (event) => {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada
        
        const { firstName, lastName, email, password, birthday, profilePhoto} = this.state;
    
        /* console.log("Nombre:", firstName);
        console.log("Apellido:", lastName);
        console.log("Correo:", email);
        console.log("Fecha de Nacimiento:", birthday);
        console.log("Imagen:", profilePhoto); */

        let url = "http://localhost:5000/register"

        const registerdata = {
            firstName,
            lastName,
            email,
            password,
            birthday,
            profilePhoto,
        };

        //Fetch para enviar la información

        try {
            const solicitud = await fetch(url,{
                    method: "POST",
                    headers: {"Content-Type": "application/json",},
                    body: JSON.stringify(registerdata),
                });
            if (solicitud.ok){
                try {
                    const success = await solicitud.json();
                    alert(success.message)
                  } catch (error) {
                    alert("Error - login correcto")
                  }
            } else{
                try {
                  const errorresponse = await solicitud.json();
                  alert(errorresponse.message)
                } catch (error) {
                  alert("Error obtener la respuesta")
                }
            }
        } catch (error) {
            alert("Error en el registro, revisa los campos")
        }

    };

    render() {
        return (
            <div className="maincointainer bgregister">
                <Brandvar />
                <div className="registercointainer container-fluid d-flex justify-content-between align-items-center">
                    <div className="col-md-4 offset-md-4 p-5 mainlogin">
                    <h2 className="text-center mb-4 tipografia1">Registrase</h2>
                    <form className="tipografia2" onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="firstName" className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="firstName" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastName" className="form-label">Apellido</label>
                            <input type="text" className="form-control" id="lastName" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo</label>
                            <input type="text" className="form-control" id="email" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="password" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="birthday" className="form-label">Fecha de Nacimiento</label>
                            <input type="date" className="form-control" id="birthday" onChange={this.handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="profilePhoto" className="form-label">Foto de Perfil</label>
                            <input type="file" className="form-control" id="profilePhoto"  accept="image/*" onChange={this.handleImageChange} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100" style={{background: '#8E24AA'}}>Registrarse</button>
                    </form>
                    </div>
                </div>
            </div>
        );
    }
    }

export default Register;
