import React, { useContext } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../AuthContext'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {



    const navigate = useNavigate()
    const { user, isLoading } = useContext(AuthContext)


    useEffect(() => {
        if (isLoading) return;
        if (!user) {
            navigate("/login")
        }
    }, [user, isLoading])



    return (
        <main>
            {user ? (<p >Welcome {user.username}</p>) : (<p>Login To View Home Page</p>)}

            <div>
                <h1>View Tasks</h1>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Completed</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>true</td>
                            <td>Go to School to learn for exams</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>true</td>
                            <td>Go to School church</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </main >
    )
}

export default HomePage