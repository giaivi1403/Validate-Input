import Validator from "./validator.js";
import { handlePostData, Start } from "./db-register.js";
import * as Const from "./const.js";

Start(Const.URL, ".btn-remove", ".list-register li");

Validator({
    form: "#form",
    errorMsg: ".form-msg",
    rules: [
        Validator.isRequired("#name", "Hãy nhập họ tên tối thiểu 6 ký tự"),
        Validator.isEmail("#email"),
        Validator.isRequired(
            "#password",
            "Hãy nhập mật khẩu tối thiểu 6 ký tự"
        ),
        Validator.isRequired("#cfm-password"),
        Validator.isConfirmed("#cfm-password", "#password"),
    ],
    onSubmit: (data) => {
        handlePostData(data, Const.URL);
    },
});
