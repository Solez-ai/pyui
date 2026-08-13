import Tools from "../../../canvas/constants/tools"
import { convertObjectToKeyValueString } from "../../../utils/common"
import { CustomTkWidgetBase } from "./base"


class Counter extends CustomTkWidgetBase{

    static widgetType = "counter"
    static displayName = "Counter"

    constructor(props) {
        super(props)

        this.minSize = {width: 50, height: 30}

        this.state = {
            ...this.state,
            size: { width: 160, height: 60 },
            widgetName: "Counter",
            attrs: {
                ...this.state.attrs,
                initialValue: {
                    label: "Initial value",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "initial"},
                    value: 0,
                    onChange: (value) => this.setAttrValue("initialValue", value)
                },
                step: {
                    label: "Step",
                    tool: Tools.NUMBER_INPUT,
                    toolProps: {placeholder: "step"},
                    value: 1,
                    onChange: (value) => this.setAttrValue("step", value)
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
        const initial = this.getAttrValue("initialValue")
        const step = this.getAttrValue("step")

        return [
            `def ${variableName}_increment():`,
            `    ${variableName}_var.set(${variableName}_var.get() + ${step})`,
            "",
            `def ${variableName}_decrement():`,
            `    ${variableName}_var.set(${variableName}_var.get() - ${step})`,
            "",
            `${variableName}_var = tk.IntVar(value=${initial})`,
            `${variableName}_label = ctk.CTkLabel(master=${parent}, textvariable=${variableName}_var, font=("Arial", 18))`,
            `${variableName}_minus = ctk.CTkButton(master=${parent}, text="-", command=${variableName}_decrement, width=40)`,
            `${variableName}_plus = ctk.CTkButton(master=${parent}, text="+", command=${variableName}_increment, width=40)`,
            `${variableName}_minus.pack(side=tk.LEFT, padx=4)`,
            `${variableName}_label.pack(side=tk.LEFT, padx=8)`,
            `${variableName}_plus.pack(side=tk.LEFT, padx=4)`,
        ]
    }

    getImports(){
        const imports = super.getImports()
        imports.push("import tkinter as tk")
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
        return (
            <div className="tw-w-full tw-h-full tw-flex tw-place-items-center tw-place-content-center tw-gap-2"
                    ref={this.styleAreaRef}
                    style={this.getInnerRenderStyling()}>
                <div className="tw-px-2 tw-py-[2px] tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm tw-text-sm">−</div>
                <div className="tw-text-base tw-text-gray-800">{this.getAttrValue("initialValue")}</div>
                <div className="tw-px-2 tw-py-[2px] tw-bg-gray-200 tw-border tw-border-solid tw-border-gray-400 tw-rounded-sm tw-text-sm">+</div>
            </div>
        )
    }

}


export default Counter
