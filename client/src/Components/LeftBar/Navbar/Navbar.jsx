import {useState} from "react";
import "./navbar.css";
import "../../../icomoon/style.css";

export default function Navbar({modal, modalHandler, modalContactActive}) {
    const [bottom, setBottom] = useState("buttom");
    const [addAcount, setAddAcount] = useState("add_acount");

    const bottomFunc = () => {
        if (bottom === "buttom") {
            setBottom("buttom active");
        } else {
            setBottom("buttom");
        }
        if (addAcount === "add_acount") {
            setAddAcount("add_acount active");
        } else {
            setAddAcount("add_acount");
        }
    };

    const modalCallBack = () => {
        modalContactActive(true);
        modalHandler(false);
    };

    const modalHandlerNotAc = () => {
        modalHandler(false);
    };

    return (
        <div
            className={`menu ${modal ? "modal active" : ""}`}
            onClick={modalHandlerNotAc}
        >
            <div className="nav_menu" onClick={(e) => e.stopPropagation()}>
                <div className="nav_menu_header">
                    <div
                        className="img_user"
                        style={{cursor: "pointer"}}
                        onClick={bottomFunc}
                    >
                        <span className="icon-user"></span>
                    </div>
                    <div
                        className="name_user"
                        style={{cursor: "pointer"}}
                        onClick={bottomFunc}
                    >
                        <p>Shohimardon Rahimov</p>
                    </div>
                    <div
                        className="number_user"
                        style={{cursor: "pointer"}}
                        onClick={bottomFunc}
                    >
                        <p>+992 98 777 0625</p>
                    </div>
                    <div className={bottom} onClick={bottomFunc}>
                        <span></span>
                        <span></span>
                    </div>
                </div>

                <div className={addAcount}>
                    <div className="add_ac">
                        <p className="icon-plus"></p> <p>Добавить аккаунт</p>
                    </div>
                </div>
                <div className="components_modal">
                    <div className="component">
                        <div className="component_child">
                            <p className="icon-users"></p>Создать группу
                        </div>
                    </div>

                    <div className="component">
                        <div className="component_child">
                            <p className="icon-phone"></p>Создать канал
                        </div>
                    </div>

                    <div className="component" onClick={modalCallBack}>
                        <div className="component_child">
                            <p className="icon-user"></p>Контакты
                        </div>
                    </div>

                    <div className="component">
                        <div className="component_child">
                            <p className="icon-phone"></p> Звонки
                        </div>
                    </div>

                    <div className="component">
                        <div className="component_child">
                            <p className="icon-favorite"></p>Избранное
                        </div>
                    </div>

                    <div className="component">
                        <div className="component_child">
                            <p className="icon-gear"></p>Настройки
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
