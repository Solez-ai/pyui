import { useState } from "react"

import { Button, message } from "antd"
import { CopyOutlined, CheckOutlined } from "@ant-design/icons"


const TEMPLATES = [
    {
        name: "Calculator",
        description: "A fully working calculator app built with tkinter",
        framework: "tkinter",
        code: `import tkinter as tk

main = tk.Tk()
main.title("Calculator")
main.geometry("280x380")
main.config(bg="#f0f0f0")

expression = ""


def press(num):
    global expression
    expression = expression + str(num)
    equation.set(expression)


def equal():
    global expression
    try:
        total = str(eval(expression))
        equation.set(total)
        expression = total
    except Exception:
        equation.set("Error")
        expression = ""


def clear():
    global expression
    expression = ""
    equation.set("")


equation = tk.StringVar()
display = tk.Entry(main, textvariable=equation, font=("Arial", 18), justify="right", bd=8)
display.grid(row=0, column=0, columnspan=4, padx=8, pady=8, sticky="nsew")

buttons = [
    ("7", 1, 0), ("8", 1, 1), ("9", 1, 2), ("/", 1, 3),
    ("4", 2, 0), ("5", 2, 1), ("6", 2, 2), ("*", 2, 3),
    ("1", 3, 0), ("2", 3, 1), ("3", 3, 2), ("-", 3, 3),
    ("0", 4, 0), (".", 4, 1), ("=", 4, 2), ("+", 4, 3),
]

for text, row, col in buttons:
    if text == "=":
        cmd = equal
    else:
        cmd = lambda t=text: press(t)
    tk.Button(main, text=text, font=("Arial", 16), command=cmd,
              bd=4, relief="raised").grid(row=row, column=col, padx=2, pady=2, sticky="nsew")

tk.Button(main, text="C", font=("Arial", 16), command=clear, fg="white", bg="#e74c3c",
          bd=4, relief="raised").grid(row=5, column=0, columnspan=4, padx=2, pady=2, sticky="nsew")

for i in range(6):
    main.grid_rowconfigure(i, weight=1)
for i in range(4):
    main.grid_columnconfigure(i, weight=1)

main.mainloop()
`
    },
    {
        name: "Login Form",
        description: "A login form with username and password validation",
        framework: "tkinter",
        code: `import tkinter as tk
from tkinter import messagebox

main = tk.Tk()
main.title("Login")
main.geometry("300x200")


def login():
    user = username_entry.get()
    pwd = password_entry.get()
    if user == "admin" and pwd == "secret":
        messagebox.showinfo("Login", "Welcome back!")
    else:
        messagebox.showerror("Login", "Invalid username or password")


tk.Label(main, text="Username", font=("Arial", 12)).pack(pady=10)
username_entry = tk.Entry(main, font=("Arial", 12))
username_entry.pack(pady=5)

tk.Label(main, text="Password", font=("Arial", 12)).pack(pady=10)
password_entry = tk.Entry(main, show="*", font=("Arial", 12))
password_entry.pack(pady=5)

tk.Button(main, text="Login", command=login, font=("Arial", 12)).pack(pady=15)

main.mainloop()
`
    },
    {
        name: "Counter App",
        description: "A simple counter with + and - buttons",
        framework: "tkinter",
        code: `import tkinter as tk

main = tk.Tk()
main.title("Counter")
main.geometry("250x120")


def increment():
    count.set(count.get() + 1)


def decrement():
    count.set(count.get() - 1)


count = tk.IntVar(value=0)

tk.Label(main, textvariable=count, font=("Arial", 24)).pack(pady=10)
tk.Button(main, text="-", command=decrement, width=5).pack(side=tk.LEFT, padx=20, pady=10)
tk.Button(main, text="+", command=increment, width=5).pack(side=tk.RIGHT, padx=20, pady=10)

main.mainloop()
`
    },
    {
        name: "Todo List",
        description: "Add and remove tasks from a list",
        framework: "tkinter",
        code: `import tkinter as tk

main = tk.Tk()
main.title("Todo List")
main.geometry("300x350")


def add_task():
    task = entry.get()
    if task:
        listbox.insert(tk.END, task)
        entry.delete(0, tk.END)


def remove_task():
    selected = listbox.curselection()
    if selected:
        listbox.delete(selected[0])


entry = tk.Entry(main, font=("Arial", 12))
entry.pack(pady=10, padx=10, fill=tk.X)

tk.Button(main, text="Add Task", command=add_task).pack(pady=5)
listbox = tk.Listbox(main, font=("Arial", 12), height=10)
listbox.pack(padx=10, pady=10, fill=tk.BOTH, expand=True)
tk.Button(main, text="Remove Selected", command=remove_task).pack(pady=5)

main.mainloop()
`
    },
    {
        name: "Temperature Converter",
        description: "Convert Celsius to Fahrenheit",
        framework: "tkinter",
        code: `import tkinter as tk

main = tk.Tk()
main.title("Temperature Converter")
main.geometry("300x150")


def convert():
    try:
        celsius = float(entry.get())
        fahrenheit = (celsius * 9 / 5) + 32
        result.config(text=f"{fahrenheit:.2f} °F")
    except ValueError:
        result.config(text="Please enter a number")


tk.Label(main, text="Enter Celsius:", font=("Arial", 12)).pack(pady=10)
entry = tk.Entry(main, font=("Arial", 12))
entry.pack(pady=5)

tk.Button(main, text="Convert", command=convert, font=("Arial", 12)).pack(pady=10)
result = tk.Label(main, text="--", font=("Arial", 14))
result.pack(pady=5)

main.mainloop()
`
    },
]


function TemplateCard({template}){

    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard?.writeText(template.code).then(() => {
            setCopied(true)
            setTimeout(() => setCopied(false), 1500)
        }).catch(() => {
            message.error("Could not copy template")
        })
    }

    return (
        <div className="tw-w-full tw-p-3 tw-bg-white tw-rounded-md tw-border-solid tw-border-[1px]
                        tw-border-gray-300 tw-shadow-sm tw-flex tw-flex-col tw-gap-2">
            <div className="tw-flex tw-place-items-center tw-gap-2">
                <span className="tw-font-medium tw-text-gray-800">{template.name}</span>
                <span className="tw-text-[10px] tw-px-1 tw-py-[1px] tw-bg-blue-50 tw-text-blue-600
                                tw-border tw-border-solid tw-border-blue-200 tw-rounded-sm">
                    {template.framework}
                </span>
            </div>
            <p className="tw-text-xs tw-text-gray-500 tw-m-0">{template.description}</p>
            <Button size="small"
                    icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                    onClick={handleCopy}
                    type={copied ? "primary" : "default"}
                    className="tw-w-fit">
                {copied ? "Copied!" : "Copy code"}
            </Button>
        </div>
    )
}


function TemplatesContainer(){
    return (
        <div className="tw-w-full tw-p-2 tw-gap-3 tw-flex tw-flex-col tw-overflow-x-hidden">
            <div className="tw-text-xs tw-text-gray-500 tw-px-1">
                Ready-made Python UI templates. Click copy and paste the code into your project to learn how each UI is built.
            </div>
            {
                TEMPLATES.map((template, index) => (
                    <TemplateCard key={index} template={template} />
                ))
            }
        </div>
    )
}


export default TemplatesContainer
