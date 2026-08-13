import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class ColorPicker extends CustomTkWidgetBase{

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
            `        ${variableName}_label.configure(text=color, fg_color=color)`,
            "",
            `${variableName} = ctk.CTkButton(master=${parent}, text="${this.getAttrValue("buttonText")}", command=${variableName}_choose_color)`,
            `${variableName}.configure(${config})`,
            `${variableName}_label = ctk.CTkLabel(master=${parent}, text="${defaultColor}", fg_color="${defaultColor}", width=80)`,
            `${variableName}.pack(side=tk.LEFT, padx=4)`,
            `${variableName}_label.pack(side=tk.LEFT, padx=4)`,
        ]
    }

    getImports(){
        const imports = super.getImports()
        imports.push("import tkinter as tk", "from tkinter import colorchooser")
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
