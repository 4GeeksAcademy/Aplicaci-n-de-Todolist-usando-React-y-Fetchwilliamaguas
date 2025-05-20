import React, { useState, useEffect } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [listaDeTareas, setListaDeTareas] = useState([])
	const [nuevaTarea, setNuevaTarea] = useState("")

	useEffect(() => {
		fetch("https://playground.4geeks.com/todo/users/william")
			.then((respuesta) => {
				return respuesta.json()
			})
			.then((data) => { setListaDeTareas(data.todos) })
			.catch((error) => { console.error(error) })
	}, [])

	function agregarTarea(evento) {
		if (evento.key === "Enter" && nuevaTarea.trim() !== "") {
			const nuevoPendiente = {
				label: nuevaTarea.trim(),
				is_done: false
			}
			fetch("https://playground.4geeks.com/todo/todos/william", {
				method: "POST",
				body: JSON.stringify(nuevoPendiente),
				headers: {
					"Content-Type": "application/json"
				}
			})
				.then((respuesta) => { return respuesta.json() })
				.then((data) => {
					console.log(data)
					setListaDeTareas([...listaDeTareas, data])
					setNuevaTarea("")

				})
				.catch((error) => { console.error(error) })


		}
	}

	function eliminarTarea(idAEliminar) {

		fetch(`https://playground.4geeks.com/todo/todos/${idAEliminar}`, {
			method: "DELETE"
		})
			.then((respuesta) => {
				if (respuesta.status === 204) {
					const tareasActualizadas = listaDeTareas.filter((tarea) => tarea.id !== idAEliminar)
					setListaDeTareas(tareasActualizadas)

				}
			})
			.catch((error) => {console.error(error)})


	}

	return (
		<div className="d-flex flex-column align-items-center text-center container">
			<h1 style={{ color: "#dc2626" }}>
				¡¡Todolist!!
			</h1>
			<div className="w-100 todos-container">
				<input type="text" className="form-control" id="todo" onChange={(evento) => { setNuevaTarea(evento.target.value) }} value={nuevaTarea} onKeyDown={(evento) => { agregarTarea(evento) }} style={{ boxShadow: "0px 0px 105px 0px rgba(255,46,98,0.9)" }} />
				{
					listaDeTareas.map((tarea, indice) => {
						return (
							<div className="tarea d-flex justify-content-between align-items-center p-2 border-bottom" key={indice}>
								<span className="text-start py-2">{tarea.label}</span>
								<button className="btn btn-sm btn-danger" onClick={() => eliminarTarea(tarea.id)}>X</button>
							</div>
						)
					})
				}

				<p className="text-start form-text">
					{listaDeTareas.length + " tareas pendientes"}
				</p>

			</div>




		</div>
	);
};

export default Home;