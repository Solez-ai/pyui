import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class TemperatureConverter extends TkinterWidgetBase{

    static widgetType = "temperature_converter"
    static displayName = "Temperature Converter"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 200, height: 80 },
            widgetName: "Temp converter",
            attrs: {
                ...this.state.attrs,
                placeholder: {
                    label: "Placeholder",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "placeholder", maxLength: 100},
                    value: "Enter °C",
                    onChange: (value) => this.setAttrValue("placeholder", value)
                },
                buttonText: {
                    label: "Button text",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "button text", maxLength: 60},
                    value: "Convert to °F",
                    onChange: (value) => this.setAttrValue("buttonText", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff0")
    }

    generateCode(variableName, parent){

        const config = convertObjectToKeyValueString(this.getConfigCode())

        return [
            `def ${variableName}_convert():`,
            `    try:`,
            `        celsius = float(${variableName}_entry.get())`,
            `        fahrenheit = (celsius * 9 / 5) + 32`,
            `        ${variableName}_result.config(text=f"{fahrenheit:.2f} °F")`,
            `    except ValueError:`,
            `        ${variableName}_result.config(text="Invalid number")`,
            "",
            `${variableName}_entry = tk.Entry(master=${parent})`,
            `${variableName}_entry.insert(0, "${this.getAttrValue("placeholder")}")`,
            `${variableName}_entry.config(${config})`,
            `${variableName}_button = tk.Button(master=${parent}, text="${this.getAttrValue("buttonText")}", command=${variableName}_convert)`,
            `${variableName}_result = tk.Label(master=${parent}, text="--", font=("Arial", 16))`,
            `${variableName}_entry.pack(fill=tk.X, pady=(0, 4))`,
            `${variableName}_button.pack(fill=tk.X, pady=(0, 4))`,
            `${variableName}_result.pack(fill=tk.X)`,
        ]
    }

    getToolbarAttrs(){
        const toolBarAttrs = super.getToolbarAttrs()

        return ({
            id: this.__id,
            widgetName: toolBarAttrs.widgetName,
            size: toolBarAttrs.size,
            ...this.state.attrs,
        })
    }

    renderContent(){
        return (
            <div className="tw-w-full tw-h-full tw-flex tw-flex-col tw-gap-1 tw-place-content-center"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-text-xs tw-text-gray-400 tw-border tw-border-solid tw-border-gray-300 tw-rounded-sm tw-px-2 tw-py-1">
                    {this.getAttrValue("placeholder")}
                </div>
                <div className="tw-text-center tw-text-xs tw-bg-blue-500 tw-text-white tw-rounded-sm tw-py-[2px]">
                    {this.getAttrValue("buttonText")}
                </div>
                <div className="tw-text-center tw-text-base tw-text-gray-800">--</div>
            </div>
        )
    }

}


export default TemperatureConverter
