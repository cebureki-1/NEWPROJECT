import { useState, useReducer, axios } from "react";

const initialState = {
    loading: false,
    error: null,
    result: null,
};

function reducer(state, action) {
    switch (action.type) {
        case "START":
            return { 
                ...state,
                loading: true, 
                
                result: null };
        case "SUCCESS":
            return { 
                ...state,
                loading: false, 
                result: action.payload,
                error: null, 
            };
        case "ERROR":
            return { 
                ...state, 
                loading: false, 
                error: action.payload };
        default:
            return state;
    }
}

export default function App() {
    const [email, setEmail] = useState("");
    const [state, dispatch] = useReducer(reducer, initialState);

    async function checkEmail() {
        dispatch({ type: "START" });
        console.log("Asasas");
                const response = await fetch(`https://leakcheck.io/api/public?key=931d96e51aa36a1e5487c4bb4e93b5af4fda46f5&check=${email} `);
            
            const data = await response.json();
            dispatch({ type: "SUCCESS", payload: data });
    }

    console.log(state);
    
    return (
        <div>
            <h1>Email Checker</h1>
            <input
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <button onClick={checkEmail}>
                Проверить
            </button>

            {state.loading && <p>Загрузка...</p>}

            {state.error && <p
                style={{ color: "red" }}>
                {state.error}
            </p>}
            {state.result && (
                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Результат:</h2>
                    <pre >
                        {JSON.stringify(state.result, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
