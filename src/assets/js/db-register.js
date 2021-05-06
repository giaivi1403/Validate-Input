import * as Const from "./const.js";

export function handlePostData(data, url) {
    const response = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    postData(response, url);
}

export function Start(url, selector, list) {
    getData(url)
        .then(renderData)
        .catch((error) => {
            alert(error);
        });
}

const postData = (response, url) => {
    fetch(url, response)
        .then((data) => {
            return data.json();
        })
        .then(addData)
        .catch((error) => {
            alert(error);
        });
};

const getData = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then((data) => data.json())
            .then((data) => {
                resolve(data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const renderData = (listItems) => {
    const listRender = document.querySelector(".list-register");

    const html = listItems.map((item) => {
        return `<li class='py-3 d-flex align-items-center justify-content-between' id=list-item-${item.id}>
                    <div>
                        <p>User ID : ${item.id}</p>
                        <p>User name : ${item.name}</p>
                        <p>User email : ${item.email}</p>
                        <p>User password : ${item.password}</p>
                    </div>
                    <button class='btn-remove btn btn-danger'>Xóa</button>
                </li>`;
    });

    listRender.innerHTML = html.join("");

    handleDeleteData();
};

const addData = (addItem) => {
    const listItem = document.querySelector(".list-register");
    const html = `<li class='py-3 d-flex align-items-center justify-content-between' id=list-item-${addItem.id}>
                    <div>   
                        <p>User ID : ${addItem.id}</p>
                        <p>User name : ${addItem.name}</p>
                        <p>User email : ${addItem.email}</p>
                        <p>User password : ${addItem.password}</p>
                    </div>
                    <button class='btn-remove btn btn-danger'>Xóa</button>
                </li>`;
    const newHTML = listItem.innerHTML + html;
    listItem.innerHTML = newHTML;
    handleDeleteData();
};

export const handleDeleteData = () => {
    const response = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const btnRemove = document.querySelectorAll(".list-register li button");
    Array.from(btnRemove).forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.parentElement.id;
            const data = document.querySelector(".list-register #" + id);
            if (data) {
                data.remove();
            }
            deleteData(Const.URL, response, id[id.length - 1]);
        });
    });
};

const deleteData = (url, response, id) => {
    fetch(url + "/" + id, response)
        .then(function (data) {
            data.json();
        })
        .catch((error) => {
            alert(error);
        });
};
