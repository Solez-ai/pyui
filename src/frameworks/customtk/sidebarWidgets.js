import MainWindow from "./widgets/mainWindow"
import TopLevel from "./widgets/toplevel"
import Frame from "./widgets/frame"
import Label from "./widgets/label"
import Button from "./widgets/button"
import OptionMenu from "./widgets/optionMenu"
import Slider from "./widgets/slider"
import { CheckBox, RadioButton } from "./widgets/checkButton"
import { Input, Text } from "./widgets/input"
import SpinBox from "./widgets/spinBox"
import Listbox from "./widgets/listbox"
import Message from "./widgets/message"
import LabelFrame from "./widgets/labelFrame"
import PanedWindow from "./widgets/panedWindow"
import Scrollbar from "./widgets/scrollbar"
import Progressbar from "./widgets/progressbar"
import Treeview from "./widgets/treeview"
import Notebook from "./widgets/notebook"
import Combobox from "./widgets/combobox"
import Separator from "./widgets/separator"
import MenuBar from "./widgets/menuBar"
import CanvasWidget from "./widgets/canvas"
import Sizegrip from "./widgets/sizegrip"
import PasswordEntry from "./widgets/passwordEntry"
import SliderValue from "./widgets/sliderValue"
import Counter from "./widgets/counter"
import Stopwatch from "./widgets/stopwatch"
import TodoList from "./widgets/todoList"
import ColorPicker from "./widgets/colorPicker"
import TemperatureConverter from "./widgets/temperatureConverter"

import MainWindowImage from "./assets/widgets/main/mainwindow2.png"
import TopLevelImage from "./assets/widgets/main/Toplevel2.png"
import FrameImage from "./assets/widgets/main/frame2.png"
import LabelImage from "./assets/widgets/main/label.png"
import ButtonImage from "./assets/widgets/main/button2.png"
import InputImage from "./assets/widgets/main/input.png"
import TextAreaImage from "./assets/widgets/main/textarea.png"
import SliderImage from "./assets/widgets/main/slider.png"
import DropDownImage from "./assets/widgets/main/dropdown.png"
import CheckButtonImage from "./assets/widgets/main/check.png"
import RadioButtonImage from "./assets/widgets/main/radio.png"
import SpinBoxImage from "./assets/widgets/main/spinbox.png"
import WidgetImage from "./assets/widgets/main/widget.png"


const CustomTkWidgets = [
    {
        name: "Main window",
        img: MainWindowImage,
        link: "https://customtkinter.tomschimansky.com/documentation/windows", 
        widgetClass: MainWindow
    },
    {
        name: "Top Level",
        img: TopLevelImage,
        link: "https://customtkinter.tomschimansky.com/documentation/windows", 
        widgetClass: TopLevel
    },
    {
        name: "Frame",
        img: FrameImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/frame",
        widgetClass: Frame
    },
    {
        name: "Label",
        img: LabelImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/label",
        widgetClass: Label
    },
    {
        name: "Button",
        img: ButtonImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/button",
        widgetClass: Button
    },
    {
        name: "Entry",
        img: InputImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/entry",
        widgetClass: Input
    },
    {
        name: "Text",
        img: TextAreaImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/textbox",
        widgetClass: Text
    },
    {
        name: "CheckBox",
        img: CheckButtonImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/checkbox",
        widgetClass: CheckBox
    },
    {
        name: "Radio button",
        img: RadioButtonImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/radiobutton",
        widgetClass: RadioButton
    },
    {
        name: "Scale",
        img: SliderImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/slider",
        widgetClass: Slider
    },
    {
        name: "Option Menu",
        img: DropDownImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/optionmenu",
        widgetClass: OptionMenu
    },
    {
        name: "Spinbox",
        img: SpinBoxImage,
        link: "https://customtkinter.tomschimansky.com/documentation/widgets/entry",
        widgetClass: SpinBox
    },
    {
        name: "Listbox",
        img: TextAreaImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Listbox
    },
    {
        name: "Message",
        img: LabelImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Message
    },
    {
        name: "Label Frame",
        img: FrameImage,
        link: "https://github.com/Solez-ai",
        widgetClass: LabelFrame
    },
    {
        name: "Paned Window",
        img: FrameImage,
        link: "https://github.com/Solez-ai",
        widgetClass: PanedWindow
    },
    {
        name: "Scrollbar",
        img: SliderImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Scrollbar
    },
    {
        name: "Progress Bar",
        img: SliderImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Progressbar
    },
    {
        name: "Treeview",
        img: TextAreaImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Treeview
    },
    {
        name: "Notebook",
        img: FrameImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Notebook
    },
    {
        name: "Combobox",
        img: DropDownImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Combobox
    },
    {
        name: "Separator",
        img: WidgetImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Separator
    },
    {
        name: "Menu Bar",
        img: WidgetImage,
        link: "https://github.com/Solez-ai",
        widgetClass: MenuBar
    },
    {
        name: "Canvas",
        img: WidgetImage,
        link: "https://github.com/Solez-ai",
        widgetClass: CanvasWidget
    },
    {
        name: "Sizegrip",
        img: WidgetImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Sizegrip
    },
    {
        name: "Password Entry",
        img: InputImage,
        link: "https://github.com/Solez-ai",
        widgetClass: PasswordEntry
    },
    {
        name: "Slider with Value",
        img: SliderImage,
        link: "https://github.com/Solez-ai",
        widgetClass: SliderValue
    },
    {
        name: "Counter",
        img: ButtonImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Counter
    },
    {
        name: "Stopwatch",
        img: ButtonImage,
        link: "https://github.com/Solez-ai",
        widgetClass: Stopwatch
    },
    {
        name: "Todo List",
        img: TextAreaImage,
        link: "https://github.com/Solez-ai",
        widgetClass: TodoList
    },
    {
        name: "Color Picker",
        img: ButtonImage,
        link: "https://github.com/Solez-ai",
        widgetClass: ColorPicker
    },
    {
        name: "Temperature Converter",
        img: InputImage,
        link: "https://github.com/Solez-ai",
        widgetClass: TemperatureConverter
    },

]


export default CustomTkWidgets
