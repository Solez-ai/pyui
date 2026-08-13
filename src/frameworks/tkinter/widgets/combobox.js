import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { TkinterWidgetBase } from "./base"


class Combobox extends TkinterWidgetBase{

    static widgetType = "combobox"
    static displayName = "Combobox"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 25}

        this.state = {
            ...this.state,
            size: { width: 140, height: 30 },
            fitContent: {width: true, height: true},
            widgetName: "Combobox",
            attrs: {
                ...this.state.attrs,
                options: {
                    label: "Options (comma separated)",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "option1, option2", maxLength: 300},
                    value: "Option 1, Option 2, Option 3",
                    onChange: (value) => this.setAttrValue("options", value)
                },
                defaultValue: {
                    label: "Default value",
                    tool: Tools.INPUT,
                    toolProps: {placeholder: "default", maxLength: 100},
                    value: "",
                    onChange: (value) => this.setAttrValue("defaultValue", value)
                }
            }
        }
    }

    componentDidMount(){
        super.componentDidMount()
        this.setAttrValue("styling.backgroundColor", "#fff")
    }

    getConfigCode(){
        const config = {}
        return config
    }

    generateCode(variableName, parent){

        const options = (this.getAttrValue("options") || "").split(",").map(item => item.trim()).filter(Boolean)
        const defaultValue = this.getAttrValue("defaultValue")

        const code = [
            `${variableName}_var = tk.StringVar(value="${defaultValue}")`,
            `${variableName} = ttk.Combobox(master=${parent}, textvariable=${variableName}_var, values=${JSON.stringify(options)})`,
            `${variableName}.${this.getLayoutCode()}`
        ]

        return code
    }

    getImports(){
        const imports = super.getImports()
        imports.push("from tkinter import ttk")
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
        const defaultValue = this.getAttrValue("defaultValue")

        return (
            <div className="tw-w-flex tw-flex-col tw-w-full tw-h-full tw-rounded-md tw-overflow-hidden">
                <div className="tw-p-1 tw-w-full tw-h-full tw-place-items-center"
                        ref={this.styleAreaRef}
                        style={this.getInnerRenderStyling()}>
                    <div className="tw-flex tw-place-items-center tw-justify-between tw-gap-1 tw-w-full tw-h-full tw-px-2
                                    tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm tw-bg-white tw-text-xs">
                        <span className="tw-text-gray-600">{defaultValue || "Select..."}</span>
                        <span className="tw-text-gray-500 tw-text-[10px]">▾</span>
                    </div>
                </div>
            </div>
        )
    }

}


export default Combobox
