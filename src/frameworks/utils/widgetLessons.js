/**
 * widgetLessons.js
 *
 * Guided lesson mode: maps each teaching widget to the Python concept it
 * demonstrates. Shown when the user selects a widget on the canvas.
 */

export const WIDGET_LESSONS = {
    counter: {
        title: "Variables & Functions",
        concept: "A counter is a variable that changes over time, changed by functions.",
        explanation: "You just built a real program: a number that goes up and down. Under the hood, the widget stores the number in a variable (`counter_var`), and two functions (`counter_increment` / `counter_decrement`) change it. Every app you'll ever write is built from this pattern: keep some data, change it with functions.",
        learn: [
            "A variable stores a value — like a labelled box.",
            "A function is a reusable block of code that does one thing.",
            "`counter_var.get()` reads the value, `.set()` changes it.",
        ],
        codeExample: `counter_var = tk.IntVar(value=0)

def increment():
    counter_var.set(counter_var.get() + 1)`,
        tryThis: "Change the initial value or the step size in the properties panel — then look at how the generated code changes.",
    },
    slider_value: {
        title: "Numbers & Ranges",
        concept: "A slider maps a range of numbers to a live value the user controls.",
        explanation: "The slider is a range — a min, a max, and a current value between them. As the user drags it, the value updates and your program can react. This is how volume controls, brightness sliders, and filters work in real apps.",
        learn: [
            "`from_` and `to` define the minimum and maximum of the range.",
            "A variable (`DoubleVar`) holds the current value.",
            "A function runs every time the value changes.",
        ],
        codeExample: `value_var = tk.DoubleVar(value=50)
scale = tk.Scale(master=main, from_=0, to=100,
                 variable=value_var, orient=tk.HORIZONTAL)`,
        tryThis: "Change the min/max in the properties panel and watch the range update in the generated code.",
    },
    stopwatch: {
        title: "Loops, Time & Events",
        concept: "A stopwatch repeats a tiny piece of work over and over — the heart of real-time apps.",
        explanation: "A stopwatch runs the same small function again and again, adding a tiny amount each tick. That repeating action is a loop driven by time. Games, animations, and clocks all work exactly like this: a function that schedules itself to run again.",
        learn: [
            "`after(10, tick)` means: run tick again in 10 milliseconds.",
            "A boolean (`running = True/False`) decides whether the loop keeps going.",
            "Start / Stop buttons just flip that boolean.",
        ],
        codeExample: `running = False
counter = 0

def tick():
    global counter
    if running:
        counter += 1
        label.config(text=f"\${counter}s")
        label.after(10, tick)`,
        tryThis: "Look for the `after()` call in the generated code — that's the whole secret of animation.",
    },
    todo_list: {
        title: "Lists",
        concept: "A todo list is a list — Python's most important collection.",
        explanation: "Every task you add goes into a list. Adding = `insert()`, removing = `delete()`, and `curselection()` finds what's selected. Lists are how Python stores many things at once — tasks, scores, names, anything.",
        learn: [
            "A list holds many values in order.",
            "`.insert()` adds, `.delete()` removes.",
            "`.curselection()` asks the listbox what the user picked.",
        ],
        codeExample: `tasks = ["learn python", "build an app"]
tasks.insert(0, "win the competition")
tasks.remove("learn python")`,
        tryThis: "Add a task in your head — that single action uses three different Python list skills.",
    },
    color_picker: {
        title: "Strings & Hex Colors",
        concept: "A color is just a string of text — and Python can create and change things with strings.",
        explanation: "Colors in code are written as hex strings like `#3498db` — 6 characters that describe red, green and blue. The color picker lets the user choose one, and the program stores it as a string and applies it. Strings are the most-used data type in all of programming.",
        learn: [
            "A string is text wrapped in quotes: `\"#3498db\"`.",
            "Hex colors are 6 characters: 2 red, 2 green, 2 blue.",
            "`colorchooser.askcolor()` opens the system color dialog.",
        ],
        codeExample: `color = "#3498db"
label.config(text=color, bg=color)`,
        tryThis: "Change the default color in the properties panel — notice it's stored as plain text.",
    },
    temperature_converter: {
        title: "Functions & Math",
        concept: "A converter is a function: take an input, transform it, show the output.",
        explanation: "The converter takes a number, applies a formula, and shows the result. That's what functions are for — a named recipe you can run anytime. `(celsius * 9 / 5) + 32` is the formula; the function is the wrapper around it.",
        learn: [
            "A function takes an input and returns an output.",
            "`float()` converts text into a number.",
            "`try / except` catches mistakes (like typing letters).",
        ],
        codeExample: `def convert(celsius):
    fahrenheit = (celsius * 9 / 5) + 32
    return fahrenheit

print(convert(25))  # 77.0`,
        tryThis: "Type a letter into the input when you run it — the `try/except` catches it and shows a friendly message.",
    },
    listbox: {
        title: "Lists & Selection",
        concept: "A listbox shows a list the user can pick from.",
        explanation: "A listbox displays many items at once and lets the user select one. Under the hood it's backed by a Python list — you `insert()` items into it and read back whatever the user chose with `curselection()`.",
        learn: [
            "Items are stored in order inside the widget.",
            "`curselection()` returns the index of the selected item.",
            "`get(index)` reads the text of that item.",
        ],
        codeExample: `listbox.insert(0, "first item")
listbox.insert(1, "second item")
selected = listbox.curselection()`,
        tryThis: "This is the same list skill used by the Todo List widget — lists are everywhere.",
    },
    scale: {
        title: "Numbers & Ranges",
        concept: "A scale (slider) maps a range of numbers to a live value the user controls.",
        explanation: "The slider is a range — a min, a max, and a current value between them. As the user drags it, the value updates and your program can react. This is how volume controls, brightness sliders and filters work in real apps.",
        learn: [
            "`from_` and `to` define the minimum and maximum.",
            "A variable holds the current value as it moves.",
            "A function can run every time the value changes.",
        ],
        codeExample: `value_var = tk.DoubleVar(value=50)
scale = tk.Scale(master=main, from_=0, to=100,
                 variable=value_var, orient=tk.HORIZONTAL)`,
        tryThis: "Change the min/max in the properties panel and watch the range update in the generated code.",
    },
    entry: {
        title: "User Input & Strings",
        concept: "An entry is where the user types text — your program's front door.",
        explanation: "Every text box is an entry. Whatever the user types is a string, and your program reads it with `.get()`. Forms, search boxes and chat inputs all start here — capturing input and turning it into data your app can use.",
        learn: [
            "`.get()` reads the text the user typed.",
            "`.insert()` puts text in, `.delete()` clears it.",
            "The typed value is a string, even if it looks like a number.",
        ],
        codeExample: `name = entry.get()
print("Hello, " + name)
entry.delete(0, tk.END)  # clear the box`,
        tryThis: "The Login Form template is a perfect example — an entry captures a username, and a button reads it.",
    },
    button: {
        title: "Events & Commands",
        concept: "A button makes something happen — the click is an event.",
        explanation: "A button is a function waiting to be called. When the user clicks, Python runs the function you attached with `command=`. This is event-driven programming — the app reacts to the user, instead of running top to bottom.",
        learn: [
            "`command=function_name` runs the function on click.",
            "The function is passed by name, without parentheses.",
            "Buttons are how users trigger actions in almost every app.",
        ],
        codeExample: `def say_hello():
    print("Hello!")

button = tk.Button(master=main, text="Click me",
                   command=say_hello)`,
        tryThis: "Click the button on the canvas — the whole app reacts to one event.",
    },
    spin_box: {
        title: "Numbers & Boundaries",
        concept: "A spinbox is a number with min, max and step boundaries.",
        explanation: "The spinbox only allows numbers inside a range — no less than the minimum, no more than the maximum, and it moves by the step you choose. That's 'input validation' — making sure the user's input is always sensible.",
        learn: [
            "`from_` and `to` set the allowed range.",
            "`increment` sets how much it changes per click.",
            "The current value lives in a variable.",
        ],
        codeExample: `spin = tk.Spinbox(master=main, from_=0, to=100, increment=5)`,
        tryThis: "Set a small range (e.g. 0 to 10) and try to go past it — the widget refuses.",
    },
    option_menu: {
        title: "Choices & Defaults",
        concept: "An option menu gives the user a fixed set of choices.",
        explanation: "Unlike an entry where the user types anything, an option menu only allows choices you defined. This is how forms ask 'male/female/other', how apps pick languages, and how settings stay valid — the user can't break what they can't type.",
        learn: [
            "The options are a Python list.",
            "`StringVar` holds the currently selected choice.",
            "A default value is shown before the user interacts.",
        ],
        codeExample: `options = ["red", "green", "blue"]
choice_var = tk.StringVar(value="red")
menu = tk.OptionMenu(main, choice_var, *options)`,
        tryThis: "Add a new option in the properties panel — it appears in the menu instantly.",
    },
    combobox: {
        title: "Choices + Free Input",
        concept: "A combobox is an option menu with a text field — choice and freedom combined.",
        explanation: "The combobox lets the user pick from your list OR type their own value. It's the practical middle ground: most of the time they pick, but nothing stops them from typing something new.",
        learn: [
            "`values=` is the list of suggestions.",
            "`StringVar` holds whatever is selected or typed.",
            "It's the same widget used in modern desktop forms.",
        ],
        codeExample: `values = ["apple", "banana", "cherry"]
combo_var = tk.StringVar()
combo = ttk.Combobox(master=main,
                     textvariable=combo_var, values=values)`,
        tryThis: "The generated code stores the options as a Python list — spot it in the code panel.",
    },
}

// widgets that get a lesson panel (the "teaching widgets")
export const LESSON_WIDGET_TYPES = Object.keys(WIDGET_LESSONS)

export function getWidgetLesson(widgetType) {
    return WIDGET_LESSONS[widgetType] || null
}
