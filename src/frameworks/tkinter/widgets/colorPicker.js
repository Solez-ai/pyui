import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class ColorPicker extends TkinterWidgetBase{

    static widgetType = "color_picker"
    static displayName = "Color Picker"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 25}

        this.state = {
            ...this.state,
            size: { width: 160, height: 50 },
            widgetName: "Color picker",
            attrs: {
                ...this.state.attrs,
                buttonText: {
                    label: "Button text",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "button text", maxLength: 60},
                    value: "Pick a color",
                    onChange: (value) => this.setAttrValue("buttonText", value)
                },
                defaultColor: {
                    label: "Default color",
                    tool: Tools.COLOR_PICKER,
                    value: "#3498db",
                    onChange: (value) => this.setAttrValue("defaultColor", value)
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
        const defaultColor = this.getAttrValue("defaultColor")

        return [
            `def ${variableName}_choose_color():`,
            `    color = colorchooser.askcolor(title="Choose a color")[1]`,
            `    if color:`,
            `        ${variableName}_label.config(text=color, bg=color)`,
            "",
            `${variableName} = tk.Button(master=${parent}, text="${this.getAttrValue("buttonText")}", command=${variableName}_choose_color)`,
            `${variableName}.config(${config})`,
            `${variableName}_label = tk.Label(master=${parent}, text="${defaultColor}", bg="${defaultColor}", width=12)`,
            `${variableName}.pack(side=tk.LEFT, padx=4)`,
            `${variableName}_label.pack(side=tk.LEFT, padx=4)`,
        ]
    }

    getImports(){
        const imports = super.getImports()
        imports.push("from tkinter import colorchooser")
        return imports
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
        const defaultColor = this.getAttrValue("defaultColor")

        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-items-center tw-place-content-center tw-gap-2"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-px-2 tw-py-[2px] tw-bg-blue-500 tw-text-white tw-text-xs tw-rounded-sm">
                    {this.getAttrValue("buttonText")}
                </div>
                <div className="tw-w-[60px] tw-h-[22px] tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm"
                    style={{backgroundColor: defaultColor}} />
            </div>
        )
    }

}


export default ColorPicker
