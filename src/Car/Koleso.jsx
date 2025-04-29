import { act, useEffect, useReducer } from "react";

const init = {

    mark: "",
    module: "",
    age: 0,
    probeg: 0,
    count: 0,
    src: "",
    search: "",

    error: "",

    data: [
        {
            id: 0,
            mark: "Toyota",
            module: "Corolla",
            age: "2018",
            probeg: "75000",
            count: "3",
            src: "https://example.com/toyota-corolla.jpg"
        },
        {
            id: 1,
            mark: "BMW",
            module: "X5",
            age: "2020",
            probeg: "45000",
            count: "1",
            src: "https://example.com/bmw-x5.jpg"
        },
        {
            id: 2,
            mark: "Lada",
            module: "Granta",
            age: "2015",
            probeg: "120000",
            count: "5",
            src: "https://example.com/lada-granta.jpg"
        },
        {
            id: 3,
            mark: "Mercedes",
            module: "C-Class",
            age: "2019",
            probeg: "60000",
            count: "2",
            src: "https://example.com/mercedes-cclass.jpg"
        },
        {
            id: 4,
            mark: "Hyundai",
            module: "Elantra",
            age: "2017",
            probeg: "82000",
            count: "4",
            src: "https://example.com/hyundai-elantra.jpg"
        },
        {
            id: 5,
            mark: "Kia",
            module: "Rio",
            age: "2016",
            probeg: "95000",
            count: "3",
            src: "https://example.com/kia-rio.jpg"
        },
        {
            id: 6,
            mark: "Nissan",
            module: "X-Trail",
            age: "2021",
            probeg: "30000",
            count: "2",
            src: "https://example.com/nissan-xtrail.jpg"
        },
        {
            id: 7,
            mark: "Ford",
            module: "Focus",
            age: "2014",
            probeg: "110000",
            count: "6",
            src: "https://example.com/ford-focus.jpg"
        },
        {
            id: 8,
            mark: "Chevrolet",
            module: "Cruze",
            age: "2013",
            probeg: "130000",
            count: "2",
            src: "https://example.com/chevrolet-cruze.jpg"
        },
        {
            id: 9,
            mark: "Honda",
            module: "Civic",
            age: "2018",
            probeg: "70000",
            count: "3",
            src: "https://example.com/honda-civic.jpg"
        },
        {
            id: 10,
            mark: "Mazda",
            module: "CX-5",
            age: "2022",
            probeg: "15000",
            count: "1",
            src: "https://example.com/mazda-cx5.jpg"
        }
    ],
    dataold: []
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
        case "search":

            return {
                ...state,
                search: action.payload  ,
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
                    dataold: state.data,
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
            return {
                ...state,
                data: state.data.filter((todo) => todo.id !== action.payload)
            }

        case "datasearch":
            if (state.search.trim() == " ") {
                return {
                    ...state,
                    data: state.dataold,
                    
                };
            } else {
                return {
                    
                    ...state,
                    data: state.dataold.filter((car) =>
                        car.mark.toLowerCase().includes(state.search.toLowerCase())
                    )   
                };
            }
        case "changed massiv":
            return{
                ...state, 
                dataold: action.payload
            }

    }
}
export default function Car() {
    const [state, dispath] = useReducer(Reducers, init)
    console.log(state.data.length == state.dataold.length);
    
    useEffect(() => {
        dispath({ type: "changed massiv", payload: state.data });
        console.log("asdadsds");
        
      }, [state.dataold]);
       
      
    console.log(state);

    return (
        <>
            <input type="text" placeholder="Search"
                value={state.search}
                onChange={(e) => {
                    dispath({ type: "datasearch" }),
                    dispath({ type: "search", payload: e.target.value })
                    
                }}
            />
            <br />
            <br />
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
            <div className="car-container">
                {state.data && state.data.map((item) => (
                    <div className="car-card" key={item.id}>
                        <img className="car-image" src={item.src} alt={item.mark} />
                        <div className="car-info">
                            <p><strong>Марка:</strong> {item.mark}</p>
                            <p><strong>Модель:</strong> {item.module}</p>
                            <p><strong>Год:</strong> {item.age}</p>
                            <p><strong>Пробег:</strong> {item.probeg} км</p>
                            <p><strong>Количество:</strong> {item.count}</p>
                        </div>
                        <button onClick={() => dispath({ type: "delit_item", payload: item.id })}>Del</button>

                    </div>
                ))}
            </div>
        </>
    )
}