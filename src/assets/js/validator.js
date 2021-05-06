export default function Validator(options) {
    const formElement = document.querySelector(options.form);
    const selectorRules = {};

    const validate = (inputElement, rule) => {
        let isUnValid;
        const msgElement = inputElement.parentElement.querySelector(
            options.errorMsg
        );

        for (let i = 0; i < selectorRules[rule.selector].length; ++i) {
            isUnValid = selectorRules[rule.selector][i](inputElement.value);
            if (isUnValid) break;
        }

        if (isUnValid) {
            msgElement.innerHTML = isUnValid;
            inputElement.classList.add("active");
        }
        return !!isUnValid;
    };

    if (formElement) {
        formElement.onsubmit = (e) => {
            e.preventDefault();
            let isFormValid = true;
            let isValid;

            options.rules.forEach((rule) => {
                const inputElement = formElement.querySelector(rule.selector);
                isValid = validate(inputElement, rule);
                if (isValid) isFormValid = false;
            });

            if (isFormValid) {
                const enableInputs = formElement.querySelectorAll("[name]");
                let result = Array.from(enableInputs).reduce((acc, input) => {
                    acc[input.name] = input.value;
                    return acc;
                }, {});
                options.onSubmit(result);
            }
        };
        options.rules.forEach((rule) => {
            if (selectorRules[rule.selector]) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }
            const inputElement = formElement.querySelector(rule.selector);
            const msgElement = inputElement.parentElement.querySelector(
                ".form-msg"
            );

            if (inputElement) {
                inputElement.onblur = (e) => {
                    validate(inputElement, rule);
                };

                inputElement.oninput = (e) => {
                    if (inputElement.classList.contains("active")) {
                        inputElement.classList.remove("active");
                        msgElement.innerHTML = "";
                    }
                };
            }
        });
    }
}

Validator.isRequired = (selector, msg) => {
    return {
        selector,
        test(value) {
            return value.trim().length >= 6
                ? undefined
                : value.trim().length === 0
                ? "Hãy nhập trường này"
                : msg;
        },
    };
};

Validator.isEmail = (selector) => {
    return {
        selector,
        test(value) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(value.trim()).toLowerCase())
                ? undefined
                : "Trường này phải là email";
        },
    };
};

Validator.isConfirmed = (selector, param) => {
    return {
        selector,
        test(value) {
            const passwordElement = document.querySelector(param);
            return passwordElement.value === value
                ? undefined
                : "Mật khẩu nhập lại không chính xác";
        },
    };
};
