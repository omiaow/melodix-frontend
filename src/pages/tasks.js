import { useEffect, useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/http.hook";


function Tasks() {

    const [tasks, setTasks] = useState([])
    const [completeds, setCompleteds] = useState([])

    const auth = useContext(AuthContext);
    const { request } = useHttp();

    useEffect(() => {
        const get = async () => {  
            try {
                const responseTasks = await request(`/user/tasks`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (responseTasks.status) {
                    setTasks(responseTasks.tasks);
                }

                const responseCompleteds = await request(`/user/completeds`, "GET", null, {
                    authorization: `Bearer ${auth.token}`
                });
                
                if (responseCompleteds.status) {
                    setCompleteds(responseCompleteds.completeds);
                }
            } catch (e) {}
        }

        get()
    }, [auth, request])

    const onComplete = async (taskId) => {
        try {
            const responseComplete = await request(`/user/completeds`, "POST", { taskId }, {
                authorization: `Bearer ${auth.token}`
            });

            if (responseComplete && responseComplete.status) {
                window.location.reload();
            }
        } catch (e) {}
    }

    const renderTasks = (list) => {
        const result = [];

        list.forEach((element, i) => {

            let button = <span className="button_active" onClick={() => onComplete(element._id)}>{element.type}</span>;

            const isCompleted = completeds.find(item => item.taskId === element._id);

            if (isCompleted) {
                button = <svg style={{ float: "right", marginRight: "13px", marginTop: "13px" }} width="35px" height="35px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.5" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" fill="#3A3A3A"/>
                    <path d="M16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#FFFFFF"/>
                </svg>;
            }

            result.push(<div className="tasks" key={i}>
                <div className="icon"></div>
                <div className="description">
                    <p className="text">{element.description}</p>
                    <p className="reward">+{element.reward} {element.currency}</p>
                </div>
                {button}
            </div>)
        });

        return result;
    }

    return (
        <div className="window">
            <h1 className="task_header">Tasks</h1>
            <p className="task_description">You'll earn points right away for completing each task</p>

            {renderTasks(tasks)}
            
            <div style={{ width: "100%", height: "100px" }}></div>
        </div>
    );
}

export default Tasks;
