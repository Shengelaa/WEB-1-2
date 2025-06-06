"use strict";
// let userName = "giorgi"
const arr = ["first", 2];
function useState(initValue) {
    const value = initValue;
    function setState() { }
    return [value, setState];
}
const [count, setCount] = useState(0);
const RoleObj = {
    USER: "user",
    EDITOR: "editor",
    ADMIN: "admin",
};
var Role;
(function (Role) {
    Role["USER"] = "user";
    Role["EDITOR"] = "editor";
    Role["ADMIN"] = "admin";
})(Role || (Role = {}));
var StatusCodes;
(function (StatusCodes) {
    StatusCodes[StatusCodes["NOTFOUND"] = 404] = "NOTFOUND";
    StatusCodes[StatusCodes["SUCCESS"] = 200] = "SUCCESS";
    StatusCodes[StatusCodes["CREATED"] = 201] = "CREATED";
})(StatusCodes || (StatusCodes = {}));
function getSomething(msg) {
    if (!msg)
        return;
    if (typeof msg === "string") {
        msg;
    }
    else if (typeof msg === "number") {
        msg;
    }
    else if (msg &&
        typeof msg === "object" &&
        msg.length > 0 &&
        msg.every((el) => typeof el === "string")) {
    }
}
const onj = {
    isSmoker: false,
    name: "",
    address: {
        work: "",
        home: "",
    },
};
const obj1 = {
    lg: "asd",
    md: "asd",
    sm: "asd",
};
const err = {
    message: "wrong",
};
const getErrorMessage = (err) => {
    if (!err)
        return;
    if (typeof err === "string") {
        return err;
    }
    else if (typeof err === "object" && "message" in err) {
        return err.message;
    }
    else if (typeof err === "object" && Array.isArray(err)) {
        return err.map((el) => {
            if (el.message) {
                return el.message;
            }
        });
    }
};
function doSomething(role) {
    switch (role) {
        case "admin":
            console.log("adniu");
            break;
        case "user":
            console.log("user");
            break;
        default:
    }
}
