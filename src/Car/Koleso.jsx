import { act, useReducer } from "react";
const init = {

    mark: "",
    module: "",
    age: 0,
    probeg: 0,
    count: 0,
    src: "",

    error: "",
    data: []
}
function Reducers(state, action) {
    switch (action.type) {
        case "mark":
            return {
                ...state,
                mark: action.payload
            }
        case "module":
            return {

                ...state,
                module: action.payload
            }
        case "probeg":
            return {
                ...state,
                probeg: action.payload
            }
        case "age":
            return {
                ...state,
                age: action.payload
            }
        case "count":
            return {
                ...state,
                count: action.payload
            }
        case "src":
            return {
                ...state,
                src: action.payload
            }
        case "ADD":
            if (
                state.mark.trim() === "" ||
                state.module.trim() === "" ||
                state.probeg.trim() === "" ||
                state.age.trim() === "" ||
                state.count.trim() === "" ||
                state.src.trim() === ""
            ) {
                return {
                    ...state,
                    error: "Заполните все поля"
                }
            } else if (state.age < 2010) {
                return {
                    ...state,
                    error: "Возраст 2010 улкен кету керек"
                }
            }
            else {
                return {
                    ...state,

                    data: [
                        ...state.data || {},
                        {
                            id: state.data.length,
                            mark: state.mark,
                            module: state.module,
                            probeg: state.probeg,
                            age: state.age,
                            count: state.count,
                            src: state.src,
                        }
                    ],

                    mark: "",
                    module: "",
                    age: 0,
                    probeg: 0,
                    count: 0,
                    src: "",
                    error: "",
                }
            }
        case "error":
            return {
                ...state,
                error: action.payload
            }
        case "delit_item":
            return{
                ...state,
                data: state.data.filter((todo) => todo.id !== action.payload)
            }
    }
}
export default function Car() {
    const [state, dispath] = useReducer(Reducers, init)

    console.log(state.data);

    return (
        <>

            <input type="text" value={state.mark} onChange={(e) => dispath({ type: "mark", payload: e.target.value })} />
            <br />

            <input type="text" value={state.module} onChange={(e) => dispath({ type: "module", payload: e.target.value })} />
            <br />

            <input type="text" value={state.age} onChange={(e) => dispath({ type: "age", payload: e.target.value })} />
            <br />

            <input type="text" value={state.probeg} onChange={(e) => dispath({ type: "probeg", payload: e.target.value })} />
            <br />

            <input type="text" value={state.count} onChange={(e) => dispath({ type: "count", payload: e.target.value })} />
            <br />

            <input type="text" value={state.src} onChange={(e) => dispath({ type: "src", payload: e.target.value == "" ? "https://th.bing.com/th/id/OSK.HERO8JB9i-Vk9dE32vQgHmNtC51-a4Zd2M1_ENbXWgtZvbk?w=472&h=280&c=1&rs=2&o=6&dpr=1.3&pid=SANGAM" : e.target.value })} />
            <br />


            <button onClick={() => dispath({ type: "ADD" })}>Добавить</button>
            <br />
            <div >{state.error}</div>

            {state.data && state.data.map((item) => {
                return (
                    <div key={item.id}>
                        <h1>{item.mark}</h1>
                        <h1>{item.module}</h1>
                        <h1>{item.age}</h1>
                        <h1>{item.probeg}</h1>
                        <h1>{item.count}</h1>
                        <img src={item.src} alt="" />
                        <button onClick={()=> dispath({type: "delit_item", payload: item.id})}>Del</button>
                    </div>
                )
            }
            )}
        </>
    )
}